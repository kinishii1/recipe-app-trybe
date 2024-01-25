import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { DoneRecipeData } from '../../types';

type Props = {
  recipe: DoneRecipeData | any;
  index: number;
  handleFavoriteClick: any;
  favoriteRecipes: any;
};

function FavoriteRecipesLikeBtn({
  recipe,
  index,
  handleFavoriteClick,
  favoriteRecipes,
}: Props) {
  const isFavorite = favoriteRecipes?.some(
    (favorite: any) => favorite.id === recipe.id,
  );
  return (
    <button
      type="button"
      className="horizontal-favorite-btn"
      onClick={ () => handleFavoriteClick(recipe.id) }
    >
      {isFavorite ? (
        <img
          src={ blackHeartIcon }
          alt="favorite"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      ) : (
        <img
          src={ whiteHeartIcon }
          alt="favorite"
          data-testid={ `${index}-horizontal-favorite-btn` }
        />
      )}
    </button>
  );
}

export default FavoriteRecipesLikeBtn;
