import { useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';

function DrinkDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <RecipeDetails isDrink />;
}

export default DrinkDetails;
