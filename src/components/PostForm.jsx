import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Button } from './ui/button';

/**
 * Formulaire d'ajout de post.
 *
 * Ce composant expose trois champs : un titre, un contenu (champ de texte
 * multi‑ligne) et un auteur. L'utilisateur peut saisir librement ces
 * informations puis soumettre le formulaire. Lorsque le titre est vide, le
 * bouton est désactivé afin d'éviter la création de posts sans titre.
 *
 * Les valeurs des champs sont stockées dans l'état local du composant via
 * useState. À la soumission, la callback onAddPost fournie par le parent est
 * appelée avec les valeurs en entrée, puis les champs sont réinitialisés.
 */
function PostForm({ onAddPost }) {
  // États locaux pour stocker les valeurs des champs du formulaire
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');

  // Gestionnaire appelé lors de la soumission du formulaire. On empêche
  // l'événement par défaut (rechargement de la page), on vérifie que le titre
  // n'est pas vide, puis on invoque la callback avec les données saisies.
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddPost(title, content, author);
    // Réinitialisation des champs après l'envoi
    setTitle('');
    setContent('');
    setAuthor('');
  };

  return (
    <div className="rpg-panel">
      {/* En‑tête du formulaire */}
      <h2 className="font-rpg text-xl text-yellow-400 mb-4">Ajouter un post</h2>
      {/* Formulaire contrôlé : chaque input est relié à un état local */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Champ titre */}
        <div>
          <Label htmlFor="title" className="text-slate-400 font-pixel text-xs uppercase">
            Titre (obligatoire)
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre du post..."
            className="bg-slate-900 border-4 border-slate-700 text-white font-rpg text-base h-12 w-full px-4"
            required
          />
        </div>
        {/* Champ contenu */}
        <div>
          <Label htmlFor="content" className="text-slate-400 font-pixel text-xs uppercase">
            Contenu
          </Label>
          {/* Le composant Input est utilisé ici en mode multi‑ligne via as="textarea" */}
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Écrivez votre message..."
            className="bg-slate-900 border-4 border-slate-700 text-white font-rpg text-base w-full px-4 py-2 h-24 resize-y focus:outline-none focus:border-yellow-500"
          />
        </div>
        {/* Champ auteur */}
        <div>
          <Label htmlFor="author" className="text-slate-400 font-pixel text-xs uppercase">
            Auteur
          </Label>
          <Input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Votre nom ou pseudo..."
            className="bg-slate-900 border-4 border-slate-700 text-white font-rpg text-base h-12 w-full px-4"
          />
        </div>
        {/* Bouton de soumission */}
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="gold"
            disabled={!title.trim()}
            className="px-6 py-3"
          >
            Publier
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PostForm;