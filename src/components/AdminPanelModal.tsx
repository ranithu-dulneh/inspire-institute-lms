import React, { useState, useEffect } from 'react';
import { X, Lock, Upload, Image as ImageIcon, CheckCircle, RefreshCw, AlertCircle, ShieldCheck } from 'lucide-react';
import { RankerResultItem, defaultResultsData } from './PreviousResultsSection';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTeacherPhotoUpdated?: (newUrl: string | null) => void;
  onResultsUpdated?: (newResults: RankerResultItem[]) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  onTeacherPhotoUpdated,
  onResultsUpdated
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pin, setPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

  const [activeTab, setActiveTab] = useState<'teacher' | 'results'>('teacher');
  const [teacherPhotoUrl, setTeacherPhotoUrl] = useState<string>('');
  const [teacherPhotoSavedNotice, setTeacherPhotoSavedNotice] = useState<boolean>(false);

  // Results state
  const [resultsList, setResultsList] = useState<RankerResultItem[]>(() => {
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

  useEffect(() => {
    const saved = localStorage.getItem('inspire_teacher_photo_cutout');
    if (saved) {
      setTeacherPhotoUrl(saved);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAuthenticate = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master admin pins
    if (pin === 'admin' || pin === '1234' || pin === 'inspire' || pin === '2026') {
      setIsAuthenticated(true);
      setPinError('');
    } else {
      setPinError('Invalid Admin Passcode. Please contact Lead Faculty administrator.');
    }
  };

  const handleSaveTeacherPhoto = (urlToSave: string) => {
    if (urlToSave.trim()) {
      localStorage.setItem('inspire_teacher_photo_cutout', urlToSave.trim());
      setTeacherPhotoUrl(urlToSave.trim());
      onTeacherPhotoUpdated?.(urlToSave.trim());
    } else {
      localStorage.removeItem('inspire_teacher_photo_cutout');
      setTeacherPhotoUrl('');
      onTeacherPhotoUpdated?.(null);
    }
    setTeacherPhotoSavedNotice(true);
    setTimeout(() => setTeacherPhotoSavedNotice(false), 3000);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      if (base64) {
        handleSaveTeacherPhoto(base64);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateResultImage = (resultId: string, imgUrl: string) => {
    const updated = resultsList.map(r => r.id === resultId ? { ...r, imageUrl: imgUrl } : r);
    setResultsList(updated);
    localStorage.setItem('inspire_results_data', JSON.stringify(updated));
    onResultsUpdated?.(updated);
  };

  const handleResultFileUpload = (resultId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const base64 = uploadEvent.target?.result as string;
      if (base64) {
        handleUpdateResultImage(resultId, base64);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Administrator Control Console</h2>
              <p className="text-[11px] text-slate-500">Inspire Education Academic Management Portal</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Admin Authentication Required</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Only faculty administrators can replace teacher images and configure past exam certificates.
              </p>
            </div>

            <form onSubmit={handleAuthenticate} className="max-w-xs mx-auto space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Passcode / Admin PIN
                </label>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Enter passcode (e.g. 1234 or admin)"
                  autoFocus
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-sans"
                />
                {pinError && (
                  <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                    <AlertCircle className="w-3.5 h-3.5" />
                    <span>{pinError}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-sm"
              >
                Access Admin Console
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Controls */
          <div className="p-6 space-y-6">
            {/* Tabs */}
            <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setActiveTab('teacher')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'teacher'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Teacher Photo &amp; Cutout
              </button>
              <button
                onClick={() => setActiveTab('results')}
                className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                  activeTab === 'results'
                    ? 'bg-white text-slate-950 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Result Images &amp; Badges
              </button>
            </div>

            {activeTab === 'teacher' ? (
              <div className="space-y-5">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-center gap-4">
                  <div className="w-20 h-24 rounded-xl bg-white border border-slate-200 overflow-hidden flex items-center justify-center shrink-0">
                    {teacherPhotoUrl ? (
                      <img src={teacherPhotoUrl} alt="Preview" className="w-full h-full object-cover object-top" />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-slate-300" />
                    )}
                  </div>
                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-slate-900">Current Lead Faculty Image</p>
                    <p className="text-slate-500">
                      {teacherPhotoUrl ? 'Custom admin photo is active across homepage hero.' : 'Using default studio portrait artwork.'}
                    </p>
                    {teacherPhotoSavedNotice && (
                      <p className="text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>Changes updated successfully!</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Upload or URL form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Upload New Teacher Photo Cutout (.png, .jpg, .webp)
                    </label>
                    <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-slate-200 rounded-2xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/20 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-2 pb-2">
                        <Upload className="w-6 h-6 text-slate-400 mb-1" />
                        <p className="text-xs font-medium text-slate-700">Click to upload photo file</p>
                        <p className="text-[10px] text-slate-400">Transparent PNG cutout recommended</p>
                      </div>
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
                    </label>
                  </div>

                  <div className="relative flex py-1 items-center">
                    <div className="flex-grow border-t border-slate-200" />
                    <span className="flex-shrink mx-4 text-[10px] text-slate-400 uppercase font-bold">Or enter Image URL</span>
                    <div className="flex-grow border-t border-slate-200" />
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={teacherPhotoUrl}
                      onChange={(e) => setTeacherPhotoUrl(e.target.value)}
                      placeholder="https://example.com/teacher-cutout.png"
                      className="flex-1 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <button
                      onClick={() => handleSaveTeacherPhoto(teacherPhotoUrl)}
                      className="px-4 py-2 rounded-xl bg-slate-950 text-white text-xs font-bold hover:bg-slate-800 transition-colors shrink-0"
                    >
                      Save URL
                    </button>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => handleSaveTeacherPhoto('')}
                      className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Reset to Original Default</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Results Images Tab */
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1">
                <p className="text-xs text-slate-500">
                  Configure student achievement images displayed in the Previous Results Bento grid:
                </p>

                {resultsList.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          {item.rankTitle} · {item.year}
                        </span>
                        <h4 className="text-xs font-bold text-slate-900 mt-1">{item.studentName}</h4>
                      </div>
                      {item.imageUrl && (
                        <span className="text-[10px] text-emerald-600 font-semibold">Image Configured</span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={item.imageUrl || ''}
                        onChange={(e) => handleUpdateResultImage(item.id, e.target.value)}
                        placeholder="Image URL or upload below..."
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <label className="px-3 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold cursor-pointer shrink-0 transition-colors">
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleResultFileUpload(item.id, e)}
                        />
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
