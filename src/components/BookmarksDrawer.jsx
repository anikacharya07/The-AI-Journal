import React from 'react';
import { 
  X, 
  Bookmark, 
  Trash2, 
  Download, 
  ExternalLink, 
  Clock, 
  Flame,
  ArrowRight
} from 'lucide-react';

export default function BookmarksDrawer({ 
  isOpen, 
  onClose, 
  savedCards, 
  onRemoveBookmark, 
  onClearAll,
  onOpenDeepDive 
}) {
  if (!isOpen) return null;

  const handleExportMarkdown = () => {
    let md = `# The AI Journal — My Saved Intelligence Digest\n\n`;
    md += `*Exported on ${new Date().toLocaleDateString()}*\n\n---\n\n`;
    savedCards.forEach((c, idx) => {
      md += `### ${idx + 1}. ${c.title}\n`;
      md += `**Category:** ${c.categoryLabel} | **Impact:** ${c.impact} | **Read Time:** ${c.readTime}\n\n`;
      md += `${c.summary}\n\n`;
      md += `**Why it matters:** ${c.whyItMatters}\n\n`;
      md += `**Source:** [${c.sourceName}](${c.sourceUrl})\n\n---\n\n`;
    });

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-journal-saved-briefing-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="fixed inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-obsidian-950 border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl">
          {/* Drawer Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Bookmark className="w-4 h-4 fill-amber-400" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-slate-100 text-base">
                    Saved Cards
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    {savedCards.length} {savedCards.length === 1 ? 'card' : 'cards'} bookmarked
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Actions Bar */}
            {savedCards.length > 0 && (
              <div className="py-3 flex items-center justify-between text-xs font-mono border-b border-white/5">
                <button
                  onClick={handleExportMarkdown}
                  className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Markdown</span>
                </button>

                <button
                  onClick={onClearAll}
                  className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              </div>
            )}
          </div>

          {/* Cards List */}
          <div className="flex-1 overflow-y-auto py-4 space-y-3">
            {savedCards.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-500">
                <Bookmark className="w-10 h-10 mb-3 stroke-[1.2] opacity-40" />
                <p className="text-sm font-medium text-slate-300">No saved cards yet</p>
                <p className="text-xs mt-1 text-slate-500 max-w-xs">
                  Click the bookmark icon on any card to save it for offline reading or export.
                </p>
              </div>
            ) : (
              savedCards.map((card) => (
                <div
                  key={card.id}
                  className="group relative p-3.5 rounded-2xl bg-obsidian-900 border border-white/5 hover:border-cyan-500/30 transition-all flex gap-3"
                >
                  <img
                    src={card.imageUrl}
                    alt={card.title}
                    className="w-16 h-16 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[9px] font-mono px-2 py-0.2 rounded-full border ${card.badgeColor}`}>
                        {card.categoryLabel}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {card.readTime}
                      </span>
                    </div>

                    <h4 
                      onClick={() => onOpenDeepDive(card)}
                      className="text-xs font-heading font-medium text-slate-200 line-clamp-2 cursor-pointer group-hover:text-cyan-300 transition-colors"
                    >
                      {card.title}
                    </h4>

                    <div className="mt-2 flex items-center justify-between">
                      <button
                        onClick={() => onOpenDeepDive(card)}
                        className="text-[10px] font-mono text-cyan-400 hover:underline flex items-center gap-0.5"
                      >
                        <span>Read</span>
                        <ArrowRight className="w-2.5 h-2.5" />
                      </button>

                      <button
                        onClick={() => onRemoveBookmark(card.id)}
                        className="text-[10px] text-slate-500 hover:text-rose-400 font-mono transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer */}
          <div className="pt-4 border-t border-white/10 text-center">
            <p className="text-[11px] text-slate-500 font-mono">
              Persisted in your local browser intelligence cache
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
