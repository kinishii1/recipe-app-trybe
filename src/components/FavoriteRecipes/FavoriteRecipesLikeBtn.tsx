import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { DoneRecipeData } from '../../types';

type Props = {
  recipe: DoneRecipeData | any;
  index: number;
  handleFavoriteClick: any;
};

function FavoriteRecipesLikeBtn({ recipe, index, handleFavoriteClick } : Props) {
  return (
    <button
      type="button"
      className="horizontal-favorite-btn"
      onClick={ () => handleFavoriteClick(recipe.id) }
    >
      {recipe.some(
        (favorite: any) => favorite.id === recipe.id,
      ) ? (
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
