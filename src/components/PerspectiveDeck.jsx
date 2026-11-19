import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  Flame, 
  Volume2, 
  Bookmark, 
  Share2, 
  ExternalLink,
  Sparkles,
  Play,
  Pause,
  Maximize2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PerspectiveDeck({ 
  cards, 
  onToggleBookmark, 
  isCardBookmarked, 
  onOpenShare, 
  onOpenDeepDive,
  activeSpeechCardId,
  onToggleSpeak
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const touchStartX = useRef(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') {
        nextCard();
      } else if (e.key === 'ArrowLeft') {
        prevCard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, cards.length]);

  // Autoplay slideshow timer
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % cards.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, cards.length]);

  if (!cards || cards.length === 0) {
    return (
      <div className="py-24 text-center text-slate-400 font-mono text-sm">
        No updates found in this category.
      </div>
    );
  }

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Touch swipe support
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) nextCard();
    else if (diff < -50) prevCard();
    touchStartX.current = null;
  };

  const currentCard = cards[activeIndex];

  return (
    <div className="relative w-full max-w-6xl mx-auto py-6 sm:py-10 px-4 select-none">
      {/* 3D HUD Header Bar */}
      <div className="flex items-center justify-between mb-6 px-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>3D PERSPECTIVE DECK</span>
          </div>
          <span className="text-xs font-mono text-slate-400 hidden sm:inline">
            Use <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-bold">←</kbd> and <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-cyan-300 font-bold">→</kbd> arrow keys to glide
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Autoplay Slideshow */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono transition-all border ${
              isAutoPlaying
                ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_12px_rgba(0,242,254,0.3)]'
                : 'bg-obsidian-900 border-white/10 text-slate-400 hover:text-slate-200'
            }`}
          >
            {isAutoPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            <span className="hidden sm:inline">{isAutoPlaying ? 'Pause Flow' : 'Auto Flow'}</span>
          </button>

          {/* Card Counter */}
          <div className="px-3 py-1 rounded-full bg-obsidian-900 border border-white/10 font-mono text-xs text-slate-300">
            <span className="text-cyan-400 font-bold">{String(activeIndex + 1).padStart(2, '0')}</span>
            <span className="text-slate-500 mx-1">/</span>
            <span>{String(cards.length).padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      {/* 3D Stage Container */}
      <div 
        className="perspective-stage relative min-h-[480px] sm:min-h-[520px] flex items-center justify-center overflow-visible"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {cards.map((card, idx) => {
          const offset = idx - activeIndex;
          const absOffset = Math.abs(offset);
          const isVisible = absOffset <= 2;

          if (!isVisible) return null;

          const isActive = offset === 0;

          // 3D positioning styles matching the reel's angle
          const translateX = offset * 260; // spacing
          const translateZ = -absOffset * 180; // depth
          const rotateY = offset * -25; // perspective tilt
          const opacity = Math.max(1 - absOffset * 0.35, 0);
          const scale = Math.max(1 - absOffset * 0.12, 0.7);

          return (
            <div
              key={card.id}
              onClick={() => setActiveIndex(idx)}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                opacity: opacity,
                zIndex: 30 - absOffset,
                transition: 'all 500ms cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              className={`absolute w-full max-w-[340px] sm:max-w-[420px] rounded-3xl glass-card overflow-hidden cursor-pointer ${
                isActive 
                  ? 'border-cyan-400/60 shadow-[0_20px_60px_-15px_rgba(0,242,254,0.35)] ring-1 ring-cyan-400/30' 
                  : 'hover:border-white/30 filter brightness-75'
              }`}
            >
              {/* Card Media Header */}
              <div className="relative h-52 sm:h-56 w-full overflow-hidden bg-obsidian-950">
                <img
                  src={card.imageUrl}
                  alt={card.title}
                  className="w-full h-full object-cover filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />

                {/* HUD Top Meta */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className={`text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full border backdrop-blur-md shadow-sm ${card.badgeColor}`}>
                    {card.categoryLabel}
                  </span>
                  <div className="flex items-center gap-1.5 bg-obsidian-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-slate-200 text-xs font-mono">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{card.readTime} read</span>
                  </div>
                </div>

                {/* Impact Indicator & Narration trigger */}
                <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
                  <span className={`text-[10px] font-mono uppercase px-2.5 py-0.8 rounded-md border flex items-center gap-1.5 ${
                    card.impact === 'Critical'
                      ? 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                      : card.impact === 'Breakthrough'
                      ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
                      : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
                  }`}>
                    <Flame className="w-3 h-3 fill-current" />
                    <span>{card.impact}</span>
                  </span>

                  {/* Audio voice trigger */}
                  <button
                    onClick={(e) => { e.stopPropagation(); onToggleSpeak(card); }}
                    className={`p-2 rounded-full backdrop-blur-md border transition-all ${
                      activeSpeechCardId === card.id
                        ? 'bg-cyan-500 text-obsidian-950 border-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.7)] animate-pulse'
                        : 'bg-obsidian-950/80 text-slate-300 border-white/20 hover:text-cyan-300 hover:border-cyan-400/50'
                    }`}
                    title="Audio narration"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col justify-between">
                <div>
                  <h3 className="text-base sm:text-lg font-heading font-semibold text-slate-100 mb-2.5 leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-body mb-4">
                    {card.summary}
                  </p>

                  {/* Key points in the 3D card */}
                  <div className="bg-obsidian-950/70 rounded-xl p-3 border border-white/5 mb-4">
                    <p className="text-[11px] font-mono text-cyan-400 mb-1.5 font-semibold">
                      ⚡ WHY IT MATTERS
                    </p>
                    <p className="text-xs text-slate-300 leading-normal">
                      {card.whyItMatters}
                    </p>
                  </div>
                </div>

                {/* Card Quick Actions */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); onToggleBookmark(card); }}
                      className={`p-2 rounded-lg border transition-all ${
                        isCardBookmarked(card.id)
                          ? 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                          : 'bg-obsidian-900 border-white/10 text-slate-400 hover:text-amber-300'
                      }`}
                      title="Bookmark card"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isCardBookmarked(card.id) ? 'fill-amber-400' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); onOpenShare(card); }}
                      className="p-2 rounded-lg bg-obsidian-900 border border-white/10 text-slate-400 hover:text-cyan-300 transition-all"
                      title="Share card"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={(e) => { e.stopPropagation(); onOpenDeepDive(card); }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 hover:brightness-120 font-mono text-xs transition-all shadow-[0_0_12px_rgba(0,242,254,0.2)]"
                  >
                    <span>Read Deep Dive</span>
                    <Maximize2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Glide Controls */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prevCard}
          className="p-3 rounded-full bg-obsidian-900/90 border border-white/15 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-950/40 transition-all shadow-lg active:scale-95"
          title="Previous Card"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Dots Navigator */}
        <div className="flex items-center gap-1.5 bg-obsidian-900/80 px-3 py-2 rounded-full border border-white/10">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeIndex === i 
                  ? 'w-6 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_rgba(0,242,254,0.6)]' 
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={`Jump to card ${i + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          className="p-3 rounded-full bg-obsidian-900/90 border border-white/15 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/60 hover:bg-cyan-950/40 transition-all shadow-lg active:scale-95"
          title="Next Card"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
