import React, { useState } from 'react';

import { Input } from '../ui/input';
import { Label } from '../ui/label';
import ClassSelector from './ClassSelector';
import { motion, AnimatePresence } from 'framer-motion';
import { CLASSES,calculateStats } from '../../data/classes';
import { Button } from '../ui/button';

function CharacterCreation({ onCreate, onCancel }) {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);

  const validateName = (value) => {
    if (value.length < 2) {
      setNameError('Minimum 2 caractères');
      return false;
    }
    if (value.length > 12) {
      setNameError('Maximum 12 caractères');
      return false;
    }
    if (!/^[a-zA-Z0-9]+$/.test(value)) {
      setNameError('Alphanumérique uniquement');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleNameSubmit = () => {
    if (validateName(name)) setStep(2);
  };

  const handleClassSelect = (classId) => {
    setSelectedClass(classId);
    setStep(3);
  };

  const handleCreate = () => {
    const classData = CLASSES.find(c => c.id === selectedClass);
    const stats = calculateStats(classData.baseStats);

    const player = {
      id: Date.now().toString(),
      name,
      class: selectedClass,
      className: classData.name,
      emoji: classData.emoji,
      level: 1,
      xp: 0,
      gold: 50,
      stats: {
        ...classData.baseStats,
        ...stats
      },
      equipment: {},
      inventory: [],
      createdAt: new Date().toISOString()
    };

    onCreate(player);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h2 className="font-rpg text-2xl text-yellow-400 text-center">
              Comment vous appelez-vous ?
            </h2>
            
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-400 font-pixel text-xs uppercase">
                Nom du héros
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (nameError) validateName(e.target.value);
                }}
                placeholder="Entrez votre nom..."
                className="bg-slate-900 border-4 border-slate-700 text-white font-rpg text-lg h-14 text-center uppercase tracking-wider focus:border-yellow-500"
                maxLength={12}
              />
              {nameError && (
                <p className="text-red-400 text-xs font-pixel text-center animate-shake">
                  {nameError}
                </p>
              )}
              <p className="text-slate-500 text-xs text-center">
                {name.length}/12 caractères
              </p>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={onCancel}>
                ← Retour
              </Button>
              <Button 
                variant="gold" 
                className="flex-1"
                onClick={handleNameSubmit}
                disabled={name.length < 2}
              >
                Suivant →
              </Button>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ClassSelector 
              selectedClass={selectedClass}
              onSelect={handleClassSelect}
            />
            <div className="mt-6 flex justify-center">
              <Button variant="outline" onClick={() => setStep(1)}>
                ← Retour
              </Button>
            </div>
          </motion.div>
        );

      case 3:
        const classData = CLASSES.find(c => c.id === selectedClass);
        const finalStats = calculateStats(classData.baseStats);
        
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <h2 className="font-rpg text-2xl text-yellow-400 text-center">
              Récapitulatif
            </h2>

            <div className="bg-slate-900/80 border-4 border-slate-700 rounded-lg p-6 space-y-4">
              {/* Header */}
              <div className="flex items-center gap-4 border-b border-slate-700 pb-4">
                <span className="text-6xl">{classData.emoji}</span>
                <div>
                  <h3 className="font-rpg text-2xl text-white">{name}</h3>
                  <p style={{ color: classData.color }} className="font-pixel text-sm uppercase">
                    {classData.name} Niveau 1
                  </p>
                </div>
              </div>

              {/* Stats principales */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-red-900/30 border-2 border-red-700 rounded p-3 text-center">
                  <div className="text-red-400 font-pixel text-xs mb-1">❤️ PV</div>
                  <div className="text-2xl font-rpg text-white">{finalStats.hp}</div>
                </div>
                <div className="bg-blue-900/30 border-2 border-blue-700 rounded p-3 text-center">
                  <div className="text-blue-400 font-pixel text-xs mb-1">💙 PM</div>
                  <div className="text-2xl font-rpg text-white">{finalStats.mp}</div>
                </div>
              </div>

              {/* Stats détaillées */}
              <div className="grid grid-cols-2 gap-2 text-sm font-pixel">
                <div className="flex justify-between bg-slate-800 p-2 rounded">
                  <span className="text-slate-400">⚔️ ATQ</span>
                  <span className="text-white">{finalStats.attack}</span>
                </div>
                <div className="flex justify-between bg-slate-800 p-2 rounded">
                  <span className="text-slate-400">🛡️ DEF</span>
                  <span className="text-white">{finalStats.defense}</span>
                </div>
              </div>

              {/* Capacité */}
              <div className="bg-yellow-900/20 border-2 border-yellow-700/50 rounded p-3">
                <p className="text-yellow-500/80 text-xs text-center">
                  <strong>Capacité spéciale :</strong><br/>
                  {classData.specialAbility}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>
                ← Modifier
              </Button>
              <Button variant="gold" size="rpg" className="flex-1" onClick={handleCreate}>
                🎮 Commencer !
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900/90 border-4 border-slate-700 rounded-lg p-8 backdrop-blur-sm">
      {/* Progress bar */}
      <div className="flex justify-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`w-10 h-10 rounded-full flex items-center justify-center font-pixel text-sm border-4 transition-all ${
              s === step 
                ? 'bg-yellow-500 border-yellow-700 text-yellow-950 scale-110' 
                : s < step 
                  ? 'bg-green-600 border-green-800 text-white' 
                  : 'bg-slate-800 border-slate-600 text-slate-500'
            }`}
          >
            {s < step ? '✓' : s}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {renderStep()}
      </AnimatePresence>
    </div>
  );
}

export default CharacterCreation;