import React from 'react';
import Comment from './Comment';

/**
 * Affiche la liste des commentaires pour un post donné. S'il n'y a pas de
 * commentaire, un message d'information est affiché. Chaque Comment
 * est rendu avec une clé unique issue de son id afin de maintenir la
 * cohérence lors des mises à jour de la liste.
 */
function CommentList({ comments }) {
  if (!comments || comments.length === 0) {
    return <p className="text-slate-500 text-sm">Aucun commentaire pour l'instant.</p>;
  }
  return (
    <div className="space-y-2">
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;