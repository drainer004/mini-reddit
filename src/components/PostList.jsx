import React from 'react';
import Post from './Post';

/**
 * Affiche une liste de posts. Ce composant reçoit en entrée le tableau des
 * posts ainsi que diverses callbacks (upvote, downvote, ajout de
 * commentaire, suppression). Il se contente d'itérer sur la liste et de
 * rendre un composant Post pour chacun d'entre eux. La clé attribuée à
 * chaque élément utilise l'identifiant unique du post afin d'aider React
 * lors du rendu de listes.
 */
function PostList({ posts, currentUser, onUpvote, onDownvote, onAddComment, onDeletePost }) {
  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          currentUser={currentUser}
          onUpvote={onUpvote}
          onDownvote={onDownvote}
          onAddComment={onAddComment}
          onDeletePost={onDeletePost}
        />
      ))}
    </div>
  );
}

export default PostList;