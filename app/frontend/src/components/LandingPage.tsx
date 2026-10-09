import React from 'react';
import { ActiveTab, WallOfFameRanker } from '../types';
import { TeacherPortraitCutout } from './TeacherPortraitCutout';
import { TypewriterText } from './TypewriterText';
import { PreviousResultsSection, RankerResultItem } from './PreviousResultsSection';
import { 
  ArrowRight, 
  RotateCcw, 
  FileText, 
  BookOpen, 
  Scale, 
  Zap, 
  Video, 
  ChevronRight, 
  Sparkles, 
  Play 
} from 'lucide-react';

interface LandingPageProps {
  onNavigate: (tab: ActiveTab) => void;
  onOpenEnrollment: () => void;
  onOpenLogin: () => void;
  onSelectRanker: (ranker: WallOfFameRanker) => void;
  teacherImageUrl?: string;
  resultsData?: RankerResultItem[];
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onOpenEnrollment,
  onOpenLogin,
  onSelectRanker,
  teacherImageUrl,
  resultsData
}) => {
  return (
    <div className="space-y-28 md:space-y-36 pb-32 text-left">
      
      {/* ─────────────────────────────────────────────────────────────
          HERO SECTION: Clean, spacious, animated with Real Teacher Cutout
          and varied typography (No techy fonts, generous whitespace)
         ───────────────────────────────────────────────────────────── */}
      <section className="relative pt-6 sm:pt-14 pb-12 sm:pb-16">
        
        {/* Soft Ambient Radial Background Glow */}
        <div className="absolute top-1/4 left-1/4 w-[550px] h-[450px] bg-blue-200/20 rounded-full blur-[130px] -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-sky-200/20 rounded-full blur-[120px] -z-10 pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Teacher Cutout from 688785651_..._n.jpg */}
          <div className="lg:col-span-5 flex justify-center order-2 lg:order-1 relative">
            <TeacherPortraitCutout customImageUrl={teacherImageUrl} />
          </div>

          {/* Right Column: Dynamic Sinhala & English Title Facts & Badges */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            
            {/* Handwritten Script Tag with subtle floating effect */}
            <div className="inline-block transform -rotate-1 transition-transform hover:rotate-0">
              <span className="text-amber-500 text-xl sm:text-2xl font-bold tracking-wide italic font-serif">
                නිද්ද නොයන Accounting පන්තිය
              </span>
            </div>

            {/* Title with Varied Text Styles & Typewriter Animation */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-black text-slate-950 tracking-tight leading-[1.25]">
                <span className="block text-slate-900 font-extrabold text-2xl sm:text-4xl">
                  එක් වසරකදී එක් ගුරුවරියක විසින්
                </span>

                <span className="inline-block mt-1.5 bg-gradient-to-r from-amber-500 via-emerald-600 to-teal-700 bg-clip-text text-transparent font-black">
                  වැඩිම{' '}
                  <TypewriterText 
                    words={['University Entrants', 'Accounting A Passes', 'Island Ranks']} 
                    className="underline decoration-amber-400 decoration-4"
                  />
                  {' '}සිසුන්
                </span>
                
                <span className="block text-slate-800 font-bold text-xl sm:text-3xl mt-1.5">
                  ප්‍රමාණයක් රටට දායාද කළ දිවයිනේ එකම
                </span>

                <span className="block text-emerald-700 font-black text-2xl sm:text-4xl mt-1.5">
                  Accounting පන්තියෙන් ඔබටත් අසුනක්...
                </span>
              </h1>

              <p className="text-sm sm:text-base text-slate-600 max-w-xl pt-2 leading-relaxed font-normal">
                The unbroken legacy of national island top ranks and thousands of state university management faculty entrants under the guidance of Mrs. Ruwanthi Senanayaka.
              </p>
            </div>

            {/* 3 Colorful Feature Badges (Strictly Accounting - Clean Apple Typography) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              
              {/* Badge 1: Island First (Cyan/Blue Gradient) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 text-white shadow-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center font-bold text-base shrink-0 font-sans">
                  1<sup className="text-[10px]">st</sup>
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-cyan-100 block truncate">
                    දිවයිනේ ප්‍රථමයා
                  </span>
                  <span className="text-xs font-bold tracking-tight block">
                    ISLAND FIRST
                  </span>
                </div>
              </div>

              {/* Badge 2: Accounting Mastery Badge (Amber/Gold Gradient - Strictly Accounting) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 shadow-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/30 backdrop-blur-md flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5 text-slate-950" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-amber-950 block">
                    දිවයිනේ අංක 1
                  </span>
                  <span className="text-xs font-black tracking-tight block">
                    Accounting පන්තිය
                  </span>
                </div>
              </div>

              {/* Badge 3: LKAS Note Badge (Blue Gradient) */}
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-800 text-white shadow-md flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold text-blue-200 block">
                    ලංකාවේ හොඳම
                  </span>
                  <span className="text-xs font-bold tracking-tight block">
                    LKAS Note එක
                  </span>
                </div>
              </div>

            </div>

            {/* Pill CTAs matching Screenshot 23.53.28 */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={onOpenEnrollment}
                className="px-8 py-3.5 text-sm font-bold text-white bg-slate-950 hover:bg-slate-800 rounded-full flex items-center gap-2 shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenLogin}
                className="px-8 py-3.5 text-sm font-bold text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-all shadow-xs"
              >
                Login
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: CLASSES & PROGRAMS (Screenshot 2026-10-07 at 00.11.55.png)
          Clean text hierarchy, generous whitespace, 5 structured programs
         ───────────────────────────────────────────────────────────── */}
      <section id="classes" className="space-y-8">
        
        {/* Header row */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              CLASSES &amp; PROGRAMS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              Inspire Education හරහා ඔබට සහභාගී විය හැකි පන්ති සහ වැඩසටහන්
            </h2>
          </div>
          <span className="text-xs font-medium text-slate-500 lg:text-right shrink-0">
            05 structured programs designed for A/L Accounting excellence
          </span>
        </div>

        {/* 5-Card Bento Grid Layout (Matching Screenshot 00.11.55 with generous whitespace) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Spanning 2 Rows / Prominent Dark - Theory Class */}
          <div 
            onClick={onOpenLogin}
            className="lg:row-span-2 p-8 sm:p-10 rounded-[32px] bg-slate-950 text-white flex flex-col justify-between space-y-8 relative overflow-hidden group cursor-pointer border border-slate-800 shadow-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-slate-950/80 to-blue-950/30" />
            
            <div className="relative z-10 space-y-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-400">01</span>
                <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-emerald-400">
                  <BookOpen className="w-5 h-5" />
                </div>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                Theory Class
              </h3>

              <p className="text-sm text-slate-300 leading-relaxed">
                මූලික සිද්ධාන්ත පැහැදිලිව සහ ක්‍රමවත්ව උගන්වමින්, විෂය නිර්දේශය සම්පූර්ණයෙන්ම ආවරණය කරන පන්ති මාලාව.
              </p>
            </div>

            <div className="relative z-10 pt-8 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold">
                CORE
              </span>
              <span className="text-xs font-semibold text-slate-300 group-hover:text-white flex items-center gap-1 transition-colors">
                <span>View Details</span>
                <ChevronRight className="w-4 h-4" />
              </span>
            </div>
          </div>

          {/* Card 2: Revision Classes */}
          <div 
            onClick={onOpenLogin}
            className="p-7 sm:p-8 rounded-[32px] bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-5 group cursor-pointer hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-400">02</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <RotateCcw className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xl font-bold text-slate-950">
                Revision Classes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                විභාගයට වැදගත් වන ප්‍රධාන කොටස් නැවත මතක් කරමින්, නිවැරදි ක්‍රමවේද සහ විභාග තාක්ෂණික ක්‍රම පුහුණු කරන පන්ති.
              </p>
            </div>

            <div className="pt-2 text-xs font-bold text-blue-700 flex items-center gap-1">
              <span>Explore Schedule</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3: Paper Classes */}
          <div 
            onClick={onOpenLogin}
            className="p-7 sm:p-8 rounded-[32px] bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-5 group cursor-pointer hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-400">03</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <FileText className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xl font-bold text-slate-950">
                Paper Classes
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                සතිපතා ප්‍රශ්න පත්‍ර සාකච්ඡා කිරීම, marking schemes සහ exam time management පුහුණු කිරීම.
              </p>
            </div>

            <div className="pt-2 text-xs font-bold text-blue-700 flex items-center gap-1">
              <span>View Papers</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 4: Practical Sessions */}
          <div 
            onClick={onOpenLogin}
            className="p-7 sm:p-8 rounded-[32px] bg-white border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-5 group cursor-pointer hover:border-slate-300 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-400">04</span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                <Scale className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xl font-bold text-slate-950">
                Practical Sessions
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                ප්‍රායෝගික ගිණුම්කරණ ගැටළු, සහ සංකීර්ණ adjustments ඉතා සරලව සහ පැහැදිලිව ඉගැන්වීම.
              </p>
            </div>

            <div className="pt-2 text-xs font-bold text-blue-700 flex items-center gap-1">
              <span>Access Sessions</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          {/* Card 5: Fast Track Program (Vibrant Emerald Card) */}
          <div 
            onClick={onOpenEnrollment}
            className="p-7 sm:p-8 rounded-[32px] bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex flex-col justify-between space-y-5 group cursor-pointer shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-emerald-100">05</span>
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Zap className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2.5">
              <h3 className="text-xl font-bold text-white">
                Fast Track Program
              </h3>
              <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
                කෙටි කාලයකින් ඉහළම දක්ෂතාවයකට රැගෙන යාම සඳහා සකස් කළ විශේෂ වැඩසටහන.
              </p>
            </div>

            <div className="pt-2">
              <button
                type="button"
                className="px-5 py-2.5 rounded-full bg-slate-950 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
              >
                <span>Learn more</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: PLATFORM ARCHITECTURE - 4 VIBRANT COLOR BLOCKS
          (Four small, punchy blocks in vibrant colors with generous spacing)
         ───────────────────────────────────────────────────────────── */}
      <section className="space-y-8">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
            PLATFORM ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-950">
            Four Core Pillars Built for Academic Mastery
          </h2>
        </div>

        {/* 4 Small, Vibrant, Simplified Color Blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Pillar 1: Blue / Cyan Vibrant Gradient */}
          <div 
            onClick={onOpenLogin}
            className="p-6 rounded-3xl bg-gradient-to-br from-cyan-600 to-blue-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-5"
          >
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white leading-tight">
                Past Papers &amp; Marking Schemes
              </h3>
              <p className="text-xs text-cyan-100 leading-relaxed">
                10+ Years of archived national papers with structured marking breakdowns.
              </p>
            </div>
            <div className="text-xs font-semibold text-cyan-200 flex items-center justify-between pt-3 border-t border-white/20">
              <span>View Papers</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 2: Indigo / Purple Vibrant Gradient (Live Masterclasses) */}
          <div 
            onClick={onOpenLogin}
            className="p-6 rounded-3xl bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-5"
          >
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white leading-tight">
                Live Interactive Masterclasses
              </h3>
              <p className="text-xs text-purple-100 leading-relaxed">
                High-definition hybrid lectures with real-time doubt clarification.
              </p>
            </div>
            <div className="text-xs font-semibold text-purple-200 flex items-center justify-between pt-3 border-t border-white/20">
              <span>Live Portal</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 3: Teal / Emerald Vibrant Gradient (Video Modules) */}
          <div 
            onClick={onOpenLogin}
            className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-5"
          >
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <Play className="w-5 h-5 fill-white" />
              </div>
              <h3 className="text-base font-bold text-white leading-tight">
                Topical Video Modules
              </h3>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Recorded lessons categorized by topic, LKAS standards, and chapters.
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-200 flex items-center justify-between pt-3 border-t border-white/20">
              <span>Watch Modules</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Pillar 4: Amber / Rose Vibrant Gradient (Study Materials) */}
          <div 
            onClick={onOpenLogin}
            className="p-6 rounded-3xl bg-gradient-to-br from-amber-500 to-rose-600 text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-5"
          >
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white leading-tight">
                Revision Kits &amp; Handbooks
              </h3>
              <p className="text-xs text-amber-100 leading-relaxed">
                Comprehensive study tutes, model papers, and physical deliveries.
              </p>
            </div>
            <div className="text-xs font-semibold text-amber-200 flex items-center justify-between pt-3 border-t border-white/20">
              <span>Study Store</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: PREVIOUS RESULTS SECTION (Screenshot 2026-10-07 at 00.00.40.png)
         ───────────────────────────────────────────────────────────── */}
      <PreviousResultsSection
        results={resultsData}
        onViewFullRegister={() => onNavigate('results')}
        onWatchHighlight={(item) => {
          onSelectRanker({
            id: item.id,
            rank: item.rankTitle.includes('1') ? 1 : 5,
            name: item.studentName,
            achievement: `${item.rankTitle} - A/L Commerce`,
            year: 2025,
            school: item.school || 'Maliyadeva Balika',
            district: 'Kurunegala',
            zScore: '2.8410',
            quote: 'Unrivalled guidance under Mrs. Ruwanthi Senanayaka.',
            videoDuration: '3:45 min'
          });
        }}
      />

    </div>
  );
};
