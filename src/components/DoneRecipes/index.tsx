import { Link } from 'react-router-dom';
import { useShare } from '../../hooks/useShare';
import { useDoneRecipes } from '../../hooks/useDoneRecipies';
import shareIcon from '../../images/shareIcon.svg';
import './styles.css';
import DoneRecipiesBtns from './DoneRecipiesBtns';
import DoneRecipiesTags from './DoneRecipiesTags';
import doneRecipesIcon from '../../images/doneRecipesIcon.png';
import { DoneRecipe } from '../../types';

function DoneRecipes() {
  const { handleShareClick, copyStatus } = useShare();
  const {
    doneRecipes,
    handleFilterMeal,
    handleFilterDrink,
    handleFilterAll } = useDoneRecipes();
  return (
    <div>
      <div className="done-recipes-container">
        <DoneRecipiesBtns
          handleFilterAll={ handleFilterAll }
          handleFilterMeal={ handleFilterMeal }
          handleFilterDrink={ handleFilterDrink }
        />
        {doneRecipes.map((recipe: DoneRecipe, index: any) => (
          <div className="recipe-card" key={ recipe.id }>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <img
                className="horizontal-image"
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.nationality} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </h3>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </Link>
            <h4 data-testid={ `${index}-horizontal-done-date` }>
              {`Done Date: ${recipe.doneDate}`}
            </h4>
            <div className="tags-container">
              <DoneRecipiesTags recipe={ recipe } index={ index } />
            </div>
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
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
