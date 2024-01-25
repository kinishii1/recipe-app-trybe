import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShare } from '../../hooks/useShare';
import { formatFavorite } from '../../helpers/formatFavorite';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import './styles.css';

function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState<any>([]);
  const [favoriteSorted, setFavoriteSorted] = useState<any>([]);
  const { handleShareClick, copyStatus } = useShare();

  const handleFilterMeal = () => {
    const filtered = favoriteRecipes.filter(
      (recipe: any) => recipe.type === 'meal',
    );
    setFavoriteRecipes(filtered);
  };

  const handleFilterDrink = () => {
    const filtered = favoriteRecipes.filter(
      (recipe: any) => recipe.type === 'drink',
    );
    setFavoriteRecipes(filtered);
  };

  const handleFilterAll = () => {
    const savedFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') ?? '[]',
    );
    setFavoriteRecipes(savedFavoriteRecipes);
    setFavoriteSorted([]);
  };

  useEffect(() => {
    const savedFavoriteRecipes = JSON.parse(
      localStorage.getItem('favoriteRecipes') ?? '[]',
    );
    setFavoriteRecipes(savedFavoriteRecipes);
  }, []);

  const handleFavoriteClick = (recipeId: any) => {
    const updatedFavorites = favoriteRecipes.filter(
      (recipe: any) => recipe.id !== recipeId,
    );
    setFavoriteRecipes(updatedFavorites);
    localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
  };

  return (
    <div>
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleFilterAll }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ handleFilterMeal }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleFilterDrink }
        >
          Drinks
        </button>
      </div>
      <div>
        {favoriteSorted.length > 0
          && favoriteRecipes.map((recipe: any, index: any) => (
            <div key={ recipe.id }>
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
              <button
                type="button"
                className="horizontal-favorite-btn"
                onClick={ () => handleFavoriteClick(recipe.id) }
              >
                {favoriteRecipes.some(
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
            </div>
          ))}
        {favoriteSorted.length === 0
          && favoriteRecipes.map((recipe: any, index: any) => (
            <div key={ recipe.id }>
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
              <button
                type="button"
                className="horizontal-favorite-btn"
                onClick={ () => handleFavoriteClick(recipe.id) }
              >
                {favoriteRecipes.some(
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
            </div>
          ))}
      </div>
    </div>
  );
}

export default FavoriteRecipes;
