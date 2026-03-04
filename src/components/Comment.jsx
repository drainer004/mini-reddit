import React from 'react';

/**
 * Représente un commentaire individuel. Il affiche l'auteur, la date et le
 * contenu du commentaire. La structure reste volontairement simple pour
 * conserver la clarté et se concentrer sur les fonctionnalités principales
 */
function Comment({ comment }) {
  return (
    <div className="bg-rpg-dark border-4 border-rpg-border rounded-rpg p-4">
      <div className="text-slate-400 text-xs mb-1">
        <span className="text-white font-medium">{comment.author}</span> – {comment.date}
      </div>
      <p className="text-slate-200 whitespace-pre-wrap text-sm">{comment.content}</p>
    </div>
  );
}

export default Comment;