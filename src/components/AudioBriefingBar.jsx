import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  X, 
  Gauge, 
  Headphones,
  Sparkles
} from 'lucide-react';

export default function AudioBriefingBar({ 
  cards, 
  isOpen, 
  onClose,
  currentCardIndex,
  setCurrentCardIndex,
  isPlaying,
  setIsPlaying
}) {
  const [playbackRate, setPlaybackRate] = useState(1.1);

  const currentCard = cards[currentCardIndex] || cards[0];

  useEffect(() => {
    if (!isOpen) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
      return;
    }

    if (isPlaying && currentCard) {
      speakCurrentStory();
    }
  }, [isOpen, currentCardIndex, isPlaying, playbackRate]);

  const speakCurrentStory = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const textToRead = `${currentCard.title}. ${currentCard.summary}. Why it matters: ${currentCard.whyItMatters}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = playbackRate;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Daniel') || v.name.includes('Samantha')));
    if (englishVoice) {
      utterance.voice = englishVoice;
    }

    utterance.onend = () => {
      // Auto advance to next story
      if (currentCardIndex < cards.length - 1) {
        setCurrentCardIndex(prev => prev + 1);
      } else {
        setIsPlaying(false);
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const togglePlay = () => {
    if (isPlaying) {
      window.speechSynthesis?.cancel();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
    }
  };

  const handleNext = () => {
    if (currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(prev => prev - 1);
    }
  };

  const cycleSpeed = () => {
    const speeds = [1.0, 1.25, 1.5];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    setPlaybackRate(speeds[nextIdx]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-obsidian-950/95 border-t border-cyan-500/40 backdrop-blur-xl shadow-[0_-10px_40px_rgba(0,0,0,0.8)] animate-slideUp">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Left: Current Story Info */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-obsidian-900 border border-white/10 shrink-0">
            <img 
              src={currentCard.imageUrl} 
              alt={currentCard.title} 
              className="w-full h-full object-cover" 
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-cyan-950/70 flex items-center justify-center gap-0.5">
                <span className="w-1 h-3 bg-cyan-400 animate-bounce" />
                <span className="w-1 h-5 bg-cyan-400 animate-bounce delay-100" />
                <span className="w-1 h-2 bg-cyan-400 animate-bounce delay-200" />
              </div>
            )}
          </div>

          <div className="overflow-hidden flex-1 sm:max-w-md">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-cyan-400 font-semibold uppercase">
                Story {currentCardIndex + 1} of {cards.length}
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {currentCard.categoryLabel}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-heading font-medium text-slate-100 truncate">
              {currentCard.title}
            </p>
          </div>
        </div>

        {/* Center: Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrev}
            disabled={currentCardIndex === 0}
            className="p-2 rounded-full text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
            title="Previous Story"
          >
            <SkipBack className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className="p-3 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-obsidian-950 font-bold hover:brightness-110 shadow-[0_0_20px_rgba(0,242,254,0.5)] transition-all active:scale-95"
            title={isPlaying ? "Pause" : "Play Briefing"}
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
          </button>

          <button
            onClick={handleNext}
            disabled={currentCardIndex === cards.length - 1}
            className="p-2 rounded-full text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
            title="Next Story"
          >
            <SkipForward className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Audio options & Close */}
        <div className="flex items-center gap-2.5">
          {/* Speed Toggle */}
          <button
            onClick={cycleSpeed}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-obsidian-900 border border-white/10 text-xs font-mono text-cyan-300 hover:border-cyan-400/50"
            title="Playback Speed"
          >
            <Gauge className="w-3 h-3" />
            <span>{playbackRate}x</span>
          </button>

          {/* Close Player */}
          <button
            onClick={() => {
              window.speechSynthesis?.cancel();
              setIsPlaying(false);
              onClose();
            }}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="Close Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
