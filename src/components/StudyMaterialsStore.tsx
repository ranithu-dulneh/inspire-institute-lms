import React, { useState } from 'react';
import { StudyMaterial } from '../types';
import { studyMaterialsData } from '../data/mockData';
import { LiquidGlassCard } from './LiquidGlassCard';
import { 
  ShoppingBag, 
  Download, 
  Star, 
  CheckCircle2, 
  BookOpen, 
  FileText, 
  Sparkles,
  Search,
  Filter
} from 'lucide-react';

interface StudyMaterialsStoreProps {
  currency: 'LKR' | 'USD';
  onToggleCurrency: () => void;
  onAddToCart: (material: StudyMaterial) => void;
}

export const StudyMaterialsStore: React.FC<StudyMaterialsStoreProps> = ({
  currency,
  onToggleCurrency,
  onAddToCart
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadNotice, setDownloadNotice] = useState<string | null>(null);

  const categories = [
    'All',
    'Lesson Wise Tutes',
    'Revision Notes',
    'Past Paper Books',
    'Model Papers'
  ];

  const filteredMaterials = studyMaterialsData.filter(m => {
    const matchesCategory = selectedCategory === 'All' || m.category === selectedCategory;
    const matchesSearch = 
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFreeDownload = (material: StudyMaterial) => {
    setDownloadNotice(material.title);
    // Trigger download
    const blob = new Blob([`Inspire Institution Official Free Material: ${material.title}\n\n${material.description}`], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${material.title.replace(/\s+/g, '_')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => {
      setDownloadNotice(null);
    }, 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER SECTION (Matching screenshot layout) */}
      <div className="space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
              ACADEMIC STORE
            </span>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Study Materials
            </h1>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Access comprehensive tutes, revision kits, and past paper models to enhance your learning experience. Free instant downloads and print edition kits.
            </p>
          </div>

          {/* Currency Switcher & Search */}
          <div className="flex items-center gap-3">
            <button
              onClick={onToggleCurrency}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:border-slate-300 shadow-2xs transition-all"
            >
              <span>Currency:</span>
              <span className="font-sans text-blue-700 font-bold">{currency === 'LKR' ? 'Rs. (LKR)' : '$ (USD)'}</span>
            </button>
          </div>
        </div>

        {/* Filter Toolbar (Matching screenshot Segmented Filter Tabs) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100/90 rounded-2xl border border-slate-200/80 overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'apple-button-dark text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-950 hover:bg-white/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative min-w-[240px] max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tutes or kits..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200/90 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-900"
            />
          </div>
        </div>
      </div>

      {/* DOWNLOAD SUCCESS TOAST */}
      {downloadNotice && (
        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Downloaded <strong>{downloadNotice}</strong> successfully! Check your downloads folder.</span>
          </div>
        </div>
      )}

      {/* STUDY MATERIALS CARDS GRID (Matching cards layout in screenshot) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMaterials.map((mat) => {
          const displayPrice = currency === 'LKR' ? `Rs. ${mat.priceLKR.toLocaleString()}.00` : `$${mat.priceUSD}`;

          return (
            <LiquidGlassCard 
              key={mat.id}
              hoverEffect
              className="p-6 flex flex-col justify-between space-y-4 overflow-hidden"
            >
              <div className="space-y-4">
                {/* Visual Cover Asset Area */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-gradient-to-tr from-slate-100 via-blue-50 to-slate-200 border border-slate-200/80 flex items-center justify-center p-4">
                  {/* Decorative background grid */}
                  <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />

                  {/* Badges on cover (Matching A/L 2025 and FREE badges in screenshot) */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-800 shadow-2xs border border-white">
                      {mat.batchTag}
                    </span>
                  </div>

                  {mat.isFree && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-2xs">
                        FREE
                      </span>
                    </div>
                  )}

                  {/* Icon illustration */}
                  <div className="relative z-10 text-center space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-2xl bg-white shadow-md flex items-center justify-center text-blue-600">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-sans font-semibold text-slate-600 block">
                      {mat.pageCount} Pages · {mat.format}
                    </span>
                  </div>
                </div>

                {/* Content details */}
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-2">
                    {mat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-2">
                    {mat.description}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="font-semibold text-slate-800 font-sans">{mat.rating}</span>
                  <span>({mat.reviewsCount} reviews)</span>
                </div>
              </div>

              {/* Price and Action Button (Matching screenshot) */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="font-sans">
                  {mat.isFree ? (
                    <span className="text-base font-extrabold text-emerald-600">Free</span>
                  ) : (
                    <span className="text-base font-bold text-slate-900 tabular-nums">
                      {displayPrice}
                    </span>
                  )}
                </div>

                {mat.isFree ? (
                  <button
                    onClick={() => handleFreeDownload(mat)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 border border-slate-200/90 rounded-xl transition-all whitespace-nowrap"
                  >
                    <span>Download PDF</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => onAddToCart(mat)}
                    className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white apple-button-dark rounded-xl transition-all whitespace-nowrap shadow-xs"
                  >
                    <span>Add to Cart</span>
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </LiquidGlassCard>
          );
        })}
      </div>

    </div>
  );
};
