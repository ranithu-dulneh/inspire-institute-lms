import React, { useState } from 'react';
import { WallOfFameRanker } from '../types';
import { wallOfFameData } from '../data/mockData';
import { LiquidGlassCard } from './LiquidGlassCard';
import { Award, Play, Star, Sparkles, Search, CheckCircle2, TrendingUp, Calculator } from 'lucide-react';

interface ResultsViewProps {
  onSelectRanker: (ranker: WallOfFameRanker) => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ onSelectRanker }) => {
  const [selectedYear, setSelectedYear] = useState<number | 'all'>('all');
  const [districtFilter, setDistrictFilter] = useState<string>('all');
  
  // Interactive Z-Score Estimator
  const [rawAcc, setRawAcc] = useState<number>(85);
  const [rawEcon, setRawEcon] = useState<number>(82);
  const [rawBs, setRawBs] = useState<number>(88);

  const estimatedZScore = ((rawAcc + rawEcon + rawBs - 150) / 45).toFixed(4);

  const filteredRankers = wallOfFameData.filter(r => {
    const matchesYear = selectedYear === 'all' || r.year === selectedYear;
    const matchesDistrict = districtFilter === 'all' || r.district.toLowerCase() === districtFilter.toLowerCase();
    return matchesYear && matchesDistrict;
  });

  return (
    <div className="space-y-10 pb-16">
      
      {/* Header */}
      <div className="space-y-3 max-w-3xl">
        <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
          PROVEN TRACK RECORD
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Wall of Fame &amp; National Results
        </h1>
        <p className="text-sm text-slate-600 leading-relaxed">
          Explore our top achievers across the island in the G.C.E. Advanced Level Commerce stream. Verified Island 1st, 3rd, and 5th rankers.
        </p>
      </div>

      {/* Filter toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-2 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-slate-500 font-medium pl-2">Year:</span>
          {(['all', 2023, 2022] as const).map(yr => (
            <button
              key={yr.toString()}
              onClick={() => setSelectedYear(yr)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                selectedYear === yr
                  ? 'apple-button-dark text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {yr === 'all' ? 'All Batches' : `${yr} A/L`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">District:</span>
          <select
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="px-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white focus:outline-none"
          >
            <option value="all">All Districts</option>
            <option value="colombo">Colombo</option>
            <option value="kandy">Kandy</option>
          </select>
        </div>
      </div>

      {/* Ranker Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRankers.map(ranker => (
          <LiquidGlassCard
            key={ranker.id}
            hoverEffect
            className="p-6 flex flex-col justify-between space-y-4"
            onClick={() => onSelectRanker(ranker)}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center font-sans font-black text-2xl text-amber-700">
                    #{ranker.rank}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">{ranker.name}</h3>
                    <p className="text-xs font-semibold text-blue-700">{ranker.achievement}</p>
                    <p className="text-[11px] text-slate-500">{ranker.school} · {ranker.district}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase font-sans">Z-Score</span>
                  <span className="text-base font-bold text-slate-900 font-sans tabular-nums">{ranker.zScore}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-200/60 leading-relaxed">
                "{ranker.quote}"
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 hover:text-blue-900 group"
              >
                <Play className="w-3.5 h-3.5 fill-blue-700 text-blue-700 group-hover:scale-110 transition-transform" />
                <span>Watch Video Interview</span>
              </button>
              <span className="text-[11px] font-sans text-slate-400">{ranker.videoDuration}</span>
            </div>
          </LiquidGlassCard>
        ))}
      </div>

      {/* Interactive Z-Score Estimator Tool */}
      <LiquidGlassCard className="p-6 md:p-8 space-y-4 bg-gradient-to-tr from-white via-blue-50/30 to-white">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-blue-600" />
          <h2 className="text-lg font-bold text-slate-900">Interactive A/L Z-Score Estimator</h2>
        </div>
        <p className="text-xs text-slate-600 max-w-xl">
          Simulate your target marks for Accounting, Business Studies, and Economics to estimate your percentile ranking.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 flex justify-between">
              <span>Accounting</span>
              <span className="font-sans text-blue-700">{rawAcc}/100</span>
            </label>
            <input 
              type="range" 
              min="40" 
              max="100" 
              value={rawAcc} 
              onChange={(e) => setRawAcc(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 flex justify-between">
              <span>Business Studies</span>
              <span className="font-sans text-blue-700">{rawBs}/100</span>
            </label>
            <input 
              type="range" 
              min="40" 
              max="100" 
              value={rawBs} 
              onChange={(e) => setRawBs(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
            <label className="text-[11px] font-semibold text-slate-600 flex justify-between">
              <span>Economics</span>
              <span className="font-sans text-blue-700">{rawEcon}/100</span>
            </label>
            <input 
              type="range" 
              min="40" 
              max="100" 
              value={rawEcon} 
              onChange={(e) => setRawEcon(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-blue-600 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-md">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-sky-200 block font-semibold">Estimated Projected Z-Score</span>
            <span className="text-2xl font-black font-sans tabular-nums">{estimatedZScore}</span>
          </div>
          <span className="text-xs text-sky-100 bg-white/20 px-3 py-1.5 rounded-lg border border-white/20 font-medium">
            Projected: University of Colombo / Sri Jayewardenepura Merit Entry Eligible
          </span>
        </div>
      </LiquidGlassCard>

    </div>
  );
};
