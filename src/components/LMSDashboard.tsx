import React, { useState } from 'react';
import { CurrentUser, VideoModule, PastPaper, StudyMaterial } from '../types';
import { videoModulesData, pastPapersData, studyMaterialsData } from '../data/mockData';
import { ModulePaymentModal, UnlockedModule } from './ModulePaymentModal';
import { InspireLogo } from './InspireLogo';
import { 
  Search, 
  Play, 
  BookOpen, 
  FileText, 
  Layers, 
  Video, 
  ChevronRight, 
  Bell, 
  ShoppingBag, 
  Lock,
  ArrowRight,
  ArrowLeft,
  X,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  MoreHorizontal
} from 'lucide-react';

interface LMSDashboardProps {
  currentUser: CurrentUser;
  onSelectVideo: (video: VideoModule) => void;
  onSelectPaper: (paper: PastPaper) => void;
  onAddToCart: (material: StudyMaterial) => void;
}

type LMSSidebarItem = 
  | 'my-lessons'
  | 'al-2028'
  | 'al-2027'
  | 'al-2026'
  | 'al-video-modules'
  | 'git'
  | 'ol-courses'
  | 'paper-class'
  | 'tutes'
  | 'past-papers';

// Detailed video lessons available inside each monthly batch
interface MonthlyVideoItem {
  id: string;
  lessonNo: string;
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  date: string;
  topic: string;
  chapters: { title: string; time: string }[];
  notesSummary: string[];
}

