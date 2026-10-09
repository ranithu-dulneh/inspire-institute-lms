import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { sign, verify } from 'hono/jwt'
import * as bcrypt from 'bcryptjs'

export type Env = {
  DB: D1Database
  JWT_SECRET: string
}

const app = new Hono<{ Bindings: Env }>()

app.use('*', cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}))

app.post('/api/auth/login', async (c) => {
  const body = await c.req.json()
  const identifier = body.identifier
  const password = body.password

  if (!identifier || !password) {
    return c.json({ error: 'Missing identifier or password' }, 400)
  }

  // Determine if it's an ID or a mobile number (assuming mobile numbers are just digits or start with 0)
  const isMobile = /^\d+$/.test(identifier)

  let query = 'SELECT * FROM users WHERE indexNumber = ?'
  if (isMobile) {
    query = 'SELECT * FROM users WHERE phone = ?'
  }

  const { results } = await c.env.DB.prepare(query).bind(identifier).all()
  const user = results[0] as any

  if (!user) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const validPassword = await bcrypt.compare(password, user.password_hash)
  if (!validPassword) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    indexNumber: user.indexNumber,
    name: user.name,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hours
  }

  const token = await sign(payload, c.env.JWT_SECRET)

  return c.json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      indexNumber: user.indexNumber,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
    }
  })
})

app.post('/api/auth/register', async (c) => {
  const body = await c.req.json()
  const { email, phone, password, name, indexNumber } = body

  if (!email || !password || !name) {
    return c.json({ error: 'Missing required fields (email, password, name)' }, 400)
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10)

    // Default to student, but could allow passing role for admin creation if authenticated
    const role = 'student'

    const result = await c.env.DB.prepare(
      'INSERT INTO users (email, phone, password_hash, name, role, indexNumber) VALUES (?, ?, ?, ?, ?, ?)'
    ).bind(email, phone || null, passwordHash, name, role, indexNumber || null).run()

    if (result.success) {
      return c.json({ message: 'User registered successfully' }, 201)
    } else {
       return c.json({ error: 'Failed to register user' }, 500)
    }
  } catch (error: any) {
     if (error.message.includes('UNIQUE constraint failed')) {
        return c.json({ error: 'User with this email, phone, or index number already exists' }, 409)
     }
     return c.json({ error: 'An error occurred during registration' }, 500)
  }
})

app.get('/api/users/me', async (c) => {
  const authHeader = c.req.header('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return c.json({ error: 'Missing token' }, 401)
  }
  const token = authHeader.split(' ')[1]
  try {
    const payload = await verify(token, c.env.JWT_SECRET, "HS256")
    const { results } = await c.env.DB.prepare('SELECT id, name, email, role, indexNumber FROM users WHERE id = ?').bind(payload.id).all()
    const user = results[0] as any
    if (!user) {
        return c.json({ error: 'User not found' }, 404)
    }
    return c.json({
      user: {
        ...user,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`
      }
    })
  } catch (e) {
    return c.json({ error: 'Invalid token' }, 401)
  }
})


export default app
