export const formatFavorite = (recipe: any, isDrink: boolean): any => {
  const newFavorite = {
    id: recipe.idMeal || recipe.idDrink,
    type: isDrink ? 'drink' : 'meal',
    nationality: recipe.strArea || '',
    category: recipe.strCategory,
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
  };

  return newFavorite;
};
