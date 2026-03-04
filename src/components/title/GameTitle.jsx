import React from 'react';
import { motion } from 'framer-motion';

function GameTitle() {
  return (
    <div className="text-center mb-12">
      <motion.div 
        className="flex items-center justify-center gap-4 mb-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.span 
          className="text-5xl"
          animate={{ rotate: [-5, 5, -5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ⚔️
        </motion.span>
        
        <div className="flex flex-col">
          <span className="font-pixel text-4xl md:text-6xl text-yellow-400 tracking-widest drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
            REACT
          </span>
          <span className="font-rpg text-5xl md:text-7xl text-white tracking-wider drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] -mt-2">
            DUNGEON
          </span>
        </div>
        
        <motion.span 
          className="text-5xl"
          animate={{ rotate: [5, -5, 5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🛡️
        </motion.span>
      </motion.div>
      
      <motion.p 
        className="font-rpg text-slate-400 text-lg tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        L'aventure commence ici...
      </motion.p>
      
      <motion.div 
        className="mt-4 text-yellow-500 font-pixel text-xs"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        v1.0
      </motion.div>
    </div>
  );
}

export default GameTitle;