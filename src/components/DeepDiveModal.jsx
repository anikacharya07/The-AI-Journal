import React from 'react';
import { 
  X, 
  ExternalLink, 
  Clock, 
  Flame, 
  Volume2, 
  Bookmark, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export default function DeepDiveModal({ 
  card, 
  onClose, 
  isBookmarked, 
  onToggleBookmark, 
  onOpenShare,
  isCurrentlySpeaking,
  onToggleSpeak
}) {
  if (!card) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl glass-panel border border-cyan-500/30 shadow-[0_0_50px_rgba(0,242,254,0.25)] flex flex-col bg-obsidian-950/95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-obsidian-900/80 border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Visual Image */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={card.imageUrl}
            alt={card.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/50 to-transparent" />

          {/* Badges */}
          <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`text-xs font-mono font-medium px-3 py-1 rounded-full border backdrop-blur-md ${card.badgeColor}`}>
                {card.categoryLabel}
              </span>
              <span className="text-xs font-mono text-cyan-300 bg-obsidian-900/80 border border-white/10 px-2.5 py-1 rounded-full">
                {card.readTime} read
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400 bg-obsidian-900/80 border border-white/10 px-3 py-1 rounded-full">
                Published {card.date}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Title & Author */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-100 leading-tight mb-2">
              {card.title}
            </h2>
            <p className="text-sm font-mono text-cyan-400/80">
              Dispatched by {card.author} · Source: {card.sourceName}
            </p>
          </div>

          {/* Audio Narration Bar */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-obsidian-900/90 border border-white/10">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onToggleSpeak(card)}
                className={`p-2.5 rounded-full border transition-all ${
                  isCurrentlySpeaking
                    ? 'bg-cyan-500 text-obsidian-950 border-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.7)]'
                    : 'bg-obsidian-850 text-slate-200 border-white/10 hover:text-cyan-300 hover:border-cyan-400'
                }`}
              >
                <Volume2 className="w-4 h-4" />
              </button>
              <div>
                <p className="text-xs font-medium text-slate-200">
                  {isCurrentlySpeaking ? 'Playing Voice Briefing...' : 'Listen to 30s Audio Briefing'}
                </p>
                <p className="text-[11px] text-slate-400">
                  Synthesized AI voice digest
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onToggleBookmark(card)}
                className={`p-2 rounded-xl border transition-all ${
                  isBookmarked
                    ? 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                    : 'bg-obsidian-850 border-white/10 text-slate-400 hover:text-amber-300'
                }`}
                title="Bookmark"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-400' : ''}`} />
              </button>
              <button
                onClick={() => onOpenShare(card)}
                className="p-2 rounded-xl bg-obsidian-850 border border-white/10 text-slate-400 hover:text-cyan-300 transition-all"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Executive Overview */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Executive Overview</span>
            </h4>
            <p className="text-slate-200 text-base leading-relaxed">
              {card.summary}
            </p>
          </div>

          {/* Key Takeaways */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Verified Key Findings</span>
            </h4>
            <div className="grid gap-2 sm:gap-3">
              {card.takeaways.map((point, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-obsidian-900/60 border border-white/5 flex items-start gap-3">
                  <span className="font-mono text-cyan-400 font-bold text-xs mt-0.5">0{i + 1}</span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-normal">{point}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Analysis */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-blue-950/30 to-purple-950/40 border border-cyan-500/30">
            <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-300 flex items-center gap-2 mb-2 font-semibold">
              <Flame className="w-3.5 h-3.5 fill-current text-cyan-400" />
              <span>Why This Changes Everything</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-body">
              {card.whyItMatters}
            </p>
          </div>

          {/* Direct Source Link */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {card.tags.map((t) => (
                <span key={t} className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded-md">
                  #{t}
                </span>
              ))}
            </div>

            <a
              href={card.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-500 text-obsidian-950 font-medium text-xs hover:bg-cyan-400 transition-colors shadow-[0_0_15px_rgba(0,242,254,0.3)]"
            >
              <span>Visit Primary Source</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
