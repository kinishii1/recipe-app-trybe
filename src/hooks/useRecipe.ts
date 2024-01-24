import { useState, useEffect } from 'react';

export const useRecipe = (isDrink: boolean) => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const endpoint = isDrink
    ? 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
    : 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

  const param = isDrink ? 'drinks' : 'meals';

  useEffect(() => {
    const fetchRecipes = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const first12Recipes = data[param].slice(0, 12);
      setRecipes(first12Recipes);
    };
    fetchRecipes();
  }, []);

  return { recipes, setRecipes };
};
