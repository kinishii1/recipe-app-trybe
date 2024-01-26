import { useEffect } from 'react';
import RecipeDetails from '../components/RecipeDetails';

function MealDetails() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <RecipeDetails isDrink={ false } />;
}

export default MealDetails;
