import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Share2, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export default function ShareModal({ card, onClose }) {
  const [copied, setCopied] = useState(false);
  const [copiedSummary, setCopiedSummary] = useState(false);

  if (!card) return null;

  const currentUrl = window.location.href.split('#')[0];
  const shareText = `🔥 ${card.title}\n\n${card.summary}\n\nVia The AI Journal: ${currentUrl}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopySummary = () => {
    navigator.clipboard.writeText(shareText);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2000);
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `⚡ ${card.title}\n\nDistilled in 30s by @TheAIJournal:\n`
    )}&url=${encodeURIComponent(currentUrl)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareToLinkedIn = () => {
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-md rounded-3xl glass-panel border border-cyan-500/30 p-6 bg-obsidian-950/95 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Share2 className="w-4 h-4 text-cyan-400" />
            <h3 className="font-heading font-semibold text-slate-100 text-sm">
              Share Crisp AI Card
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Story Card Preview */}
        <div className="my-5 p-4 rounded-2xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 border border-white/10 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-400/20 text-cyan-400 text-[10px] font-extrabold flex items-center justify-center font-heading">
                Ai
              </span>
              <span className="font-display tracking-widest text-[11px] font-bold uppercase text-slate-200">
                The AI Journal
              </span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">
              30s CARD
            </span>
          </div>

          <div className="relative h-28 w-full rounded-xl overflow-hidden mb-3">
            <img src={card.imageUrl} alt={card.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian-950 to-transparent" />
            <span className={`absolute bottom-2 left-2 text-[9px] font-mono px-2 py-0.5 rounded-full border ${card.badgeColor}`}>
              {card.categoryLabel}
            </span>
          </div>

          <h4 className="text-xs font-heading font-semibold text-slate-100 line-clamp-2 mb-1.5">
            {card.title}
          </h4>
          <p className="text-[11px] text-slate-300 font-body line-clamp-3 leading-relaxed">
            {card.summary}
          </p>
        </div>

        {/* Social Share Buttons */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button
            onClick={shareToTwitter}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-950/20 text-xs text-slate-200 font-medium transition-all"
          >
            <svg className="w-3.5 h-3.5 fill-cyan-400" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span>Post on X</span>
          </button>

          <button
            onClick={shareToLinkedIn}
            className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-obsidian-900 border border-white/10 hover:border-blue-400/50 hover:bg-blue-950/20 text-xs text-slate-200 font-medium transition-all"
          >
            <svg className="w-3.5 h-3.5 fill-blue-400" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
            <span>LinkedIn</span>
          </button>
        </div>

        {/* Copy Link & Copy Summary */}
        <div className="space-y-2">
          <button
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-obsidian-950 font-semibold text-xs hover:brightness-110 shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Card Link Copied to Clipboard!' : 'Copy Direct Card Link'}</span>
          </button>

          <button
            onClick={handleCopySummary}
            className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-obsidian-900/80 border border-white/10 text-slate-300 text-xs hover:text-white hover:border-white/20 transition-all font-mono"
          >
            {copiedSummary ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Sparkles className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copiedSummary ? 'Summary Copied!' : 'Copy Formatted Text Summary'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
