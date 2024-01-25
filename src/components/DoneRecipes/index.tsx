import { Link } from 'react-router-dom';
import { useShare } from '../../hooks/useShare';
import { useDoneRecipes } from '../../hooks/useDoneRecipies';
import shareIcon from '../../images/shareIcon.svg';
import './styles.css';
import DoneRecipiesBtns from './DoneRecipiesBtns';
import DoneRecipiesTags from './DoneRecipiesTags';
import { DoneRecipeData } from '../../types';

function DoneRecipes() {
  const { handleShareClick, copyStatus } = useShare();
  const { doneRecipes,
    handleFilterMeal,
    handleFilterDrink,
    handleFilterAll } = useDoneRecipes();
  return (
    <div>
      <DoneRecipiesBtns
        handleFilterAll={ handleFilterAll }
        handleFilterMeal={ handleFilterMeal }
        handleFilterDrink={ handleFilterDrink }
      />
      <div className="done-recipes-container">
        {doneRecipes.map((recipe: DoneRecipeData, index: any) => (
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
            <p data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </p>
            <DoneRecipiesTags recipe={ recipe } index={ index } />
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
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              Favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
