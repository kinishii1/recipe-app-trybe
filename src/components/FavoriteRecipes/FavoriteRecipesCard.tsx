import { Link } from 'react-router-dom';
import FavoriteRecipesLikeBtn from './FavoriteRecipesLikeBtn';
import shareIcon from '../../images/shareIcon.svg';
import { useShare } from '../../hooks/useShare';
import { Favorite } from '../../types';

type Props = {
  recipe: any;
  index: number;
  handleFavoriteClick: any;
  favoriteRecipes: Favorite;
};

function FavoriteRecipesCard({
  favoriteRecipes,
  recipe,
  index,
  handleFavoriteClick,
}: Props) {
  const { handleShareClick, copyStatus } = useShare();
  return (
    <div className="recipe-card" key={ recipe.id }>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <img
          className="horizontal-image"
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
        />
      </Link>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {recipe.type === 'meal'
          ? `${recipe.nationality} - ${recipe.category}`
          : recipe.alcoholicOrNot}
      </p>
      <Link to={ `/${recipe.type}s/${recipe.id}` }>
        <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
      </Link>
      <button
        type="button"
        className="horizontal-share-btn"
        onClick={ () => handleShareClick(recipe.id, recipe.type === 'drink') }
      >
        {copyStatus !== '' ? (
          <p>{copyStatus}</p>
        ) : (
          <img
            data-testid={ `${index}-horizontal-share-btn` }
            src={ shareIcon }
            alt="share"
          />
        )}
      </button>
      <FavoriteRecipesLikeBtn
        favoriteRecipes={ favoriteRecipes }
        recipe={ recipe }
        index={ index }
        handleFavoriteClick={ handleFavoriteClick }
      />
    </div>
  );
}

export default FavoriteRecipesCard;
