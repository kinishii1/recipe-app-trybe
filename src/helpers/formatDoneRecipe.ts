export const formatDoneRecipe = (recipe: any, isDrink: boolean) => {
  const newDoneRecipe = {
    id: recipe.idMeal || recipe.idDrink,
    type: isDrink ? 'drink' : 'meal',
    nationality: recipe.strArea || '',
    category: recipe.strCategory || '',
    alcoholicOrNot: recipe.strAlcoholic || '',
    name: recipe.strMeal || recipe.strDrink,
    image: recipe.strMealThumb || recipe.strDrinkThumb,
    doneDate: new Date().toISOString(),
    tags: recipe.strTags ? recipe.strTags.split(',') : [],
  };
  return newDoneRecipe;
};
