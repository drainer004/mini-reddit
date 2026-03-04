import React from 'react';
import { CLASSES } from '../../data/classes';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

function ClassSelector({ selectedClass, onSelect }) {
  return (
    <div className="space-y-4">
      <h3 className="font-rpg text-yellow-400 text-center text-lg tracking-wider uppercase">
        Choisissez votre classe
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CLASSES.map((cls, index) => (
          <motion.div
            key={cls.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(cls.id)}
            className={cn(
              "relative p-6 rounded-lg border-4 cursor-pointer transition-all duration-300",
              "hover:scale-105 hover:-translate-y-1",
              selectedClass === cls.id 
                ? "bg-slate-800 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.3)]"
                : "bg-slate-900/50 border-slate-700 hover:border-slate-500"
            )}
            style={{ 
              '--class-color': cls.color 
            }}
          >
            {/* Indicateur de sélection */}
            {selectedClass === cls.id && (
              <div className="absolute -top-3 -right-3 w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-slate-900 font-bold border-4 border-slate-900">
                ✓
              </div>
            )}
            
            {/* Emoji avec glow */}
            <div 
              className="text-6xl text-center mb-4 filter drop-shadow-lg"
              style={{ filter: `drop-shadow(0 0 10px ${cls.color})` }}
            >
              {cls.emoji}
            </div>
            
            <h4 
              className="font-rpg text-xl text-center mb-2 uppercase tracking-wider"
              style={{ color: cls.color }}
            >
              {cls.name}
            </h4>
            
            <p className="text-slate-400 text-sm text-center mb-4 leading-relaxed">
              {cls.description}
            </p>
            
            {/* Stats preview */}
            <div className="grid grid-cols-2 gap-2 text-xs font-pixel">
              <div className="text-slate-500">⚔️ FOR: <span className="text-white">{cls.baseStats.strength}</span></div>
              <div className="text-slate-500">💨 AGI: <span className="text-white">{cls.baseStats.agility}</span></div>
              <div className="text-slate-500">🧠 INT: <span className="text-white">{cls.baseStats.intelligence}</span></div>
              <div className="text-slate-500">❤️ VIT: <span className="text-white">{cls.baseStats.vitality}</span></div>
            </div>
            
            {/* Capacité spéciale */}
            <div className="mt-4 pt-4 border-t border-slate-700">
              <p className="text-yellow-500/80 text-xs text-center italic">
                {cls.specialAbility}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default ClassSelector;