import React, { useState } from 'react';
import { ActiveTab, CurrentUser } from '../types';
import { InspireLogo } from './InspireLogo';
import { 
  Menu, 
  X, 
  ChevronDown, 
  LogOut, 
  LayoutDashboard, 
  Search,
  ShoppingBag,
  Award,
  Sparkles,
  FileText,
  Video,
  Building2,
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  onNavigate: (tab: ActiveTab) => void;
  currentUser: CurrentUser | null;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  cartCount: number;
  onOpenEnrollment: () => void;
  onOpenInstituteSelect: () => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  currentUser,
  onOpenSearch,
  onOpenCart,
  cartCount,
  onOpenEnrollment,
  onOpenInstituteSelect,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  // When logged in: Student views
  const loggedInLinks: { id: ActiveTab; label: string }[] = [
    { id: 'home', label: 'Overview' },
    { id: 'lms', label: 'LMS Dashboard' },
    { id: 'past-papers', label: 'Past Papers' },
    { id: 'videos', label: 'Video Modules' },
    { id: 'store', label: 'Study Materials' },
    { id: 'results', label: 'Wall of Fame' }
  ];

  // When NOT logged in: Public links matching Screenshot 2026-10-06 at 23.53.28.png
  // ("when a student is in the home page without logging into the lms, papers and videos button should not be visible to him before logging in")
  const publicLinks = [
    { id: 'results', label: 'Results' },
    { id: 'institutes', label: 'Institutes' },
    { id: 'classes', label: 'Classes' },
    { id: 'faculty', label: 'Ruwanthi Senanayaka' },
    { id: 'lms-gate', label: 'LMS Platform' },
    { id: 'contact', label: 'Contact' }
  ];

  const handlePublicClick = (id: string) => {
    setMobileMenuOpen(false);
    if (id === 'results') {
      const el = document.getElementById('results');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else onNavigate('results');
    } else if (id === 'institutes') {
      onOpenInstituteSelect();
    } else if (id === 'classes') {
      const el = document.getElementById('classes');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'faculty') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'lms-gate') {
      onOpenInstituteSelect();
    } else if (id === 'contact') {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-3 sm:top-4 z-50 w-full px-3 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300">
      {/* Floating Apple Liquid Glass Pill Header */}
      <div className="w-full bg-white/85 backdrop-blur-2xl border border-white/95 shadow-[0_10px_35px_-10px_rgba(15,23,42,0.08)] rounded-full px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Left: Inspire Dark Crest Logo everywhere */}
        <div 
          onClick={() => {
            onNavigate('home');
            setMobileMenuOpen(false);
          }}
          className="cursor-pointer group shrink-0"
        >
          <InspireLogo size="md" />
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1">
          {currentUser ? (
            // Logged In Tabs
            <div className="flex items-center gap-1 p-1 bg-slate-100/70 rounded-full border border-slate-200/60">
              {loggedInLinks.map((link) => {
                const isActive = activeTab === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => onNavigate(link.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 whitespace-nowrap ${
                      isActive 
                        ? 'bg-white text-slate-950 shadow-xs font-bold' 
                        : 'text-slate-600 hover:text-slate-950 hover:bg-white/40'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>
          ) : (
            // Public Navigation (No papers or videos button when not logged in!)
            <div className="flex items-center gap-6 text-xs font-semibold text-slate-600">
              {publicLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handlePublicClick(link.id)}
                  className="hover:text-slate-950 transition-colors py-1"
                >
                  {link.label}
                </button>
              ))}
            </div>
          )}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 text-xs font-medium border border-slate-200/60 transition-colors"
            title="Search (⌘K)"
          >
            <Search className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] text-slate-500 font-sans">⌘K</span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-full hover:bg-slate-100 text-slate-600 hover:text-slate-900 transition-colors"
            title="Study Materials Cart"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Account / Login & Register buttons */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200/80 border border-slate-200/80 text-xs font-semibold text-slate-800 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[11px] font-bold">
                  {currentUser.name.charAt(0)}
                </div>
                <span className="hidden sm:inline max-w-[80px] truncate">{currentUser.name}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white/95 backdrop-blur-2xl border border-white/90 shadow-xl p-2 z-50 text-left space-y-1">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-500 font-sans">{currentUser.indexNumber}</p>
                    <p className="text-[10px] text-emerald-600 font-medium">{currentUser.batch}</p>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('lms');
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-blue-600" />
                    <span>LMS Student Hub</span>
                  </button>
                  <button
                    onClick={() => {
                      onLogout();
                      setUserDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 rounded-xl text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenInstituteSelect}
                className="px-4 py-1.5 rounded-full bg-white hover:bg-slate-50 text-slate-900 border border-slate-200/90 text-xs font-bold transition-all shadow-xs"
              >
                Login
              </button>
              <button
                onClick={onOpenEnrollment}
                className="hidden sm:flex items-center gap-1 px-4 py-1.5 rounded-full bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
              >
                <span>Register</span>
              </button>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 w-full rounded-3xl bg-white/95 backdrop-blur-2xl border border-white/90 shadow-2xl p-5 space-y-3">
          {currentUser ? (
            <div className="grid grid-cols-2 gap-2">
              {loggedInLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`p-3 rounded-2xl text-xs font-semibold text-left transition-all ${
                    activeTab === link.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col space-y-2 text-left">
              {publicLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handlePublicClick(link.id)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-800 hover:bg-slate-100 transition-colors text-left"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2 border-t border-slate-100 flex gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInstituteSelect();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 text-slate-900 text-xs font-bold"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenEnrollment();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-slate-950 text-white text-xs font-bold"
                >
                  Register
                </button>
              </div>
            </div>
          )}
        </div>
      )}

    </header>
  );
};
