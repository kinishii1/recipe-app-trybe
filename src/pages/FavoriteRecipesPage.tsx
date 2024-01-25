import React from 'react';
import Header from '../components/Header';
import FavoriteRecipes from '../components/FavoriteRecipes';

function FavoriteRecipesPage() {
  return (
    <>
      <Header title="Favorite Recipes" withSearchIcons={ false } />
      <div>FavoriteRecipes</div>
      <FavoriteRecipes />
    </>
  );
}

export default FavoriteRecipesPage;
