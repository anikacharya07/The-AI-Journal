import React, { useState } from 'react';
import { 
  Clock, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  Share2, 
  ChevronRight, 
  CheckCircle2, 
  Heart, 
  ExternalLink,
  Flame,
  ListCollapse
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function NewsCard({ 
  card, 
  isBookmarked, 
  onToggleBookmark, 
  onOpenShare, 
  onOpenDeepDive,
  isCurrentlySpeaking,
  onToggleSpeak
}) {
  const [showTakeaways, setShowTakeaways] = useState(false);
  const [likes, setLikes] = useState(card.likesCount);
  const [hasLiked, setHasLiked] = useState(false);

  const handleLike = (e) => {
    e.stopPropagation();
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      confetti({
        particleCount: 28,
        spread: 45,
        origin: { 
          x: e.clientX / window.innerWidth, 
          y: e.clientY / window.innerHeight 
        },
        colors: ['#00f2fe', '#8a2be2', '#ff007f']
      });
    } else {
      setLikes(prev => prev - 1);
      setHasLiked(false);
    }
  };

  return (
    <article className="glass-card rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 border border-white/10 hover:border-cyan-500/40 relative">
      {/* Top Banner Image with Vignette & HUD Badges */}
      <div className="relative h-48 w-full overflow-hidden bg-obsidian-900">
        <img
          src={card.imageUrl}
          alt={card.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 filter brightness-90 group-hover:brightness-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 via-obsidian-950/40 to-transparent" />

        {/* Category Pill & Read Time */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className={`text-[11px] font-mono font-medium px-2.5 py-0.8 rounded-full border backdrop-blur-md shadow-sm ${card.badgeColor}`}>
            {card.categoryLabel}
          </span>
          <div className="flex items-center gap-1.5 bg-obsidian-950/80 backdrop-blur-md px-2.5 py-0.8 rounded-full border border-white/10 text-slate-300 text-[11px] font-mono">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span>{card.readTime} read</span>
          </div>
        </div>

        {/* Impact Level Badge */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-md border flex items-center gap-1 ${
            card.impact === 'Critical'
              ? 'bg-rose-950/80 border-rose-500/40 text-rose-300'
              : card.impact === 'Breakthrough'
              ? 'bg-cyan-950/80 border-cyan-500/40 text-cyan-300'
              : 'bg-amber-950/80 border-amber-500/40 text-amber-300'
          }`}>
            <Flame className="w-2.5 h-2.5 fill-current" />
            <span>{card.impact}</span>
          </span>
          <span className="text-[11px] text-slate-400 font-mono">
            {card.date}
          </span>
        </div>

        {/* Audio Narration Quick Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onToggleSpeak(card); }}
          className={`absolute bottom-3 right-3 p-2 rounded-full backdrop-blur-md border transition-all ${
            isCurrentlySpeaking
              ? 'bg-cyan-500 text-obsidian-950 border-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.6)] animate-pulse'
              : 'bg-obsidian-950/80 text-slate-300 border-white/20 hover:text-cyan-300 hover:border-cyan-400/50'
          }`}
          title={isCurrentlySpeaking ? "Pause Narration" : "Listen in 30 seconds"}
        >
          {isCurrentlySpeaking ? (
            <div className="flex items-center gap-1">
              <span className="w-1 h-3 bg-obsidian-950 animate-bounce" />
              <span className="w-1 h-4 bg-obsidian-950 animate-bounce delay-75" />
              <span className="w-1 h-2 bg-obsidian-950 animate-bounce delay-150" />
            </div>
          ) : (
            <Volume2 className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Main Headline */}
          <h2 
            onClick={() => onOpenDeepDive(card)}
            className="text-base sm:text-lg font-heading font-semibold text-slate-100 group-hover:text-cyan-200 transition-colors line-clamp-2 leading-snug cursor-pointer mb-2"
          >
            {card.title}
          </h2>

          {/* 30-Second Crisp Summary */}
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 font-body">
            {card.summary}
          </p>

          {/* Quick Takeaways Toggle */}
          <div className="mb-4">
            <button
              onClick={() => setShowTakeaways(!showTakeaways)}
              className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
            >
              <ListCollapse className="w-3.5 h-3.5" />
              <span>{showTakeaways ? 'Hide Key Takeaways' : 'View 3 Key Takeaways'}</span>
            </button>

            {showTakeaways && (
              <ul className="mt-2.5 space-y-1.5 bg-obsidian-900/80 rounded-xl p-3 border border-white/5 animate-fadeIn">
                {card.takeaways.map((point, i) => (
                  <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {card.tags.map((tag) => (
              <span key={tag} className="text-[10px] font-mono text-slate-400 bg-white/5 px-2 py-0.5 rounded hover:text-cyan-300 transition-colors cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            {/* Like */}
            <button
              onClick={handleLike}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                hasLiked
                  ? 'bg-rose-950/60 border-rose-500/40 text-rose-400'
                  : 'bg-obsidian-900/60 border-white/5 hover:border-rose-500/30 hover:text-rose-300'
              }`}
              title="Like update"
            >
              <Heart className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              <span className="font-mono text-[11px]">{likes}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => onToggleBookmark(card)}
              className={`p-1.5 rounded-lg border transition-all ${
                isBookmarked
                  ? 'bg-amber-950/60 border-amber-500/40 text-amber-400'
                  : 'bg-obsidian-900/60 border-white/5 hover:border-amber-500/30 hover:text-amber-300'
              }`}
              title={isBookmarked ? "Remove Bookmark" : "Save for later"}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-400 text-amber-400' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={() => onOpenShare(card)}
              className="p-1.5 rounded-lg bg-obsidian-900/60 border border-white/5 hover:border-cyan-500/30 hover:text-cyan-300 transition-all"
              title="Share card"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Deep Dive Action Link */}
          <button
            onClick={() => onOpenDeepDive(card)}
            className="flex items-center gap-1 font-mono text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors group/link"
          >
            <span>Deep Dive</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
}
