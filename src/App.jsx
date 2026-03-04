import React, { useState, useEffect } from 'react';

// Import des composants que nous allons créer juste après
// PostForm permet d'ajouter un nouveau post, PostList affiche la liste complète de posts
import PostForm from './components/PostForm';
import PostList from './components/PostList';

// Import du fichier de styles de l'application. Le fichier index.css provient du modèle
// existant et contient la configuration de Tailwind (couleurs, polices…). Nous conservons
// également App.css pour laisser la possibilité de rajouter des styles spécifiques, même si
// celui‑ci est actuellement vide.
import './App.css';

/**
 * Composant principal de l'application. Il gère l'état global (liste des posts) et
 * transmet des callbacks aux composants enfants pour modifier cet état. Les données
 * sont stockées dans le state et persistées dans le localStorage afin que
 * l'utilisateur retrouve ses posts même après un rafraîchissement de la page.
 */
function App() {
  // État qui contient la liste des posts. On l'initialise en lisant le localStorage
  // (si des données existent déjà). Sinon, on crée une liste contenant un post par défaut
  // pour illustrer l'affichage. Chaque post possède un identifiant unique, un titre,
  // un contenu, un auteur, une date, un nombre de votes positifs/négatifs et un tableau
  // de commentaires
  const [posts, setPosts] = useState(() => {
    // Chargement éventuel depuis localStorage
    try {
      const saved = localStorage.getItem('reddit_posts');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Erreur lors du chargement des posts depuis localStorage', e);
    }
    // Exemple de données initiales si aucune sauvegarde n'existe
    return [
      {
        id: Date.now(),
        title: 'Titre du post',
        content: 'Contenu détaillé...\nVous pouvez modifier ce texte en ajoutant votre propre message.',
        author: 'John',
        date: '2026-03-04 14:30',
        upvotes: 10,
        downvotes: 2,
        comments: [
          {
            id: Date.now() + 1,
            author: 'Billy',
            content: 'Super idée !',
            date: '2026-03-04 15:00',
          },
        ],
      },
    ];
  });

  // Utilisateur courant simulé. Dans un vrai Reddit on aurait un système
  // d'authentification ; ici on fixe simplement un pseudo pour pouvoir comparer
  // l'auteur d'un post avec le pseudo courant lorsque l'on veut afficher un
  // bouton de suppression par exemple
  const currentUser = 'John';

  // À chaque fois que la liste des posts est modifiée, on la sauvegarde dans
  // localStorage pour persister l'état
  useEffect(() => {
    try {
      localStorage.setItem('reddit_posts', JSON.stringify(posts));
    } catch (e) {
      console.error('Erreur lors de la sauvegarde des posts dans localStorage', e);
    }
  }, [posts]);

  /**
   * Ajoute un nouveau post en début de liste. Le titre est obligatoire 
   * si l'auteur est vide, on utilise "Anonyme". On génère un identifiant unique
   * grâce à Date.now() et on initialise le tableau de commentaires à vide
   */
  const handleAddPost = (title, content, author) => {
    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      author: author?.trim() || 'Anonyme',
      date: new Date().toLocaleString(),
      upvotes: 0,
      downvotes: 0,
      comments: [],
    };
    // On place le nouveau post en tête de liste afin qu'il apparaisse en haut de l'interface
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  /**
   * Incrémente le nombre d'upvotes pour le post identifié par postId
   */
  const handleUpvote = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post
      )
    );
  };

  /**
   * Incrémente le nombre de downvotes pour le post identifié par postId
   */
  const handleDownvote = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, downvotes: post.downvotes + 1 } : post
      )
    );
  };

  /**
   * Ajoute un commentaire à un post donné. La fonction reçoit l'identifiant
   * du post, ainsi que le contenu du commentaire et son auteur. Un nouveau
   * commentaire est créé avec un identifiant unique, puis inséré en fin
   * de tableau des commentaires du post
   */
  const handleAddComment = (postId, author, content) => {
    const newComment = {
      id: Date.now(),
      author: author?.trim() || 'Anonyme',
      content: content.trim(),
      date: new Date().toLocaleString(),
    };
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      )
    );
  };

  /**
   * Supprime un post. Seul l'auteur du post (identifié par currentUser) est
   * autorisé à supprimer son propre contenu. Si l'identifiant ne correspond
   * pas, aucune suppression n'est effectué
   */
  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    // Conteneur principal de l'application. On utilise les classes Tailwind
    // existantes pour adapter le rendu à la charte graphique du projet initial
    <div className="min-h-screen p-8 space-y-8">
      {/* Titre de l'application */}
      <h1 className="font-rpg text-3xl text-yellow-400 text-center">Mini Reddit</h1>

      {/* Formulaire d'ajout de post. La callback handleAddPost est passée en prop */}
      <PostForm onAddPost={handleAddPost} />

      {/* Liste de posts. On transmet également les callbacks pour voter,
          ajouter un commentaire et supprimer un post */}
      <PostList
        posts={posts}
        currentUser={currentUser}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
        onAddComment={handleAddComment}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
}

export default App;