export const LMSDashboard: React.FC<LMSDashboardProps> = ({
  currentUser,
  onSelectVideo,
  onSelectPaper,
  onAddToCart
}) => {
  const [activeSidebar, setActiveSidebar] = useState<LMSSidebarItem>('my-lessons');
  const [sidebarSearch, setSidebarSearch] = useState<string>('');
  const [selectedPaymentModule, setSelectedPaymentModule] = useState<UnlockedModule | null>(null);

  // Month detail navigation: when a user clicks 'Visit' inside an A/L batch month
  const [selectedMonthId, setSelectedMonthId] = useState<string | null>(null);

  // Mobile sidebar drawer state: retracts to 3 dots (•••) and slides from left
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState<boolean>(false);

  // Available monthly modules
  const [monthlyModules, setMonthlyModules] = useState<UnlockedModule[]>([
    {
      id: 'mod-2027-sep',
      batch: 'A/L 2027',
      month: 'September',
      title: '2027 Revision - September (Partnership Accounts)',
      priceLKR: 3000,
      description: '2027 සිද්ධාන්ත සජීවී පන්තිය සෑම බ්‍රහස්පතින්දාම ප.ව. 3.30 සිට 6.00 දක්වා. පසුගිය විභාග ප්‍රශ්නපත්‍ර සාකච්ඡා කෙරේ. සජීවී විකාශය මගහැරුණහොත් ඕනෑම වෙලාවක නැරඹිය හැකිය.',
      isUnlocked: true,
      videoCount: 4,
      tuteCount: 2
    },
    {
      id: 'mod-2027-aug',
      batch: 'A/L 2027',
      month: 'August',
      title: 'August Month Lesson - (Financial Statements & LKAS 01)',
      priceLKR: 3000,
      description: '2027 සිද්ධාන්ත සජීවී පන්තිය සහ පුනරීක්ෂණ. සියලුම සිසුන් සඳහා අදාළ video ද මේ සමඟ ලබාදේ. පන්ති ගාස්තු ගෙවීමෙන් පසු සියල්ල සක්‍රිය වේ.',
      isUnlocked: true,
      videoCount: 4,
      tuteCount: 1
    },
    {
      id: 'mod-2027-jul',
      batch: 'A/L 2027',
      month: 'July',
      title: 'July Month Lesson - (Double Entry Principles & Adjustments)',
      priceLKR: 3000,
      description: 'ද්විත්ව සටහන් මූලධර්ම, ශේෂ පිරික්සුම සහ ගැලපීම් සහිත මූල්‍ය ප්‍රකාශන සැකසීම පිළිබඳ පූර්ණ න්‍යායාත්මක විවරණය.',
      isUnlocked: true,
      videoCount: 4,
      tuteCount: 2
    },
    {
      id: 'mod-2027-oct',
      batch: 'A/L 2027',
      month: 'October',
      title: 'October Month Masterclass - (LKAS 02 Inventories & Manufacturing Accounts)',
      priceLKR: 3000,
      description: 'නිෂ්පාදන ගිණුම්කරණය සහ LKAS 02 තොග ප්‍රමිතිය පිළිබඳ විශේෂ පුහුණු සැසි මාලාව.',
      isUnlocked: false,
      videoCount: 4,
      tuteCount: 2
    },
    {
      id: 'mod-2028-oct',
      batch: 'A/L 2028',
      month: 'October',
      title: 'October Month Lesson - Number Systems & Accounting Intro',
      priceLKR: 3000,
      description: '2028 සිද්ධාන්ත සජීවී පන්තිය සෑම අඟහරුවාදාකම රාත්‍රී 7.00 සිට 9.00 දක්වා පැවැත්වේ. සජීවී විකාශය හෝ ඕනෑම වෙලාවක නැරඹිය හැකිය.',
      isUnlocked: false,
      videoCount: 4,
      tuteCount: 1
    },
    {
      id: 'mod-2028-sep',
      batch: 'A/L 2028',
      month: 'September',
      title: 'September Month Lesson - Accounting Equations & Double Entry',
      priceLKR: 3000,
      description: '2028 සිද්ධාන්ත සජීවී පන්තිය සෑම අඟහරුවාදාකම රාත්‍රී 7.00 සිට 9.00 දක්වා පැවැත්වේ. සජීවී විකාශය හෝ ඕනෑම වෙලාවක පැමිණ නැවත නැරඹිය හැකිය.',
      isUnlocked: true,
      videoCount: 4,
      tuteCount: 1
    },
    {
      id: 'mod-2026-sprint',
      batch: 'A/L 2026',
      month: 'Final Sprint',
      title: '2026 Intensive Paper Class & Model Discussion',
      priceLKR: 3500,
      description: '2026 විභාගය ඉලක්ක කරගත් වේගවත් පුනරීක්ෂණ සහ විශේෂ ආදර්ශ ප්‍රශ්න පත්‍ර සාකච්ඡාව.',
      isUnlocked: true,
      videoCount: 6,
      tuteCount: 3
    }
  ]);

  // Specific videos available inside months when students visit a month
  const monthlyVideosMap: Record<string, MonthlyVideoItem[]> = {
    'mod-2027-sep': [
      {
        id: 'v-2027-sep-01',
        lessonNo: 'Lesson 01',
        title: 'Partnership Act 1890 Provisions, Capital & Current Accounts',
        subtitle: 'Foundation principles, capital ratios vs profit sharing, and opening ledger setups',
        description: 'ව්‍යාපාර හවුල් ගිවිසුම්, 1890 හවුල් ව්‍යාපාර ආඥාපනතේ වගන්ති, ස්ථාවර සහ විචල්‍ය ප්‍රාග්ධන ගිණුම් ක්‍රම පිළිබඳ පූර්ණ ප්‍රායෝගික සාකච්ඡාව.',
        duration: '1h 48m',
        date: 'Sep 04, 2025',
        topic: 'Partnership Accounts',
        chapters: [
          { title: '01. 1890 Partnership Act Statutory Provisions', time: '00:00' },
          { title: '02. Fixed vs Fluctuating Capital Architecture', time: '24:10' },
          { title: '03. Profit & Loss Appropriation Schedule', time: '52:15' },
          { title: '04. Worked Illustration with Current Account Balances', time: '1:20:00' }
        ],
        notesSummary: [
          'In the absence of an agreement, profits and losses are shared equally.',
          'Partners are not entitled to interest on capital unless expressly agreed.',
          'Interest at 5% per annum is payable on partner advances/loans.'
        ]
      },
      {
        id: 'v-2027-sep-02',
        lessonNo: 'Lesson 02',
        title: 'Goodwill Valuation & Admission of a New Partner',
        subtitle: 'Super-profit formula, goodwill adjustments, and revaluation on entry',
        description: 'නව හවුල්කරුවෙකු ඇතුළත් කරගැනීමේදී කීර්තිනාම ගණනය කිරීම, කීර්තිනාම ගිණුම විවෘත කිරීම සහ වසාදැමීම පිළිබඳ විභාග ආදර්ශ ගැටලු.',
        duration: '1h 55m',
        date: 'Sep 11, 2025',
        topic: 'Goodwill & Admission',
        chapters: [
          { title: '01. Why Goodwill Arises upon Partner Admission', time: '00:00' },
          { title: '02. Super Profits & Capitalisation Calculation Rules', time: '28:30' },
          { title: '03. Ledger Adjustments without Retaining Goodwill Account', time: '58:00' },
          { title: '04. Comprehensive Admission Drill with Past Exam Question', time: '1:26:40' }
        ],
        notesSummary: [
          'Goodwill must only be recognized in accounts if acquired or temporarily adjusted.',
          'Sacrificing ratio governs how existing partners share incoming partner contribution.'
        ]
      },
      {
        id: 'v-2027-sep-03',
        lessonNo: 'Lesson 03',
        title: 'Revaluation Account & Retirement of a Partner',
        subtitle: 'Asset & liability revaluation, settlement of retiring partner balances',
        description: 'හවුල්කරුවෙකු විශ්‍රාම යාමේදී වත්කම් හා වගකීම් ප්‍රතිමූල්‍යනය, ලාභ/අලාභ බෙදීයාම සහ විශ්‍රාමික හවුල්කරුට හිමි මුදල් පියවීම.',
        duration: '2h 10m',
        date: 'Sep 18, 2025',
        topic: 'Revaluation & Retirement',
        chapters: [
          { title: '01. Revaluation Account Double-Entry Mechanism', time: '00:00' },
          { title: '02. Provision for Depreciation and Bad Debts Revaluation', time: '36:15' },
          { title: '03. Retiring Partner Loan Account Settlement Terms', time: '1:10:00' },
          { title: '04. Complete Balance Sheet after Partner Departure', time: '1:45:10' }
        ],
        notesSummary: [
          'Revaluation profit/loss is distributed among all partners in their old profit-sharing ratio.',
          'Retiring partner share may be transferred to a loan account bearing commercial interest.'
        ]
      },
      {
        id: 'v-2027-sep-04',
        lessonNo: 'Lesson 04',
        title: 'Dissolution of Partnership & National Exam Model Walkthrough',
        subtitle: 'Realisation account, settlement order under Section 44, and model paper review',
        description: 'හවුල් ව්‍යාපාරයක් විසිරුවා හැරීම, උපලබ්ධි ගිණුම පිළියෙල කිරීම, 44 වන වගන්තිය යටතේ වගකීම් පියවීමේ ප්‍රමුඛතාව සහ ආදර්ශ ප්‍රශ්න පත්‍රය.',
        duration: '1h 42m',
        date: 'Sep 25, 2025',
        topic: 'Dissolution & Past Papers',
        chapters: [
          { title: '01. Dissolution Mechanics: Realisation Account Opening', time: '00:00' },
          { title: '02. Section 44 Priority Order in Settling Liabilities', time: '26:50' },
          { title: '03. Garner v Murray Rule & Partner Deficiencies', time: '55:10' },
          { title: '04. Full 2024 National Exam Essay Question Discussion', time: '1:18:00' }
        ],
        notesSummary: [
          'External liabilities must be settled prior to partner loans or capital payouts.',
          'Piecemeal realization ensures no overpayment before all assets are liquidated.'
        ]
      }
    ],
    'mod-2027-aug': [
      {
        id: 'v-2027-aug-01',
        lessonNo: 'Lesson 01',
        title: 'Financial Statements Framework & LKAS 01 Standards',
        subtitle: 'Presentation of financial statements, statement of comprehensive income',
        description: 'LKAS 01 ප්‍රමිතියට අනුව පුළුල් ආදායම් ප්‍රකාශනය සහ මූල්‍ය තත්ත්ව ප්‍රකාශනය පිළියෙල කිරීමේ ප්‍රමිතිගත රාමුව.',
        duration: '1h 50m',
        date: 'Aug 07, 2025',
        topic: 'LKAS 01 Financial Reporting',
        chapters: [
          { title: '01. Purpose and Scope of LKAS 01 Standard', time: '00:00' },
          { title: '02. Statement of Profit or Loss Classification by Nature vs Function', time: '30:00' },
          { title: '03. Other Comprehensive Income (OCI) Components', time: '1:05:00' }
        ],
        notesSummary: ['Expenses can be presented either by nature or by function based on operational clarity.']
      },
      {
        id: 'v-2027-aug-02',
        lessonNo: 'Lesson 02',
        title: 'Statement of Financial Position (Balance Sheet) & Disclosures',
        subtitle: 'Current vs non-current assets, equity layout, and note structures',
        description: 'වත්කම් හා වගකීම් ජංගම සහ ජංගම නොවන ලෙස වෙන්කිරීම සහ මූල්‍ය ප්‍රකාශන සටහන් සම්පාදනය.',
        duration: '2h 05m',
        date: 'Aug 14, 2025',
        topic: 'LKAS 01 Balance Sheet',
        chapters: [
          { title: '01. Current vs Non-Current Asset Segregation Criteria', time: '00:00' },
          { title: '02. Equity and Reserve Classifications', time: '40:00' },
          { title: '03. Mandatory Note Disclosures for Examination Questions', time: '1:20:00' }
        ],
        notesSummary: ['Operating cycle rule defines current asset status for inventory and trade debtors.']
      }
    ]
  };

  const handleUnlockSuccess = (moduleId: string) => {
    setMonthlyModules(prev => 
      prev.map(m => m.id === moduleId ? { ...m, isUnlocked: true } : m)
    );
  };

  const sidebarLinks: { id: LMSSidebarItem; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'my-lessons', label: 'My Lessons', icon: Play },
    { id: 'al-2028', label: 'A/L 2028', icon: BookOpen },
    { id: 'al-2027', label: 'A/L 2027', icon: BookOpen },
    { id: 'al-2026', label: 'A/L 2026', icon: BookOpen },
    { id: 'al-video-modules', label: 'AL Video Modules', icon: Video },
    { id: 'git', label: 'GIT', icon: Layers },
    { id: 'ol-courses', label: 'O/L Courses', icon: BookOpen },
    { id: 'paper-class', label: 'Paper Class', icon: FileText },
    { id: 'tutes', label: 'Tutes', icon: BookOpen },
    { id: 'past-papers', label: 'Past Papers', icon: FileText }
  ];

  // When a student selects a specific video inside a monthly batch
  const handleLaunchMonthlyVideo = (item: MonthlyVideoItem) => {
    const convertedVideo: VideoModule = {
      id: item.id,
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      duration: item.duration,
      date: item.date,
      month: selectedMonthModule ? selectedMonthModule.month : 'September',
      topic: item.topic,
      thumbnailGradient: 'from-blue-600/30 to-indigo-600/20',
      chapters: item.chapters,
      notesSummary: item.notesSummary
    };
    onSelectVideo(convertedVideo);
  };

  const selectedMonthModule = monthlyModules.find(m => m.id === selectedMonthId);
  const selectedMonthVideos = selectedMonthId ? (monthlyVideosMap[selectedMonthId] || monthlyVideosMap['mod-2027-sep']) : [];

  // Reusable Sidebar Nav Content (used for both desktop column & mobile slide-out drawer)
  const renderSidebarContent = (isMobile: boolean = false) => (
    <div className="space-y-4 text-left h-full flex flex-col justify-between">
      <div className="space-y-4">
        {/* Header with Inspire Logo & Active Badge */}
        <div className="pb-3 border-b border-slate-100/80 flex items-center justify-between">
          <InspireLogo size="sm" />
          {isMobile ? (
            <button
              onClick={() => setIsMobileDrawerOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/50">
              LMS Active
            </span>
          )}
        </div>

        {/* Search */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={sidebarSearch}
            onChange={(e) => setSidebarSearch(e.target.value)}
            placeholder="Search lessons or topics..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50/80 border border-slate-200/60 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-normal transition-all"
          />
        </div>

        {/* Nav Links */}
        <nav className="space-y-1 pt-1">
          {sidebarLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeSidebar === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSidebar(item.id);
                  setSelectedMonthId(null); // Reset month sub-view when switching main categories
                  if (isMobile) setIsMobileDrawerOpen(false);
                }}
                className={`w-full px-3 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-all ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-xs font-bold'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.id === 'past-papers' && (
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Student Badge Footer in Sidebar */}
      <div className="pt-4 border-t border-slate-100/80 flex items-center justify-between">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div className="min-w-0 text-left">
            <p className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{currentUser.batch}</p>
          </div>
        </div>
        <div className="relative p-2 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 cursor-pointer transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
            4
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full pb-20">
      
      {/* ─────────────────────────────────────────────────────────────
          MOBILE SLIDE-OUT DRAWER (Retracts to 3 dots, expands from left)
          Screenshot 2026-10-07 at 01.06.38.png
         ───────────────────────────────────────────────────────────── */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-300 ${
          isMobileDrawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop overlay */}
        <div 
          className="absolute inset-0 bg-slate-950/40 backdrop-blur-xs"
          onClick={() => setIsMobileDrawerOpen(false)} 
        />
        
        {/* Off-canvas panel sliding from the left */}
        <aside 
          className={`absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-white shadow-2xl p-5 transform transition-transform duration-300 ease-out flex flex-col justify-between ${
            isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          {renderSidebarContent(true)}
        </aside>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          LMS MAIN GRID: Clean Desktop Sidebar (col 3) + Main Area (col 9)
          Generous whitespace, soft light aesthetic matching homepage
         ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ── DESKTOP LEFT SIDEBAR (Hidden on mobile, stays left on lg) ── */}
        <aside className="hidden lg:block lg:col-span-3 bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.03)] p-5 sticky top-24">
          {renderSidebarContent(false)}
        </aside>

        {/* ── RIGHT MAIN CONTENT AREA (9 cols on desktop) ─────────────── */}
        <main className="lg:col-span-9 space-y-6 text-left">
          
          {/* Top Bar: Mobile 3-Dots Button + Clean Light Breadcrumbs */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)] px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-4">
            
            <div className="flex items-center gap-3">
              {/* 3-Dots Menu Button for Mobile to retract/expand sidebar from left */}
              <button
                onClick={() => setIsMobileDrawerOpen(true)}
                className="lg:hidden flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 text-slate-800 font-bold text-xs transition-colors shadow-2xs"
                title="Open LMS navigation menu"
              >
                <MoreHorizontal className="w-4 h-4 text-slate-700" />
                <span className="font-semibold">Modules</span>
              </button>

              {/* Breadcrumb Trail */}
              <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                <span className="hover:text-slate-800 cursor-pointer" onClick={() => setSelectedMonthId(null)}>LMS</span>
                <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                <span className="capitalize font-semibold text-slate-700">
                  {activeSidebar.replace(/-/g, ' ')}
                </span>
                {selectedMonthModule && (
                  <>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
                    <span className="text-emerald-700 font-bold truncate">
                      {selectedMonthModule.month} Lessons
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Back Button if inside a month */}
            {selectedMonthId && (
              <button
                onClick={() => setSelectedMonthId(null)}
                className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 px-3.5 py-1.5 rounded-xl border border-slate-200/50 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>All Months</span>
              </button>
            )}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              VIEW 1: MY LESSONS VIEW (Clean Light Themed Cards)
             ───────────────────────────────────────────────────────────── */}
          {activeSidebar === 'my-lessons' && (
            <div className="space-y-6">
              
              {/* Welcome Banner Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-slate-950 via-slate-900 to-blue-950 text-white shadow-md relative overflow-hidden">
                <div className="relative z-10 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Welcome to Your Student Portal</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                    {currentUser.name} · {currentUser.batch}
                  </h2>
                  <p className="text-xs text-slate-300 max-w-xl leading-relaxed">
                    Watch latest lectures, download official LKAS study materials, and access past examination model walkthroughs conducted by Mrs. Ruwanthi Senanayaka.
                  </p>
                </div>
              </div>

              {/* Video Lessons Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoModulesData.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-6 space-y-4 transition-all flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                          {item.topic}
                        </span>
                        <span className="text-xs text-slate-400 font-medium">
                          {item.duration}
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                        {item.title}
                      </h3>

                      {/* Video Thumbnail Box */}
                      <div 
                        className="relative aspect-[16/9] rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center text-white group cursor-pointer shadow-sm"
                        onClick={() => onSelectVideo(item)}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-md">
                          <Play className="w-5 h-5 fill-white ml-0.5" />
                        </div>
                        <span className="absolute bottom-2.5 right-3 text-[11px] font-sans font-semibold bg-black/70 px-2 py-0.5 rounded text-white">
                          {item.duration}
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-slate-50">
                      <span className="text-[11px] text-slate-400 font-medium">
                        Live recording
                      </span>
                      <button
                        onClick={() => onSelectVideo(item)}
                        className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Watch Lesson</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW 2: A/L 2027 / 2028 / 2026 BATCH MODULES
              If selectedMonthId is NULL -> Shows Months Grid (Screenshot 00.08.33 & 00.08.55)
              If selectedMonthId is SET -> Shows Multi-Videos inside that Month!
             ───────────────────────────────────────────────────────────── */}
          {(activeSidebar === 'al-2027' || activeSidebar === 'al-2028' || activeSidebar === 'al-2026') && (
            <div>
              {!selectedMonthId ? (
                /* ── MONTHS LIST FOR THE BATCH ── */
                <div className="space-y-6">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-slate-900">
                        {activeSidebar === 'al-2027' && 'A/L 2027 Accounting Monthly Masterclasses'}
                        {activeSidebar === 'al-2028' && 'A/L 2028 Accounting Foundation Modules'}
                        {activeSidebar === 'al-2026' && 'A/L 2026 Intensive Examination Revisions'}
                      </h3>
                      <p className="text-xs text-slate-500">
                        Select an unlocked month to access all recorded lectures and study tutes.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {monthlyModules
                      .filter(m => {
                        if (activeSidebar === 'al-2027') return m.batch === 'A/L 2027';
                        if (activeSidebar === 'al-2028') return m.batch === 'A/L 2028';
                        return m.batch === 'A/L 2026';
                      })
                      .map((mod) => (
                        <div
                          key={mod.id}
                          className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-6 md:p-7 space-y-5 text-left flex flex-col justify-between transition-all"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                                {mod.month} · {mod.batch}
                              </span>
                              <span className="text-xs text-slate-400 font-medium">
                                {mod.videoCount} Videos
                              </span>
                            </div>

                            <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                              {mod.title}
                            </h3>

                            {/* If Locked, show Rs. 3000.00 Price Tag matching Screenshot 00.08.55 */}
                            {!mod.isUnlocked && (
                              <div className="py-2 px-4 rounded-2xl bg-rose-50/70 border border-rose-100 text-center">
                                <span className="text-xl font-bold text-rose-600 font-sans">
                                  Rs. {mod.priceLKR.toFixed(2)}
                                </span>
                                <span className="text-[11px] text-rose-500 block">Class fee per month</span>
                              </div>
                            )}

                            <p className="text-xs text-slate-600 leading-relaxed">
                              {mod.description}
                            </p>
                          </div>

                          {/* Action Button: 'Visit' if unlocked (navigates inside month), 'Apply' if locked */}
                          <div className="pt-4 flex items-center justify-between border-t border-slate-50">
                            <span className="text-xs text-slate-500 font-medium">
                              {mod.tuteCount} Tutes included
                            </span>

                            {mod.isUnlocked ? (
                              <button
                                onClick={() => setSelectedMonthId(mod.id)}
                                className="px-6 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all hover:scale-[1.02]"
                              >
                                <span>Visit Month</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => setSelectedPaymentModule(mod)}
                                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-colors"
                              >
                                <Lock className="w-3.5 h-3.5" />
                                <span>Apply (Pay)</span>
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ) : (
                /* ── INSIDE THE SELECTED MONTH: MULTI-VIDEO SELECTION ── */
                <div className="space-y-6">
                  
                  {/* Month Hero Header */}
                  <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_6px_30px_rgba(0,0,0,0.03)] space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        <span>{selectedMonthModule?.batch} · {selectedMonthModule?.month} Curriculum</span>
                      </div>
                      <span className="text-xs font-semibold text-slate-500">
                        {selectedMonthVideos.length} Recorded Sessions Available
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      {selectedMonthModule?.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
                      Select any session below to launch the video classroom. Includes full question discussion and downloadable note summaries.
                    </p>
                  </div>

                  {/* Multi-Videos Grid inside this month */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {selectedMonthVideos.map((videoItem) => (
                      <div
                        key={videoItem.id}
                        className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-6 space-y-4 flex flex-col justify-between transition-all"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
                              {videoItem.lessonNo}
                            </span>
                            <span className="text-xs font-sans font-semibold text-slate-400">
                              {videoItem.duration}
                            </span>
                          </div>

                          <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                            {videoItem.title}
                          </h3>

                          {/* Video Playable Box */}
                          <div 
                            className="relative aspect-[16/9] rounded-2xl bg-slate-950 overflow-hidden flex items-center justify-center text-white group cursor-pointer shadow-xs"
                            onClick={() => handleLaunchMonthlyVideo(videoItem)}
                          >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:scale-110 transition-transform">
                              <Play className="w-5 h-5 fill-white ml-0.5" />
                            </div>
                            <span className="absolute bottom-2.5 right-3 text-[11px] font-sans font-semibold bg-black/70 px-2 py-0.5 rounded text-white">
                              {videoItem.duration}
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {videoItem.description}
                          </p>
                        </div>

                        <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Calendar className="w-3.5 h-3.5" />
                            <span>{videoItem.date}</span>
                          </div>

                          <button
                            onClick={() => handleLaunchMonthlyVideo(videoItem)}
                            className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all hover:scale-[1.02]"
                          >
                            <Play className="w-3.5 h-3.5 fill-white" />
                            <span>Watch Session</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Month Tutes Attachment */}
                  <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <h4 className="text-sm font-bold text-slate-900">Study Materials for this Month</h4>
                      </div>
                      <span className="text-xs text-slate-400">2 Publications Included</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {studyMaterialsData.slice(0, 2).map((tute) => (
                        <div key={tute.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-100 flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-900 truncate">{tute.title}</p>
                            <p className="text-[11px] text-slate-500">{tute.pageCount} Pages · Official PDF</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <button
                              onClick={() => {
                                const paper = pastPapersData[0];
                                onSelectPaper(paper);
                              }}
                              className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:bg-slate-50 transition-colors shadow-2xs"
                            >
                              PDF
                            </button>
                            <button
                              onClick={() => onAddToCart(tute)}
                              className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-2xs"
                            >
                              Order
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW 3: PAST PAPERS GRID (Clean Light Cards, Yearly Tabs)
             ───────────────────────────────────────────────────────────── */}
          {activeSidebar === 'past-papers' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">A/L Accounting Past Examination Archives</h3>
                  <p className="text-xs text-slate-500">Official marking schemes and model answers for Sinhala and English medium.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[2025, 2024, 2023, 2022, 2021, 2020].map((yr) => {
                  const sinPaper = pastPapersData.find(p => p.year === yr && p.medium === 'sinhala') || pastPapersData[0];
                  const engPaper = pastPapersData.find(p => p.year === yr && p.medium === 'english') || pastPapersData[1];

                  return (
                    <div 
                      key={yr} 
                      className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] p-6 space-y-4 text-left"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          National Examination
                        </span>
                        <span className="text-sm font-black text-slate-950 font-sans">
                          {yr} Paper
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 pt-1">
                        {/* Sinhala Medium Card */}
                        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3 text-center flex flex-col justify-between">
                          <span className="text-xs font-bold text-slate-800 block">
                            Sinhala Medium
                          </span>
                          <button
                            onClick={() => onSelectPaper(sinPaper)}
                            className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-colors"
                          >
                            View PDF
                          </button>
                        </div>

                        {/* English Medium Card */}
                        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3 text-center flex flex-col justify-between">
                          <span className="text-xs font-bold text-slate-800 block">
                            English Medium
                          </span>
                          <button
                            onClick={() => onSelectPaper(engPaper)}
                            className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs shadow-2xs transition-colors"
                          >
                            View PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW 4: TUTES & STUDY MATERIALS (PDF + Physical Buy Button)
             ───────────────────────────────────────────────────────────── */}
          {activeSidebar === 'tutes' && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Study Handbooks &amp; Revision Notes</h3>
                  <p className="text-xs text-slate-500">Read digital PDF online or order physical printed handbooks delivered to your doorstep.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {studyMaterialsData.map((item) => (
                  <div 
                    key={item.id}
                    className="p-6 md:p-7 rounded-3xl bg-white border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] space-y-4 flex flex-col justify-between text-left transition-all"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
                          {item.batchTag}
                        </span>
                        <span className="text-xs font-semibold text-slate-400">
                          {item.pageCount} Pages
                        </span>
                      </div>

                      <h3 className="text-base font-extrabold text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-50 flex flex-wrap items-center gap-2 justify-between">
                      <button
                        onClick={() => {
                          const targetPaper = pastPapersData[0];
                          onSelectPaper(targetPaper);
                        }}
                        className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors"
                      >
                        <FileText className="w-3.5 h-3.5 text-blue-600" />
                        <span>PDF</span>
                      </button>

                      <button
                        onClick={() => onAddToCart(item)}
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart (Rs. {item.priceLKR})</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              VIEW 5: AL VIDEO MODULES / PAPER CLASS / GIT / OL
             ───────────────────────────────────────────────────────────── */}
          {(activeSidebar === 'al-video-modules' || activeSidebar === 'paper-class' || activeSidebar === 'git' || activeSidebar === 'ol-courses') && (
            <div className="space-y-6">
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 capitalize">
                    {activeSidebar.replace(/-/g, ' ')} Lecture Catalog
                  </h3>
                  <p className="text-xs text-slate-500">Comprehensive video archives with timestamped chapters.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoModulesData.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-white rounded-3xl border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.06)] p-6 space-y-4 text-left flex flex-col justify-between transition-all"
                  >
                    <div className="space-y-2">
                      <span className="text-[11px] font-sans font-semibold tracking-wider text-slate-400 block uppercase">
                        {item.topic}
                      </span>
                      <h3 className="text-base font-extrabold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-sans font-medium">{item.duration}</span>
                      <button
                        onClick={() => onSelectVideo(item)}
                        className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-2xs"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>Play Lesson</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

        </main>

      </div>

      {/* Module Payment Modal */}
      <ModulePaymentModal
        module={selectedPaymentModule}
        isOpen={Boolean(selectedPaymentModule)}
        onClose={() => setSelectedPaymentModule(null)}
        onSuccessUnlock={handleUnlockSuccess}
      />

    </div>
  );
};
