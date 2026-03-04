import React, { useState } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import { Button } from './ui/button';

/**
 * Composant qui représente un post individuel. Il affiche toutes les
 * informations relatives au post (titre, contenu, auteur, date, score,
 * nombre de commentaires) et propose des boutons pour voter, afficher ou
 * masquer les commentaires, ajouter un commentaire et supprimer le post.
 *
 * Les callbacks onUpvote, onDownvote, onAddComment et onDeletePost sont
 * transmises par le composant parent (App). Elles sont appelées avec
 * l'identifiant du post ou les données nécessaires afin de mettre à jour
 * l'état global dans App.
 */
function Post({ post, currentUser, onUpvote, onDownvote, onAddComment, onDeletePost }) {
  // État local pour savoir si la section des commentaires est visible ou non
  const [showComments, setShowComments] = useState(false);

  // Calcul du score du post (nombre d'upvotes moins nombre de downvotes)
  const score = post.upvotes - post.downvotes;

  // Gestionnaire pour basculer l'affichage des commentaires
  const toggleComments = () => {
    setShowComments((prev) => !prev);
  };

  return (
    <div className="rpg-panel space-y-4">
      {/* Titre et actions de vote */}
      <div className="flex justify-between items-start gap-4">
        <div>
          <h3 className="font-rpg text-2xl text-yellow-400 mb-1 break-words">
            {post.title}
          </h3>
          <div className="text-slate-400 text-sm">
            par <span className="text-white font-medium">{post.author}</span> le {post.date}
          </div>
        </div>
        {/* Section des votes : deux boutons entourant le score */}
        <div className="flex flex-col items-center gap-1 text-center">
          <Button
            onClick={() => onUpvote(post.id)}
            variant="gold"
            size="icon"
            aria-label="Upvote"
          >
            ▲
          </Button>
          <span className="font-rpg text-lg text-white">{score}</span>
          <Button
            onClick={() => onDownvote(post.id)}
            variant="primary"
            size="icon"
            aria-label="Downvote"
          >
            ▼
          </Button>
        </div>
      </div>
      {/* Contenu du post */}
      <p className="text-slate-200 whitespace-pre-wrap">
        {post.content}
      </p>
      {/* Boutons d'action sous le post */}
      <div className="flex flex-wrap items-center gap-4 text-sm">
          {/* Bouton pour afficher/masquer les commentaires. Le nombre de
              commentaires est affiché entre parenthèses. */}
          <Button
            onClick={toggleComments}
            variant="outline"
            size="sm"
          >
            {showComments ? 'Masquer les commentaires' : 'Voir les commentaires'} ({post.comments.length})
          </Button>
          {/* Si l'utilisateur courant est l'auteur du post, on affiche un bouton
              de suppression. Celui‑ci appelle la callback onDeletePost avec
              l'identifiant du post. */}
          {currentUser && currentUser === post.author && (
            <Button
              onClick={() => onDeletePost(post.id)}
              variant="danger"
              size="sm"
            >
              Supprimer
            </Button>
          )}
      </div>
      {/* Section des commentaires. Elle n'est rendue que si showComments est vrai. */}
      {showComments && (
        <div className="pt-4 border-t border-rpg-border space-y-4">
          {/* Liste des commentaires existants */}
          <CommentList comments={post.comments} />
          {/* Formulaire d'ajout de commentaire. On transmet une fonction qui
              encapsule l'identifiant du post courant. */}
          <CommentForm onAddComment={(author, content) => onAddComment(post.id, author, content)} />
        </div>
      )}
    </div>
  );
}

export default Post;