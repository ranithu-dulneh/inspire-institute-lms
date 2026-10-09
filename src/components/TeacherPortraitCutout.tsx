import React, { useState, useEffect } from 'react';

interface TeacherPortraitProps {
  className?: string;
  customImageUrl?: string;
}

export const TeacherPortraitCutout: React.FC<TeacherPortraitProps> = ({
  className = '',
  customImageUrl
}) => {
  const [activeImage, setActiveImage] = useState<string | null>(customImageUrl || null);

  // Check admin-configured image, localStorage, or public candidate image paths
  useEffect(() => {
    if (customImageUrl) {
      setActiveImage(customImageUrl);
      return;
    }
    const saved = localStorage.getItem('inspire_teacher_photo_cutout');
    if (saved) {
      setActiveImage(saved);
      return;
    }

    // Try candidate image paths
    const candidatePaths = [
      '/688785651_1572341544899956_8069124974790945836_n.jpg',
      '/teacher-cutout.png',
      '/teacher.jpg',
      '/teacher.png'
    ];

    let found = false;
    const testNext = (idx: number) => {
      if (idx >= candidatePaths.length || found) return;
      const testImg = new Image();
      testImg.onload = () => {
        found = true;
        setActiveImage(testImg.src);
      };
      testImg.onerror = () => {
        testNext(idx + 1);
      };
      testImg.src = candidatePaths[idx];
    };
    testNext(0);
  }, [customImageUrl]);

  return (
    <div className={`relative flex flex-col items-center justify-center select-none ${className}`}>
      
      {/* Soft Ambient Luminous Halo (Subtle Apple-grade background light) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-300/15 via-sky-200/20 to-indigo-200/10 rounded-full blur-3xl pointer-events-none scale-110" />

      {/* Main Cutout Container */}
      <div className="relative z-10 w-full max-w-[420px] sm:max-w-[460px] lg:max-w-[490px] aspect-[4/5] flex items-end justify-center">
        
        {activeImage ? (
          /* Real photographic cutout of Mrs. Ruwanthi Senanayaka */
          <div className="relative w-full h-full flex items-end justify-center">
            <img 
              src={activeImage} 
              alt="Mrs. Ruwanthi Senanayaka - Lead A/L Accounting Faculty"
              className="w-full h-full object-contain object-bottom drop-shadow-[0_20px_40px_rgba(15,23,42,0.14)]"
            />
          </div>
        ) : (
          /* High-Fidelity Studio Portrait Rendering with Realistic Shading & Pinstripes */
          <div className="relative w-full h-full flex items-end justify-center">
            <svg 
              viewBox="0 0 500 620" 
              className="w-full h-full drop-shadow-[0_25px_45px_rgba(15,23,42,0.16)]"
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="photoSkin" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D29875" />
                  <stop offset="40%" stopColor="#C28662" />
                  <stop offset="70%" stopColor="#B07350" />
                  <stop offset="100%" stopColor="#965D3C" />
                </linearGradient>
                <linearGradient id="photoSkinHighlight" x1="30%" y1="0%" x2="70%" y2="100%">
                  <stop offset="0%" stopColor="#E0AB8A" />
                  <stop offset="60%" stopColor="#C98B68" />
                  <stop offset="100%" stopColor="#AF7351" />
                </linearGradient>
                <linearGradient id="photoHair" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#251915" />
                  <stop offset="60%" stopColor="#17100D" />
                  <stop offset="100%" stopColor="#0B0706" />
                </linearGradient>
                <linearGradient id="photoVest" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#21252D" />
                  <stop offset="50%" stopColor="#181B22" />
                  <stop offset="100%" stopColor="#101217" />
                </linearGradient>
                <linearGradient id="photoPants" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#252A33" />
                  <stop offset="100%" stopColor="#16191E" />
                </linearGradient>
                <linearGradient id="goldAcc" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FDE047" />
                  <stop offset="40%" stopColor="#EAB308" />
                  <stop offset="80%" stopColor="#CA8A04" />
                  <stop offset="100%" stopColor="#854D0E" />
                </linearGradient>
                <pattern id="realPinstripe" width="14" height="20" patternUnits="userSpaceOnUse">
                  <line x1="7" y1="0" x2="7" y2="20" stroke="#FFFFFF" strokeWidth="0.75" opacity="0.32" />
                </pattern>
              </defs>

              {/* Hair Bun with hair texture */}
              <circle cx="250" cy="85" r="32" fill="url(#photoHair)" />
              <path d="M225 75 Q 250 68 275 75 Q 260 95 225 75 Z" fill="#3A2822" opacity="0.4" />

              {/* Neck & Shading */}
              <path d="M232 175 L268 175 L275 225 L225 225 Z" fill="url(#photoSkin)" />
              <path d="M232 175 Q 250 190 268 175 L270 195 Q 250 205 230 195 Z" fill="#935839" opacity="0.45" />

              {/* Real Gold Chain Necklace */}
              <path d="M228 184 Q 250 216 272 184" stroke="url(#goldAcc)" strokeWidth="3" fill="none" />
              <path d="M230 186 Q 250 218 270 186" stroke="#FEF08A" strokeWidth="1" fill="none" opacity="0.8" />

              {/* Head & Natural Facial Geometry */}
              <ellipse cx="250" cy="140" rx="38" ry="46" fill="url(#photoSkinHighlight)" />
              {/* Sleek combed back front hair */}
              <path d="M212 135 C 212 90 288 90 288 135 C 280 102 220 102 212 135 Z" fill="url(#photoHair)" />
              <path d="M246 95 Q 250 108 248 118" stroke="#3A2922" strokeWidth="2" opacity="0.5" fill="none" />

              {/* Almond Eyes & Pupils */}
              <ellipse cx="236" cy="138" rx="5.5" ry="3.5" fill="#1A110D" />
              <ellipse cx="264" cy="138" rx="5.5" ry="3.5" fill="#1A110D" />
              <circle cx="237.5" cy="137" r="1.3" fill="#FFFFFF" />
              <circle cx="265.5" cy="137" r="1.3" fill="#FFFFFF" />
              {/* Eyebrows */}
              <path d="M227 129 Q 236 125 244 129" stroke="#140D0B" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M256 129 Q 264 125 273 129" stroke="#140D0B" strokeWidth="2.8" strokeLinecap="round" />

              {/* Nose Contour */}
              <path d="M250 138 L247.5 152 L253 152" stroke="#8A4828" strokeWidth="1.6" strokeLinecap="round" fill="none" />

              {/* Confident Warm Smile */}
              <path d="M239 162 Q 250 171 261 162" stroke="#7A2218" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              <path d="M241 162 Q 250 166 259 162" stroke="#FFFFFF" strokeWidth="1.2" strokeLinecap="round" fill="none" opacity="0.9" />

              {/* Gold Stud Earrings */}
              <circle cx="212" cy="142" r="3.5" fill="url(#goldAcc)" />
              <circle cx="288" cy="142" r="3.5" fill="url(#goldAcc)" />

              {/* Cleavage V-Neck Skin */}
              <path d="M234 220 L250 256 L266 220 Z" fill="url(#photoSkin)" />

              {/* Torso: Black Pinstripe Sleeveless Waistcoat */}
              <path d="M190 225 L234 220 L250 258 L266 220 L310 225 L318 360 L290 400 L250 420 L210 400 L182 360 Z" fill="url(#photoVest)" />
              <path d="M190 225 L234 220 L250 258 L266 220 L310 225 L318 360 L290 400 L250 420 L210 400 L182 360 Z" fill="url(#realPinstripe)" />

              {/* Vest Buttons */}
              <circle cx="250" cy="285" r="3.2" fill="#0E1116" stroke="#334155" strokeWidth="0.8" />
              <circle cx="250" cy="320" r="3.2" fill="#0E1116" stroke="#334155" strokeWidth="0.8" />
              <circle cx="250" cy="355" r="3.2" fill="#0E1116" stroke="#334155" strokeWidth="0.8" />

              {/* Crossed Arms */}
              <path d="M310 225 C 335 250 345 320 320 370 C 295 400 230 380 200 370 L 210 330 C 240 345 285 360 295 330 C 310 300 295 250 270 230 Z" fill="url(#photoSkin)" />
              <path d="M190 225 C 165 250 155 310 175 365 C 195 410 270 415 315 375 L 300 340 C 265 370 220 365 205 335 C 195 305 205 250 230 230 Z" fill="url(#photoSkin)" />

              {/* Left Wrist Real Gold Watch */}
              <rect x="238" y="360" width="22" height="10" rx="3" fill="url(#goldAcc)" transform="rotate(-15 249 365)" />
              <circle cx="249" cy="365" r="6" fill="#FFFFFF" stroke="url(#goldAcc)" strokeWidth="1.5" />
              <line x1="249" y1="365" x2="251" y2="362" stroke="#1E293B" strokeWidth="0.8" />

              {/* Gold Ring on Finger */}
              <circle cx="198" cy="358" r="3" fill="url(#goldAcc)" />

              {/* Hands / Fingers Tucked */}
              <path d="M185 345 Q 170 370 195 385" stroke="#BA7854" strokeWidth="3" fill="none" />
              <path d="M305 340 Q 325 365 300 380" stroke="#BA7854" strokeWidth="3" fill="none" />

              {/* Matching Pinstripe Trousers */}
              <path d="M205 400 L295 400 L310 620 L190 620 Z" fill="url(#photoPants)" />
              <path d="M205 400 L295 400 L310 620 L190 620 Z" fill="url(#realPinstripe)" />
            </svg>
          </div>
        )}

      </div>

      {/* Faculty Name Tag */}
      <div className="mt-4 text-center space-y-0.5">
        <h3 className="text-base font-bold text-slate-900 tracking-tight">
          Mrs. Ruwanthi Senanayaka
        </h3>
        <p className="text-xs font-medium text-slate-500">
          Lead Faculty · A/L Accounting (Sinhala &amp; English Medium)
        </p>
      </div>

    </div>
  );
};
