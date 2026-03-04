import React from 'react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

function MainMenu({ onNewGame, onContinue, hasSave }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      className="flex flex-col items-center gap-4 w-full max-w-md"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="w-full">
        <Button 
          variant="gold" 
          size="rpg" 
          className="w-full"
          onClick={onNewGame}
        >
          <span className="mr-2">🎮</span> Nouvelle Partie
        </Button>
      </motion.div>

      {hasSave && (
        <motion.div variants={itemVariants} className="w-full">
          <Button 
            variant="primary" 
            size="rpg" 
            className="w-full"
            onClick={onContinue}
          >
            <span className="mr-2">💾</span> Continuer
          </Button>
        </motion.div>
      )}

      <motion.div variants={itemVariants} className="w-full">
        <Button 
          variant="outline" 
          size="lg" 
          className="w-full"
          onClick={() => alert('Options à venir')}
        >
          <span className="mr-2">⚙️</span> Options
        </Button>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="mt-8 text-center text-slate-500 font-pixel text-xs"
      >
        <p>Un jeu créé avec ❤️ et React</p>
        <p className="mt-1">© 2026 React Dungeon</p>
      </motion.div>
    </motion.div>
  );
}

export default MainMenu;