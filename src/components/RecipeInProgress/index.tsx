import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import '../RecipeDetails/styles.css';
import { useEffect, useState } from 'react';
import shareIcon from '../../images/shareIcon.svg';
import { useShare } from '../../hooks/useShare';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { formatIngredientsAndMeasures } from '../../helpers/formatIngredientsAndMesures';
import { useFavoriteRecipiesDetails } from '../../hooks/useFavoriteRecipiesDetails';
import { formatDoneRecipe } from '../../helpers/formatDoneRecipe';
import { useCheckedStatus } from '../../hooks/useCheckedStatus';
import IngredientItem from './IngredientItem';
import { defineImageCategory } from '../../helpers/defineImageCategory';
import { formatUrl } from '../../helpers/formatUrl';

function RecipeInProgress({ isDrink }: { isDrink: boolean }) {
  const [recipe, setRecipe] = useState<any>({});
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { handleShareClick, copyStatus } = useShare();
  const { ingredients, measures } = formatIngredientsAndMeasures(recipe);
  const { isFavorite, handleFavoriteClick } = useFavoriteRecipiesDetails(recipe, isDrink);
  const { checked, allChecked, handleChecked } = useCheckedStatus(ingredients);
  const url = recipe?.strYoutube;
  const newUrl = formatUrl(url);

  const handleFinishClick = () => {
    let prevVal = JSON.parse(localStorage.getItem('doneRecipes') as any);
    if (!Array.isArray(prevVal)) {
      prevVal = [];
    }
    const newDoneRecipe = formatDoneRecipe(recipe, isDrink);
    const newDoneRecipes = [...prevVal, newDoneRecipe];
    localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    navigate('/done-recipes');
  };

  useEffect(() => {
    if (isDrink) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setRecipe(data.drinks[0]))
        .catch((error) => console.log(error));
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.meals[0]))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="recipe-details-container">
      <img
        src={ recipe?.strMealThumb || recipe?.strDrinkThumb }
        alt={ recipe?.strMeal || recipe?.strDrink }
        data-testid="recipe-photo"
        className="recipe-photo"
      />
      <div className="recipe-details-header">
        <div className="header-container-control">
          <div className="recipe-details-header_info">
            <p data-testid="recipe-category">
              {recipe.strAlcoholic || recipe.strCategory}
            </p>
            <img
              className="category-icon"
              src={ defineImageCategory(recipe.strCategory) }
              alt=""
            />
          </div>
          <div className="recipe-details-header_btns">
            <button
              type="button"
              data-testid="share-btn"
              onClick={ handleShareClick }
            >
              {copyStatus !== '' ? (
                <p>{copyStatus}</p>
              ) : (
                <img src={ shareIcon } alt="share" />
              )}
            </button>
            <button type="button" onClick={ handleFavoriteClick }>
              {isFavorite ? (
                <img
                  src={ blackHeartIcon }
                  alt="share"
                  data-testid="favorite-btn"
                />
              ) : (
                <img
                  src={ whiteHeartIcon }
                  alt="share"
                  data-testid="favorite-btn"
                />
              )}
            </button>
          </div>
        </div>
        <h1 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h1>
      </div>
      <div>
        <h1>Ingredients</h1>
        <div className="ingredients-list" data-testid="ingredient-card">
          {ingredients.map((ingredient, index) => (
            <IngredientItem
              key={ index }
              recipe={ recipe }
              ingredient={ ingredient }
              measures={ measures }
              index={ index }
              checked={ checked }
              handleChecked={ handleChecked }
            />
          ))}
        </div>
      </div>
      <h1>Instructions</h1>
      <p className="instructions" data-testid="instructions">{recipe?.strInstructions}</p>
      {newUrl !== '' && (
        <>
          <h1
            style={ {
              margin: '10px 0 20px 0',
            } }
          >
            Video
          </h1>
          <iframe
            width="360"
            height="215"
            src={ newUrl }
            title="YouTube video player"
            allowFullScreen
            data-testid="video"
          />
        </>
      )}

      <button
        disabled={ !allChecked }
        className="start-recipe-btn"
        data-testid="finish-recipe-btn"
        onClick={ handleFinishClick }
      >
        Finish Recipe
      </button>
    </div>
  );
}

export default RecipeInProgress;
