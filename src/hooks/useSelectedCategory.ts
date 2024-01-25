import { useEffect, useState } from 'react';

type UseSelectedCategoryProps = {
  isDrink: boolean;
  recipes: any[];
  setRecipes: (recipes: any[]) => void;
};

export const useSelectedCategory = ({
  isDrink,
  recipes,
  setRecipes,
}: UseSelectedCategoryProps) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [originalRecipes, setOriginalRecipes] = useState<any[]>([]);

  useEffect(() => {
    if (selectedCategory === '') return;
    if (isDrink) {
      setOriginalRecipes(recipes);
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`,
      )
        .then((response) => response.json())
        .then((data) => data.drinks.slice(0, 12))
        .then((data) => setRecipes(data));
    } else {
      setOriginalRecipes(recipes);
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`,
      )
        .then((response) => response.json())
        .then((data) => data.meals.slice(0, 12))
        .then((data) => setRecipes(data));
    }
  }, [selectedCategory]);

  const handleClick = (event: any) => {
    const category = event.target.value;
    setSelectedCategory((prevCategory) => (
      prevCategory === category ? handleClearFilter() : category
    ));
  };

  const handleClearFilter = () => {
    setSelectedCategory('');
    setRecipes(originalRecipes);
  };

  return {
    handleClick,
    handleClearFilter,
  };
};
