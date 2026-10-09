import React, { useState } from 'react';
import { PastPaper, Medium } from '../types';
import { pastPapersData } from '../data/mockData';
import { LiquidGlassCard } from './LiquidGlassCard';
import { 
  FileText, 
  Search, 
  ArrowRight, 
  Download, 
  CheckCircle2, 
  Filter, 
  BookOpen, 
  Layers, 
  Calendar 
} from 'lucide-react';

interface PastPapersViewProps {
  onSelectPaper: (paper: PastPaper) => void;
}

export const PastPapersView: React.FC<PastPapersViewProps> = ({ onSelectPaper }) => {
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [selectedMedium, setSelectedMedium] = useState<Medium | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const availableYears = [2025, 2024, 2023, 2022, 2021];

  // Filter papers by year and search query
  const filteredPapers = pastPapersData.filter(paper => {
    const matchesYear = paper.year === selectedYear;
    const matchesMedium = selectedMedium === 'all' || paper.medium === selectedMedium;
    const matchesSearch = 
      paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      paper.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesYear && matchesMedium && matchesSearch;
  });

  // Group by medium for the columnar display matching the screenshot
  const sinhalaPapers = filteredPapers.filter(p => p.medium === 'sinhala');
  const englishPapers = filteredPapers.filter(p => p.medium === 'english');
  const tamilPapers = filteredPapers.filter(p => p.medium === 'tamil');

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER SECTION (Matching screenshot exact layout) */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              PAST PAPERS LIBRARY
            </span>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Access our comprehensive archive of examination materials.
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl">
              Select a year to filter the available documents, then review the paper details before opening the PDF. Every document includes standardized questions and marking scheme breakdowns.
            </p>
          </div>

          {/* Stat Badges / Counter Blocks */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-left min-w-[120px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                YEARS
              </span>
              <span className="text-2xl font-black text-slate-900 font-sans">
                {availableYears.length}
              </span>
              <span className="text-[11px] text-slate-500 block">Available</span>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs text-left min-w-[120px]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                ACTIVE
              </span>
              <span className="text-2xl font-black text-blue-700 font-sans">
                {selectedYear}
              </span>
              <span className="text-[11px] text-slate-500 block">Selected year</span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar: Year Tabs & Search Input */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          {/* Year Buttons Strip (Matching screenshot) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 overflow-x-auto no-scrollbar">
            {availableYears.map(yr => (
              <button
                key={yr}
                onClick={() => setSelectedYear(yr)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap font-sans ${
                  selectedYear === yr
                    ? 'apple-button-dark text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                {yr}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px] max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search paper or subject..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* PAPER COLUMNS BY MEDIUM (Recreating Sinhala Medium & English Medium split from screenshots) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SINHALA MEDIUM COLUMN */}
        <LiquidGlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Sinhala Medium</h2>
              <p className="text-xs text-slate-500">
                Curated past papers for Sinhala medium students ({sinhalaPapers.length} available)
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {sinhalaPapers.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No Sinhala medium papers matching your criteria.
              </p>
            ) : (
              sinhalaPapers.map(paper => (
                <div 
                  key={paper.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between gap-4 hover:border-slate-300 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-200 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {paper.title}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {paper.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectPaper(paper)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white apple-button-primary rounded-xl shrink-0 whitespace-nowrap"
                  >
                    <span>View PDF</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </LiquidGlassCard>

        {/* ENGLISH MEDIUM COLUMN */}
        <LiquidGlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">English Medium</h2>
              <p className="text-xs text-slate-500">
                Curated past papers for English medium students ({englishPapers.length} available)
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {englishPapers.length === 0 ? (
              <p className="text-xs text-slate-400 py-6 text-center">
                No English medium papers matching your criteria.
              </p>
            ) : (
              englishPapers.map(paper => (
                <div 
                  key={paper.id}
                  className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between gap-4 hover:border-slate-300 transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-200 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-bold text-slate-900 truncate">
                        {paper.title}
                      </h3>
                      <p className="text-xs text-slate-500 truncate">
                        {paper.subtitle}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectPaper(paper)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white apple-button-amber rounded-xl shrink-0 whitespace-nowrap"
                  >
                    <span>View PDF</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </LiquidGlassCard>

      </div>

      {/* TAMIL MEDIUM SECTION (If Available) */}
      {tamilPapers.length > 0 && (
        <LiquidGlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Tamil Medium Papers</h2>
              <p className="text-xs text-slate-500">
                Curated past papers for Tamil medium students ({tamilPapers.length} available)
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tamilPapers.map(paper => (
              <div 
                key={paper.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex items-center justify-between gap-4 hover:border-slate-300 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 text-slate-600 flex items-center justify-center border border-slate-200 shrink-0 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-slate-500 truncate">
                      {paper.subtitle}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onSelectPaper(paper)}
                  className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white apple-button-amber rounded-xl shrink-0 whitespace-nowrap"
                >
                  <span>View PDF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </LiquidGlassCard>
      )}

      {/* QUICK TIP STRIP (Matching sidebar quick tip in screenshot) */}
      <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-xs text-blue-900 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="font-bold uppercase tracking-wider text-[10px] bg-blue-200/60 text-blue-800 px-2 py-0.5 rounded-md">
            EXAMINER TIP
          </span>
          <span>
            Use the year tabs above to compare the question pattern evolution from 2021 to 2025. Every paper is paired with official evaluation marks.
          </span>
        </div>
      </div>

    </div>
  );
};
