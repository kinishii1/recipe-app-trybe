import { useState, useEffect } from 'react';

export const useDoneRecipes = () => {
  const [doneRecipes, setDoneRecipes] = useState([]);
  useEffect(() => {
    const savedDoneRecipes = JSON.parse(
      localStorage.getItem('doneRecipes') ?? '[]',
    );
    setDoneRecipes(savedDoneRecipes);
  }, []);

  const handleFilterMeal = () => {
    const filtered = doneRecipes.filter(
      (recipe: any) => recipe.type === 'meal',
    );
    setDoneRecipes(filtered);
  };

  const handleFilterDrink = () => {
    const filtered = doneRecipes.filter(
      (recipe: any) => recipe.type === 'drink',
    );
    setDoneRecipes(filtered);
  };

  const handleFilterAll = () => {
    const savedDoneRecipes = JSON.parse(
      localStorage.getItem('doneRecipes') ?? '[]',
    );
    setDoneRecipes(savedDoneRecipes);
  };

  return {
    doneRecipes,
    handleFilterMeal,
    handleFilterDrink,
    handleFilterAll,
  };
};
