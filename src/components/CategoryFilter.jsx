import React from 'react';
import { 
  Sparkles, 
  Brain, 
  Cpu, 
  Bot, 
  Activity, 
  Code, 
  Palette, 
  Atom 
} from 'lucide-react';
import { CATEGORIES } from '../data/newsData';

const iconMap = {
  Sparkles,
  Brain,
  Cpu,
  Bot,
  Activity,
  Code,
  Palette,
  Atom
};

export default function CategoryFilter({ selectedCategory, onSelectCategory, newsCounts }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none no-scrollbar">
        {CATEGORIES.map((cat) => {
          const Icon = iconMap[cat.icon] || Sparkles;
          const isSelected = selectedCategory === cat.id;
          const count = newsCounts[cat.id] || 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-300 border ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-400/60 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.25)]'
                  : 'bg-obsidian-900/60 border-white/5 text-slate-400 hover:text-slate-200 hover:border-white/20 hover:bg-obsidian-850'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{cat.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                isSelected 
                  ? 'bg-cyan-500/30 text-cyan-200' 
                  : 'bg-white/5 text-slate-500'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
