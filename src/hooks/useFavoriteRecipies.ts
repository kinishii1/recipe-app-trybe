import { useState, useEffect } from 'react';

export const useFavoriteRecipies = () => {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any>([]);
  const [favoriteSorted, setFavoriteSorted] = useState<any>([]);

  const handleFilterMeal = () => {
    const filtered = favoriteRecipes.filter(
      (recipe: any) => recipe.type === 'meal',
    );
    setFavoriteRecipes(filtered);
  };

  const handleFilterDrink = () => {
    const filtered = favoriteRecipes.filter(
      (recipe: any) => recipe.type === 'drink',
    );
    setFavoriteRecipes(filtered);
  };

  const handleFilterAll = () => {
    const savedFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') ?? '[]',
    );
    setFavoriteRecipes(savedFavoriteRecipes);
    setFavoriteSorted([]);
  };

  const handleFavoriteClick = (recipeId: any) => {
    const updatedFavorites = favoriteRecipes.filter(
      (recipe: any) => recipe.id !== recipeId,
    );
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const savedFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') ?? '[]',
    );
    setFavoriteRecipes(savedFavoriteRecipes);
  }, []);

  return {
    favoriteRecipes,
    setFavoriteRecipes,
    handleFilterMeal,
    handleFilterDrink,
    handleFilterAll,
    favoriteSorted,
    setFavoriteSorted,
    handleFavoriteClick,
  };
};
