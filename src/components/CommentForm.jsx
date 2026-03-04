import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

/**
 * Formulaire pour ajouter un commentaire sous un post. Il comporte deux
 * champs : auteur et contenu. L'utilisateur peut laisser le champ auteur
 * vide pour publier anonymement. L'état local gère la valeur des champs
 * et la soumission appelle la callback onAddComment fournie par le parent
 */
function CommentForm({ onAddComment }) {
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onAddComment(author, content);
    setAuthor('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div>
        <Label htmlFor="comment-author" className="text-slate-400 font-pixel text-xs uppercase">
          Auteur
        </Label>
        <Input
          id="comment-author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Votre nom..."
          className="bg-slate-900 border-4 border-slate-700 text-white font-rpg text-base h-10 w-full px-4"
        />
      </div>
      <div>
        <Label htmlFor="comment-content" className="text-slate-400 font-pixel text-xs uppercase">
          Commentaire
        </Label>
        <textarea
          id="comment-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Votre commentaire..."
          className="bg-slate-900 border-4 border-slate-700 text-white font-rpg text-base w-full px-4 py-2 h-20 resize-y focus:outline-none focus:border-yellow-500"
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          variant="primary"
          size="sm"
          disabled={!content.trim()}
        >
          Ajouter
        </Button>
      </div>
    </form>
  );
}

export default CommentForm;