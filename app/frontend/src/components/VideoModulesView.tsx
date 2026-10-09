import React, { useState } from 'react';
import { VideoModule } from '../types';
import { videoModulesData } from '../data/mockData';
import { LiquidGlassCard } from './LiquidGlassCard';
import { Play, Clock, Calendar, CheckCircle2, Video, Search, Filter } from 'lucide-react';

interface VideoModulesViewProps {
  onSelectVideo: (video: VideoModule) => void;
}

export const VideoModulesView: React.FC<VideoModulesViewProps> = ({ onSelectVideo }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const months = ['All', 'August', 'July'];

  const filteredVideos = videoModulesData.filter(v => {
    const matchesMonth = selectedMonth === 'All' || v.month === selectedMonth;
    const matchesSearch = 
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesMonth && matchesSearch;
  });

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER SECTION (Matching screenshot layout) */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                RECORDED SESSIONS
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {videoModulesData.length} modules ready to resume
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Video Modules
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Access your recorded sessions, categorized by month and topic. Resume where you left off to master your subjects.
            </p>
          </div>

          {/* Next Lesson Callout Card (Matching top right in screenshot) */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs min-w-[260px] space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              NEXT LESSON
            </span>
            <h4 className="text-sm font-bold text-slate-900 leading-tight">
              Partnership Accounts & Formations
            </h4>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
              <span className="text-slate-500 text-[11px]">Resume from Aug 15</span>
              <button 
                onClick={() => onSelectVideo(videoModulesData[0])}
                className="text-blue-600 font-semibold text-xs hover:underline flex items-center gap-1"
              >
                <span>Watch</span>
                <Play className="w-3 h-3 fill-blue-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Toolbar: Month Filter & Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80">
            {months.map(m => (
              <button
                key={m}
                onClick={() => setSelectedMonth(m)}
                className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                  selectedMonth === m
                    ? 'apple-button-dark text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                {m} {m !== 'All' ? 'Sessions' : 'All Months'}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px] max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topic or module..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* VIDEO MODULES GRID (Matching 3-column cards in screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVideos.map(video => (
          <LiquidGlassCard 
            key={video.id}
            hoverEffect
            className="p-6 flex flex-col justify-between space-y-4"
            onClick={() => onSelectVideo(video)}
          >
            <div className="space-y-4">
              {/* Meta pills: Month + Date */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  {video.month}
                </span>
                <span className="text-slate-500 text-[11px]">
                  Live: {video.date}
                </span>
              </div>

              {/* Title & Description */}
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-slate-900 leading-snug">
                  {video.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {video.description}
                </p>
              </div>

              {/* Chapter summary badge */}
              <div className="text-[11px] text-slate-500 flex items-center gap-2 pt-2 border-t border-slate-100">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{video.duration} duration · {video.chapters.length} chapters</span>
              </div>
            </div>

            {/* Bottom Row: Date label & [Play] Button (Matching screenshot) */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                Live: {video.date}
              </span>

              <button
                type="button"
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white apple-button-dark rounded-xl shadow-xs"
              >
                <span>Play</span>
                <Play className="w-3 h-3 fill-white" />
              </button>
            </div>
          </LiquidGlassCard>
        ))}
      </div>

    </div>
  );
};
