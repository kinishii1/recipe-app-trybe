import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { useShare } from '../../hooks/useShare';
import RecipeDetailsIngredientList from './RecipeDetailsIngredientList';
import RecipeDetailsCarrousel from './RecipeDetailsCarrousel';
import { formatUrl } from '../../helpers/formatUrl';
import { formatIngredientsAndMeasures } from '../../helpers/formatIngredientsAndMesures';
import { useFavoriteRecipiesDetails } from '../../hooks/useFavoriteRecipiesDetails';
import { defineImageCategory } from '../../helpers/defineImageCategory';

function RecipeDetails({ isDrink }: { isDrink: boolean }) {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>({});
  const [recomendations, setRecomendations] = useState<any>([]);
  const { handleShareClick, copyStatus } = useShare();
  const navigate = useNavigate();
  const { ingredients, measures } = formatIngredientsAndMeasures(recipe);
  const url = recipe?.strYoutube;
  const newUrl = formatUrl(url);
  const { isFavorite, handleFavoriteClick } = useFavoriteRecipiesDetails(
    recipe,
    isDrink,
  );
  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes') as string,
  );

  const setButtonText = () => {
    let buttonText = '';
    if (isDrink) {
      buttonText = inProgressRecipes && inProgressRecipes?.drinks[id as string]
        ? 'Continue Recipe'
        : 'Start Recipe';
    } else {
      buttonText = inProgressRecipes && inProgressRecipes?.meals[id as string]
        ? 'Continue Recipe'
        : 'Start Recipe';
    }
    return buttonText;
  };

  useEffect(() => {
    if (isDrink) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setRecipe(data.drinks[0]));
      fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json())
        .then((data) => {
          const first6Recomendations = data.meals.slice(0, 6);
          console.log(first6Recomendations);
          setRecomendations(first6Recomendations);
        });
      return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.meals[0]));
    fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
      .then((response) => response.json())
      .then((data) => {
        const first6Recomendations = data.drinks.slice(0, 6);
        console.log(first6Recomendations);
        setRecomendations(first6Recomendations);
      });
  }, []);

  const handleClick = () => {
    if (isDrink) {
      navigate(`/drinks/${id}/in-progress`);
    } else {
      navigate(`/meals/${id}/in-progress`);
    }
  };

  return (
    <div className="recipe-details-container">
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt=""
        className="recipe-photo"
        data-testid="recipe-photo"
      />
      <div className="recipe-details-header">
        <div className="header-container-control">
          <div className="recipe-details-header_info">
            <p data-testid="recipe-category">
              {recipe.strAlcoholic || recipe.strCategory}
            </p>
            <img src={ defineImageCategory(recipe.strCategory) } alt="" />
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
      <h1>Ingredients</h1>
      <RecipeDetailsIngredientList
        ingredients={ ingredients }
        measures={ measures }
        recipe={ recipe }
      />
      <h1>Instructions</h1>
      <p data-testid="instructions" className="instructions">{recipe.strInstructions}</p>

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
      <h1
        style={ {
          marginTop: '20px',
        } }
      >
        Recommendations
      </h1>
      <RecipeDetailsCarrousel recomendations={ recomendations } />
      <button
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        {setButtonText()}
      </button>
    </div>
  );
}
export default RecipeDetails;
