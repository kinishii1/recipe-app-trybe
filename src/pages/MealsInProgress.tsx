import { useEffect } from 'react';
import RecipeInProgress from '../components/RecipeInProgress';

function MealsInProgress() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <RecipeInProgress isDrink={ false } />;
}

export default MealsInProgress;
