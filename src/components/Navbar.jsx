import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  LayoutGrid, 
  Bookmark, 
  Headphones, 
  Search, 
  X, 
  Send,
  Zap,
  Globe2
} from 'lucide-react';
import { BREAKING_TICKER } from '../data/newsData';

export default function Navbar({ 
  viewMode, 
  setViewMode, 
  searchQuery, 
  setSearchQuery, 
  savedBookmarksCount, 
  onOpenBookmarks,
  onOpenAudioBriefing,
  onOpenSubmitStory,
  isAudioBriefingActive
}) {
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 glass-panel">
      {/* Top Breaking News Ticker */}
      <div className="bg-obsidian-950/90 border-b border-white/5 py-1.5 px-4 overflow-hidden text-xs flex items-center gap-3">
        <div className="flex items-center gap-1.5 text-cyan-400 font-mono font-semibold tracking-wider uppercase text-[10px] shrink-0 bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span>LIVE PULSE</span>
        </div>
        <div className="overflow-hidden whitespace-nowrap relative flex-1">
          <div className="inline-block animate-ticker text-slate-400 font-mono text-[11px]">
            {BREAKING_TICKER.concat(BREAKING_TICKER).map((text, idx) => (
              <span key={idx} className="inline-flex items-center mx-6">
                <span className="text-cyan-400/70 mr-2">⚡</span>
                <span className="hover:text-cyan-300 transition-colors cursor-default">{text}</span>
              </span>
            ))}
          </div>
        </div>
        <div className="hidden md:flex items-center gap-2 text-[11px] text-slate-400 font-mono shrink-0 pl-3 border-l border-white/10">
          <Globe2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>2.4k reading now</span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo - As seen in Instagram Reel */}
        <div className="flex items-center gap-3.5 cursor-pointer group" onClick={() => { setSearchQuery(''); setViewMode('deck'); }}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-[1.5px] shadow-[0_0_20px_rgba(0,242,254,0.35)] group-hover:shadow-[0_0_25px_rgba(0,242,254,0.6)] transition-all duration-300">
            <div className="w-full h-full bg-obsidian-900 rounded-full flex items-center justify-center">
              <span className="font-heading font-extrabold text-sm tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                Ai
              </span>
            </div>
            <div className="absolute -inset-1 rounded-full bg-cyan-400/20 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-display tracking-[0.22em] text-lg sm:text-xl font-bold uppercase text-slate-100 group-hover:text-cyan-300 transition-colors">
                The AI Journal
              </h1>
              <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest font-mono text-cyan-400 bg-cyan-950/80 border border-cyan-500/30 px-1.5 py-0.5 rounded">
                Daily
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wide hidden sm:block font-body">
              The world's AI updates, distilled into 30-second cards
            </p>
          </div>
        </div>

        {/* View Switcher & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* View Toggle (3D Deck vs Grid) */}
          <div className="bg-obsidian-900/90 p-1 rounded-xl border border-white/10 flex items-center shadow-inner">
            <button
              onClick={() => setViewMode('deck')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'deck'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="3D Floating Perspective Deck (As shown in Reel)"
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D Deck</span>
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                viewMode === 'grid'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(0,242,254,0.4)]'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Curated Grid Feed"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Grid Feed</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            {isSearchExpanded ? (
              <div className="flex items-center bg-obsidian-900 border border-cyan-500/40 rounded-xl px-3 py-1.5 shadow-[0_0_15px_rgba(0,242,254,0.2)]">
                <Search className="w-3.5 h-3.5 text-cyan-400 mr-2 shrink-0" />
                <input
                  type="text"
                  autoFocus
                  placeholder="Search models, chips, research..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-xs text-slate-100 placeholder-slate-500 outline-none w-36 sm:w-56"
                />
                <button 
                  onClick={() => { setIsSearchExpanded(false); setSearchQuery(''); }}
                  className="text-slate-400 hover:text-slate-200 ml-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="p-2 rounded-xl bg-obsidian-900 border border-white/10 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/30 transition-all"
                title="Search updates"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* 60-Second Audio Briefing Button */}
          <button
            onClick={onOpenAudioBriefing}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isAudioBriefingActive
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400/40 shadow-[0_0_18px_rgba(138,43,226,0.5)] animate-pulse'
                : 'bg-obsidian-900 border-white/10 text-slate-300 hover:text-white hover:border-purple-500/40 hover:bg-purple-950/20'
            }`}
            title="Listen to 60-second AI Daily Briefing"
          >
            <Headphones className="w-3.5 h-3.5 text-purple-400" />
            <span className="hidden md:inline">60s Audio Digest</span>
          </button>

          {/* Saved Bookmarks Button */}
          <button
            onClick={onOpenBookmarks}
            className="relative p-2 rounded-xl bg-obsidian-900 border border-white/10 text-slate-400 hover:text-amber-300 hover:border-amber-500/30 transition-all"
            title="Saved Cards"
          >
            <Bookmark className="w-4 h-4" />
            {savedBookmarksCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-obsidian-950 font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-md animate-scale">
                {savedBookmarksCount}
              </span>
            )}
          </button>

          {/* Submit Story CTA */}
          <button
            onClick={onOpenSubmitStory}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 text-obsidian-950 hover:brightness-110 transition-all shadow-[0_0_15px_rgba(0,242,254,0.3)]"
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>Join Drop</span>
          </button>
        </div>
      </div>
    </header>
  );
}
