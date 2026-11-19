import React, { useState } from 'react';
import { 
  X, 
  Send, 
  Mail, 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SubmitStoryModal({ isOpen, onClose }) {
  const [tab, setTab] = useState('subscribe'); // 'subscribe' | 'submit'
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  // Story submit state
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [summary, setSummary] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubscribed(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#8a2be2', '#ffb703']
    });
  };

  const handleSubmitStory = (e) => {
    e.preventDefault();
    if (!title || !link) return;
    setIsSubmitted(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
      colors: ['#00f2fe', '#10b981']
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-lg rounded-3xl glass-panel border border-cyan-500/30 p-6 sm:p-8 bg-obsidian-950/95 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Tab switch */}
        <div className="flex items-center gap-2 mb-6 bg-obsidian-900 p-1 rounded-2xl border border-white/10 w-fit">
          <button
            onClick={() => setTab('subscribe')}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
              tab === 'subscribe'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Daily 30s Drop
          </button>
          <button
            onClick={() => setTab('submit')}
            className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
              tab === 'submit'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Submit an AI Update
          </button>
        </div>

        {tab === 'subscribe' ? (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-2">
              <Zap className="w-4 h-4" />
              <span>Stay Ahead of the Curve</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-100 mb-2">
              Get the Daily 60-Second AI Digest
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-body mb-6 leading-relaxed">
              No endless scrolls, no technical jargon overload. Receive the top 5 distilled AI breakthroughs every morning in your inbox.
            </p>

            {isSubscribed ? (
              <div className="p-6 rounded-2xl bg-cyan-950/40 border border-cyan-500/40 text-center animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-cyan-400 mx-auto mb-2" />
                <h4 className="font-heading font-semibold text-slate-100 text-base mb-1">
                  You're on the priority list!
                </h4>
                <p className="text-xs text-slate-300">
                  Welcome to The AI Journal. Tomorrow morning's drop is heading your way.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-obsidian-900 border border-white/10 text-xs sm:text-sm text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400/60 focus:ring-1 focus:ring-cyan-400/30 transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-obsidian-950 font-bold text-xs sm:text-sm hover:brightness-110 shadow-[0_0_20px_rgba(0,242,254,0.35)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Subscribe to The AI Journal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 font-mono">
                  100% Free · No spam · One-click unsubscribe anytime
                </p>
              </form>
            )}
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-2">
              <Sparkles className="w-4 h-4" />
              <span>Community & Research Radar</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-slate-100 mb-2">
              Submit a Breakthrough
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 font-body mb-6 leading-relaxed">
              Did your lab, company, or open-source project launch something game-changing? Our editorial team distills verified breakthroughs into 30s cards.
            </p>

            {isSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-center animate-fadeIn">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                <h4 className="font-heading font-semibold text-slate-100 text-base mb-1">
                  Submission Received
                </h4>
                <p className="text-xs text-slate-300">
                  Our editors are reviewing your update. If selected, it will be published to the live deck.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitStory} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Headline or Model Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Next-Gen 1M Context Window Silicon"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400/60 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Source / ArXiv / GitHub Link</label>
                  <input
                    type="url"
                    required
                    placeholder="https://..."
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400/60 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono text-slate-400 mb-1">Short Description (Why it matters)</label>
                  <textarea
                    rows={3}
                    placeholder="Explain the breakthrough in 2-3 sentences..."
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-obsidian-900 border border-white/10 text-xs text-slate-100 placeholder-slate-500 outline-none focus:border-cyan-400/60 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-xl bg-cyan-500 text-obsidian-950 font-bold text-xs hover:bg-cyan-400 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,242,254,0.3)]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send to Editorial Radar</span>
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
