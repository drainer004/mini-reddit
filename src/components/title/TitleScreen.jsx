import React, { useState, useEffect } from 'react';
import GameTitle from './GameTitle';
import MainMenu from './MainMenu';
import CharacterCreation from '../character/CharacterCreation';

function TitleScreen({ onStartGame }) {
  const [view, setView] = useState('menu'); // 'menu' | 'creation'
  const [hasSave, setHasSave] = useState(false);

  useEffect(() => {
    const save = localStorage.getItem('rpg_save');
    setHasSave(!!save);
  }, []);

  const handleNewGame = () => {
    setView('creation');
  };

  const handleCharacterCreated = (player) => {
    onStartGame(player);
  };

  const handleCancel = () => {
    setView('menu');
  };

  const handleContinue = () => {
    const save = JSON.parse(localStorage.getItem('rpg_save'));
    if (save) onStartGame(save.player);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rpg-darker via-rpg-dark to-rpg-panel flex items-center justify-center p-4 relative overflow-hidden">
      {/* Particules d'ambiance */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-yellow-500/20 text-xl animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {['✨', '⭐', '💫'][Math.floor(Math.random() * 3)]}
          </div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        {view === 'menu' ? (
          <div className="flex flex-col items-center">
            <GameTitle />
            <MainMenu 
              onNewGame={handleNewGame}
              onContinue={handleContinue}
              hasSave={hasSave}
            />
          </div>
        ) : (
          <CharacterCreation 
            onCreate={handleCharacterCreated}
            onCancel={handleCancel}
          />
        )}
      </div>
    </div>
  );
}

export default TitleScreen;