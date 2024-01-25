import { useEffect, useState } from 'react';
import { formatFavorite } from '../helpers/formatFavorite';

export const useFavoriteRecipiesDetails = (recipe: any, isDrink: boolean) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const favoriteRecipes = JSON.parse(
    localStorage.getItem('favoriteRecipes') as string,
  );

  useEffect(() => {
    if (
      favoriteRecipes?.some((favorite: any) => favorite.id === recipe.idMeal)
      || favoriteRecipes?.some((favorite: any) => favorite.id === recipe.idDrink)
    ) setIsFavorite(true);
    else setIsFavorite(false);
  }, [favoriteRecipes]);

  const addFavorite = (newFavorite: any) => {
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
      return;
    }
    const newFavoriteRecipes = [...favoriteRecipes, newFavorite];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };
  const removeFavorite = (newFavorite: any) => {
    const newFavoriteRecipes = favoriteRecipes.filter(
      (favorite: any) => favorite.id !== newFavorite.id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };
  const handleFavoriteClick = () => {
    const newFavorite = formatFavorite(recipe, isDrink);
    if (isFavorite) {
      removeFavorite(newFavorite);
      setIsFavorite(false);
      return;
    }
    addFavorite(newFavorite);
    setIsFavorite(true);
  };

  return { isFavorite, handleFavoriteClick };
};
