import './styles.css';
import FavoriteRecipesBtns from './FavoriteRecipesBtns';
import FavoriteRecipesCard from './FavoriteRecipesCard';
import { useFavoriteRecipies } from '../../hooks/useFavoriteRecipies';

function FavoriteRecipes() {
  const {
    handleFilterMeal,
    handleFilterDrink,
    handleFilterAll,
    favoriteRecipes,
    favoriteSorted,
    handleFavoriteClick,
  } = useFavoriteRecipies();
  return (
    <div>
      <FavoriteRecipesBtns
        handleFilterMeal={ handleFilterMeal }
        handleFilterDrink={ handleFilterDrink }
        handleFilterAll={ handleFilterAll }
      />
      <div>
        {favoriteSorted.length > 0
          && favoriteRecipes.map((recipe: any, index: any) => (
            <FavoriteRecipesCard
              favoriteRecipes={ favoriteSorted }
              key={ recipe.id }
              recipe={ recipe }
              index={ index }
              handleFavoriteClick={ handleFavoriteClick }
            />
          ))}
        {favoriteSorted.length === 0
          && favoriteRecipes.map((recipe: any, index: any) => (
            <FavoriteRecipesCard
              favoriteRecipes={ favoriteRecipes }
              key={ recipe.id }
              recipe={ recipe }
              index={ index }
              handleFavoriteClick={ handleFavoriteClick }
            />
          ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
