import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import AmbientBackground from './components/AmbientBackground';
import CategoryFilter from './components/CategoryFilter';
import NewsCard from './components/NewsCard';
import PerspectiveDeck from './components/PerspectiveDeck';
import DeepDiveModal from './components/DeepDiveModal';
import AudioBriefingBar from './components/AudioBriefingBar';
import BookmarksDrawer from './components/BookmarksDrawer';
import ShareModal from './components/ShareModal';
import SubmitStoryModal from './components/SubmitStoryModal';
import { NEWS_CARDS, CATEGORIES } from './data/newsData';
import { 
  Sparkles, 
  Layers, 
  LayoutGrid, 
  Headphones, 
  Zap, 
  ArrowUpRight, 
  ShieldCheck, 
  Clock, 
  Bot, 
  Cpu, 
  Heart,
  ChevronDown
} from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState('deck'); // 'deck' | 'grid'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Persisted Bookmarks
  const [bookmarks, setBookmarks] = useState(() => {
    try {
      const saved = localStorage.getItem('ai_journal_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Modals & Drawers
  const [deepDiveCard, setDeepDiveCard] = useState(null);
  const [shareCard, setShareCard] = useState(null);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isSubmitStoryOpen, setIsSubmitStoryOpen] = useState(false);

  // Audio Briefing Player
  const [isAudioBriefingOpen, setIsAudioBriefingOpen] = useState(false);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  // Individual Card Speech (TTS)
  const [activeSpeechCardId, setActiveSpeechCardId] = useState(null);

  // Persist bookmarks
  useEffect(() => {
    try {
      localStorage.setItem('ai_journal_bookmarks', JSON.stringify(bookmarks));
    } catch (e) {
      console.error(e);
    }
  }, [bookmarks]);

  // Stop single card speech when switching or unmounting
  useEffect(() => {
    return () => {
      window.speechSynthesis?.cancel();
    };
  }, []);

  const toggleBookmark = (card) => {
    setBookmarks((prev) => {
      const exists = prev.some((c) => c.id === card.id);
      if (exists) {
        return prev.filter((c) => c.id !== card.id);
      } else {
        return [card, ...prev];
      }
    });
  };

  const isCardBookmarked = (cardId) => {
    return bookmarks.some((c) => c.id === cardId);
  };

  const handleToggleSpeak = (card) => {
    if (!('speechSynthesis' in window)) {
      alert('Speech synthesis is not supported on this device/browser.');
      return;
    }

    if (activeSpeechCardId === card.id) {
      window.speechSynthesis.cancel();
      setActiveSpeechCardId(null);
    } else {
      window.speechSynthesis.cancel();
      // If audio briefing bar was active, pause it
      setIsAudioPlaying(false);

      const text = `${card.title}. ${card.summary}. Key takeaway: ${card.takeaways[0]}. Why it matters: ${card.whyItMatters}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.05;
      utterance.onend = () => setActiveSpeechCardId(null);
      utterance.onerror = () => setActiveSpeechCardId(null);
      
      const voices = window.speechSynthesis.getVoices();
      const voice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (voice) utterance.voice = voice;

      setActiveSpeechCardId(card.id);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filtered Cards
  const filteredCards = useMemo(() => {
    return NEWS_CARDS.filter((card) => {
      const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
      const matchesSearch = 
        !searchQuery || 
        card.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: NEWS_CARDS.length };
    NEWS_CARDS.forEach((card) => {
      counts[card.category] = (counts[card.category] || 0) + 1;
    });
    return counts;
  }, []);

  return (
    <div className="relative min-h-screen bg-obsidian-950 text-slate-100 flex flex-col font-body">
      {/* Dynamic Ambient Background */}
      <AmbientBackground />

      {/* Top Navbar */}
      <Navbar
        viewMode={viewMode}
        setViewMode={setViewMode}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        savedBookmarksCount={bookmarks.length}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenAudioBriefing={() => {
          setIsAudioBriefingOpen(true);
          setIsAudioPlaying(true);
        }}
        onOpenSubmitStory={() => setIsSubmitStoryOpen(true)}
        isAudioBriefingActive={isAudioBriefingOpen && isAudioPlaying}
      />

      {/* Hero Intro Header */}
      <section className="relative z-10 pt-10 pb-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Glow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 font-mono text-xs mb-6 shadow-[0_0_20px_rgba(0,242,254,0.2)] animate-float-slow">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>EVERY AI BREAKTHROUGH · IN SIMPLE WORDS · 30-SECOND CARDS</span>
        </div>

        <h1 className="font-display tracking-[0.14em] text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase text-slate-100 leading-tight mb-4 drop-shadow-md">
          Don't Get Left <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">Behind</span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed font-body mb-8">
          The world of artificial intelligence transforms every single second. We distill the noise into short, crisp visual cards that you can read in seconds or listen to on the go.
        </p>

        {/* Feature stats counter */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto mb-2">
          <div className="p-3 rounded-2xl glass-panel text-center">
            <span className="block font-mono font-bold text-lg text-cyan-400">100%</span>
            <span className="text-[11px] text-slate-400 font-mono">Crisp & Plain English</span>
          </div>
          <div className="p-3 rounded-2xl glass-panel text-center">
            <span className="block font-mono font-bold text-lg text-purple-400">&lt; 30s</span>
            <span className="text-[11px] text-slate-400 font-mono">Reading Time / Card</span>
          </div>
          <div className="p-3 rounded-2xl glass-panel text-center">
            <span className="block font-mono font-bold text-lg text-emerald-400">24/7</span>
            <span className="text-[11px] text-slate-400 font-mono">Real-time Lab Radar</span>
          </div>
          <div className="p-3 rounded-2xl glass-panel text-center">
            <span className="block font-mono font-bold text-lg text-amber-400">Voice TTS</span>
            <span className="text-[11px] text-slate-400 font-mono">Audio Digest Narration</span>
          </div>
        </div>
      </section>

      {/* Categories Filter Bar */}
      <section className="relative z-10">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          newsCounts={categoryCounts}
        />
      </section>

      {/* Main Content Showcase */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        {/* Search Results feedback */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between text-xs font-mono text-slate-400 bg-obsidian-900/80 p-3 rounded-xl border border-white/5">
            <span>Searching for: <strong className="text-cyan-400">"{searchQuery}"</strong> ({filteredCards.length} matches)</span>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-cyan-400 hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* View Mode Display */}
        {viewMode === 'deck' ? (
          <PerspectiveDeck
            cards={filteredCards}
            onToggleBookmark={toggleBookmark}
            isCardBookmarked={isCardBookmarked}
            onOpenShare={(card) => setShareCard(card)}
            onOpenDeepDive={(card) => setDeepDiveCard(card)}
            activeSpeechCardId={activeSpeechCardId}
            onToggleSpeak={handleToggleSpeak}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCards.length === 0 ? (
              <div className="col-span-full py-20 text-center text-slate-500 font-mono text-sm">
                No intelligence cards match your criteria. Try adjusting the category or search terms.
              </div>
            ) : (
              filteredCards.map((card) => (
                <NewsCard
                  key={card.id}
                  card={card}
                  isBookmarked={isCardBookmarked(card.id)}
                  onToggleBookmark={toggleBookmark}
                  onOpenShare={(card) => setShareCard(card)}
                  onOpenDeepDive={(card) => setDeepDiveCard(card)}
                  isCurrentlySpeaking={activeSpeechCardId === card.id}
                  onToggleSpeak={handleToggleSpeak}
                />
              ))
            )}
          </div>
        )}
      </main>

      {/* Audio Briefing Floating Player */}
      <AudioBriefingBar
        cards={filteredCards}
        isOpen={isAudioBriefingOpen}
        onClose={() => setIsAudioBriefingOpen(false)}
        currentCardIndex={currentAudioIndex}
        setCurrentCardIndex={setCurrentAudioIndex}
        isPlaying={isAudioPlaying}
        setIsPlaying={setIsAudioPlaying}
      />

      {/* Bookmarks Slide-Over Drawer */}
      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        savedCards={bookmarks}
        onRemoveBookmark={(id) => setBookmarks(prev => prev.filter(c => c.id !== id))}
        onClearAll={() => setBookmarks([])}
        onOpenDeepDive={(card) => {
          setIsBookmarksOpen(false);
          setDeepDiveCard(card);
        }}
      />

      {/* Deep Dive Modal */}
      <DeepDiveModal
        card={deepDiveCard}
        onClose={() => setDeepDiveCard(null)}
        isBookmarked={deepDiveCard ? isCardBookmarked(deepDiveCard.id) : false}
        onToggleBookmark={toggleBookmark}
        onOpenShare={(card) => setShareCard(card)}
        isCurrentlySpeaking={deepDiveCard ? activeSpeechCardId === deepDiveCard.id : false}
        onToggleSpeak={handleToggleSpeak}
      />

      {/* Share Modal */}
      <ShareModal
        card={shareCard}
        onClose={() => setShareCard(null)}
      />

      {/* Submit Story / Subscribe Modal */}
      <SubmitStoryModal
        isOpen={isSubmitStoryOpen}
        onClose={() => setIsSubmitStoryOpen(false)}
      />

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 glass-panel py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center p-[1px]">
              <div className="w-full h-full bg-obsidian-900 rounded-full flex items-center justify-center font-heading font-extrabold text-xs text-cyan-400">
                Ai
              </div>
            </div>
            <div>
              <p className="font-display tracking-[0.2em] font-bold text-sm uppercase text-slate-100">
                The AI Journal
              </p>
              <p className="text-[11px] text-slate-400 font-mono">
                Democratizing planetary AI updates for everyone.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-mono">
            <button onClick={() => setViewMode('deck')} className="hover:text-cyan-400 transition-colors">3D Flow Deck</button>
            <button onClick={() => setViewMode('grid')} className="hover:text-cyan-400 transition-colors">Grid Feed</button>
            <button onClick={() => setIsSubmitStoryOpen(true)} className="hover:text-cyan-400 transition-colors">Daily Newsletter</button>
            <button onClick={() => setIsSubmitStoryOpen(true)} className="hover:text-cyan-400 transition-colors">Submit Story</button>
          </div>

          <div className="text-xs text-slate-500 font-mono">
            © {new Date().getFullYear()} The AI Journal. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
