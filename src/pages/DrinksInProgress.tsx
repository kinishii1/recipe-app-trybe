import { useEffect } from 'react';
import RecipeInProgress from '../components/RecipeInProgress';

function DrinksInProgress() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <RecipeInProgress isDrink />;
}

export default DrinksInProgress;
