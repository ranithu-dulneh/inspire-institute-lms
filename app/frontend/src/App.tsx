import React, { useState, useEffect } from 'react';
import { 
  ActiveTab, 
  PastPaper, 
  VideoModule, 
  StudyMaterial, 
  CartItem, 
  CurrentUser, 
  WallOfFameRanker 
} from './types';
import { 
  initialUser, 
  pastPapersData, 
  videoModulesData, 
  studyMaterialsData, 
  wallOfFameData 
} from './data/mockData';
import { InspireLogo } from './components/InspireLogo';
import { Navbar } from './components/Navbar';
import { MobileBottomNav } from './components/MobileBottomNav';
import { LandingPage } from './components/LandingPage';
import { LMSDashboard } from './components/LMSDashboard';
import { PastPapersView } from './components/PastPapersView';
import { VideoModulesView } from './components/VideoModulesView';
import { StudyMaterialsStore } from './components/StudyMaterialsStore';
import { StudentLoginPortal } from './components/StudentLoginPortal';
import { InstitutionSelectModal, Institution } from './components/InstitutionSelectModal';
import { ResultsView } from './components/ResultsView';
import { PdfReaderModal } from './components/PdfReaderModal';
import { VideoPlayerModal } from './components/VideoPlayerModal';
import { WallOfFameModal } from './components/WallOfFameModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { EnrollmentModal } from './components/EnrollmentModal';
import { AdminPanelModal } from './components/AdminPanelModal';
import { RankerResultItem, defaultResultsData } from './components/PreviousResultsSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  // Default to null so public visitors do NOT see Papers and Videos before logging in
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [currency, setCurrency] = useState<'LKR' | 'USD'>('LKR');
  const [isInitializing, setIsInitializing] = useState(true);

  // Check for existing login on mount
  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('lms_token');
      if (token) {
        try {
          const response = await fetch('/api/users/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const data = await response.json();
            // Merge with some mock initial data just to satisfy types if needed,
            // but primarily use backend data
            setCurrentUser({
              ...initialUser,
              ...data.user
            });
            // If we were going to login, maybe redirect to LMS, else stay where we are
          } else {
            localStorage.removeItem('lms_token');
          }
        } catch (err) {
          console.error("Failed to verify token", err);
          localStorage.removeItem('lms_token');
        }
      }
      setIsInitializing(false);
    };
    checkLogin();
  }, []);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { material: studyMaterialsData[0], quantity: 1 }
  ]);

  // Modals state
  const [institutionSelectOpen, setInstitutionSelectOpen] = useState<boolean>(false);
  const [selectedInstitution, setSelectedInstitution] = useState<Institution | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<PastPaper | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoModule | null>(null);
  const [selectedRanker, setSelectedRanker] = useState<WallOfFameRanker | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState<boolean>(false);
  const [enrollmentModalOpen, setEnrollmentModalOpen] = useState<boolean>(false);
  const [adminPanelOpen, setAdminPanelOpen] = useState<boolean>(false);
  const [teacherPhotoUrl, setTeacherPhotoUrl] = useState<string | null>(() => {
    return localStorage.getItem('inspire_teacher_photo_cutout');
  });
  const [resultsData, setResultsData] = useState<RankerResultItem[]>(() => {
    const saved = localStorage.getItem('inspire_results_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return defaultResultsData;
      }
    }
    return defaultResultsData;
  });

  // Keyboard shortcut for Spotlight search (⌘K or Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cart operations
  const handleAddToCart = (material: StudyMaterial) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.material.id === material.id);
      if (existing) {
        return prev.map(item =>
          item.material.id === material.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { material, quantity: 1 }];
    });
    setCartDrawerOpen(true);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCartItems(prev =>
      prev
        .map(item => {
          if (item.material.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.material.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  if (isInitializing) {
    return <div className="min-h-screen flex items-center justify-center apple-bg-ambient">
      <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>;
  }

  return (
    <div className="min-h-screen apple-bg-ambient flex flex-col justify-between selection:bg-blue-500/20 selection:text-blue-900 relative">
      
      {/* Decorative Luminous Glass Reflection Mesh (Apple Blue Gradient) */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" 
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-300/20 rounded-full blur-[120px] -translate-y-1/2" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-sky-200/25 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-1/3 w-[650px] h-[650px] bg-blue-200/20 rounded-full blur-[140px]" />
      </div>

      {/* Top Floating Glass Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        currentUser={currentUser}
        onOpenSearch={() => setSearchModalOpen(true)}
        onOpenCart={() => setCartDrawerOpen(true)}
        cartCount={totalCartCount}
        onOpenEnrollment={() => setEnrollmentModalOpen(true)}
        onOpenInstituteSelect={() => setInstitutionSelectOpen(true)}
        onLogout={() => {
          localStorage.removeItem('lms_token');
          setCurrentUser(null);
          setActiveTab('home');
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-8">
        {activeTab === 'home' && (
          <LandingPage
            onNavigate={setActiveTab}
            onOpenEnrollment={() => setEnrollmentModalOpen(true)}
            onOpenLogin={() => setInstitutionSelectOpen(true)}
            onSelectRanker={setSelectedRanker}
            teacherImageUrl={teacherPhotoUrl || undefined}
            resultsData={resultsData}
          />
        )}

        {activeTab === 'lms' && (
          currentUser ? (
            <LMSDashboard
              currentUser={currentUser}
              onSelectVideo={setSelectedVideo}
              onSelectPaper={setSelectedPaper}
              onAddToCart={handleAddToCart}
            />
          ) : (
            <StudentLoginPortal
              selectedInstitute={selectedInstitution}
              onBackToInstituteSelect={() => setInstitutionSelectOpen(true)}
              onLoginSuccess={(user) => {
                setCurrentUser(user);
                setActiveTab('lms');
              }}
              onNavigate={setActiveTab}
            />
          )
        )}

        {activeTab === 'past-papers' && (
          <PastPapersView
            onSelectPaper={setSelectedPaper}
          />
        )}

        {activeTab === 'videos' && (
          <VideoModulesView
            onSelectVideo={setSelectedVideo}
          />
        )}

        {activeTab === 'store' && (
          <StudyMaterialsStore
            currency={currency}
            onToggleCurrency={() => setCurrency(c => c === 'LKR' ? 'USD' : 'LKR')}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'results' && (
          <ResultsView
            onSelectRanker={setSelectedRanker}
          />
        )}

        {activeTab === 'login' && (
          <StudentLoginPortal
            selectedInstitute={selectedInstitution}
            onBackToInstituteSelect={() => setInstitutionSelectOpen(true)}
            onLoginSuccess={(user) => {
              setCurrentUser(user);
              setActiveTab('lms');
            }}
            onNavigate={setActiveTab}
          />
        )}
      </main>

      {/* Footer (Clean Apple-Style Quiet Footer with Inspire Dark Logo) */}
      <footer className="w-full border-t border-slate-200/70 bg-white/60 backdrop-blur-xl mt-12 py-10 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <InspireLogo size="md" />
            <div className="border-l border-slate-200 pl-3 text-left">
              <p className="font-bold text-slate-900">Inspire Institution</p>
              <p className="text-[11px] text-slate-400">Department of Examination Certified A/L Curriculum</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 font-medium">
            {currentUser ? (
              <>
                <button onClick={() => setActiveTab('home')} className="hover:text-blue-700 transition-colors">Home</button>
                <button onClick={() => setActiveTab('lms')} className="hover:text-blue-700 transition-colors">LMS Dashboard</button>
                <button onClick={() => setActiveTab('past-papers')} className="hover:text-blue-700 transition-colors">Past Papers</button>
                <button onClick={() => setActiveTab('videos')} className="hover:text-blue-700 transition-colors">Lectures</button>
                <button onClick={() => setActiveTab('store')} className="hover:text-blue-700 transition-colors">Study Store</button>
                <button onClick={() => setActiveTab('results')} className="hover:text-blue-700 transition-colors">Wall of Fame</button>
              </>
            ) : (
              <>
                <button onClick={() => setActiveTab('home')} className="hover:text-blue-700 transition-colors">Home</button>
                <button onClick={() => {
                  const el = document.getElementById('results');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else setActiveTab('results');
                }} className="hover:text-blue-700 transition-colors">Results</button>
                <button onClick={() => setInstitutionSelectOpen(true)} className="hover:text-blue-700 transition-colors">Institutes</button>
                <button onClick={() => {
                  const el = document.getElementById('classes');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }} className="hover:text-blue-700 transition-colors">Classes</button>
                <button onClick={() => setInstitutionSelectOpen(true)} className="hover:text-blue-700 transition-colors">Student Login</button>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span>© {new Date().getFullYear()} Inspire Institution. All rights reserved.</span>
            <button
              onClick={() => setAdminPanelOpen(true)}
              className="text-slate-500 hover:text-slate-800 font-semibold underline transition-colors"
            >
              Admin Portal
            </button>
            {!currentUser && (
              <button
                onClick={() => {
                  setCurrentUser(initialUser);
                  setActiveTab('lms');
                }}
                className="text-blue-600 hover:text-blue-700 font-semibold underline"
              >
                Quick Demo
              </button>
            )}
          </div>
        </div>
      </footer>

      {/* Floating Bottom Nav for Mobile Screens */}
      <MobileBottomNav
        activeTab={activeTab}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        cartCount={totalCartCount}
        isLoggedIn={Boolean(currentUser)}
        onOpenLogin={() => setInstitutionSelectOpen(true)}
      />

      {/* Interactive Institution Select Modal (Popup before login per user requirement) */}
      <InstitutionSelectModal
        isOpen={institutionSelectOpen}
        onClose={() => setInstitutionSelectOpen(false)}
        onSelectInstitute={(inst) => {
          setSelectedInstitution(inst);
          setInstitutionSelectOpen(false);
          setActiveTab('login');
        }}
      />

      {/* Interactive Modals */}
      <PdfReaderModal
        paper={selectedPaper}
        onClose={() => setSelectedPaper(null)}
      />

      <VideoPlayerModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />

      <WallOfFameModal
        ranker={selectedRanker}
        onClose={() => setSelectedRanker(null)}
      />

      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        pastPapers={pastPapersData}
        videos={videoModulesData}
        materials={studyMaterialsData}
        onSelectPaper={(p) => {
          setSelectedPaper(p);
          setActiveTab('past-papers');
        }}
        onSelectVideo={(v) => {
          setSelectedVideo(v);
          setActiveTab('videos');
        }}
        onSelectMaterial={(m) => {
          handleAddToCart(m);
        }}
      />

      <EnrollmentModal
        isOpen={enrollmentModalOpen}
        onClose={() => setEnrollmentModalOpen(false)}
      />

      {/* Faculty Administrator Control Console */}
      <AdminPanelModal
        isOpen={adminPanelOpen}
        onClose={() => setAdminPanelOpen(false)}
        onTeacherPhotoUpdated={(newUrl) => setTeacherPhotoUrl(newUrl)}
        onResultsUpdated={(newResults) => setResultsData(newResults)}
      />
    </div>
  );
}
