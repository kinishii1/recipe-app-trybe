import { useState, useEffect } from 'react';

export const useCategory = (isDrink: boolean) => {
  const [categories, setCategories] = useState<any[]>([]);

  const endpoint = isDrink
    ? 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

  const param = isDrink ? 'drinks' : 'meals';

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(endpoint);
      const data = await response.json();
      const first5Categories = data[param].slice(0, 5);
      setCategories(first5Categories);
    };
    fetchCategories();
  }, []);

  return categories;
};
