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

  // if (isDrink) {
  //   return (
  //     <div>
  //       <h1>Recipe Details</h1>
  //       <button
  //         className="share-btn"
  //         type="button"
  //         data-testid="share-btn"
  //         onClick={ handleShareClick }
  //       >
  //         {copyStatus !== '' ? (
  //           <p>{copyStatus}</p>
  //         ) : (
  //           <img src={ shareIcon } alt="share" />
  //         )}
  //       </button>
  //       <button
  //         className="favorite-btn"
  //         type="button"
  //         onClick={ handleFavoriteClick }
  //       >
  //         {isFavorite ? (
  //           <img src={ blackHeartIcon } alt="share" data-testid="favorite-btn" />
  //         ) : (
  //           <img src={ whiteHeartIcon } alt="share" data-testid="favorite-btn" />
  //         )}
  //       </button>
  //       <img src={ recipe.strDrinkThumb } alt="" data-testid="recipe-photo" />
  //       <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
  //       <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
  //       <RecipeDetailsIngredientList
  //         ingredients={ ingredients }
  //         measures={ measures }
  //         recipe={ recipe }
  //       />
  //       <p data-testid="instructions">{recipe.strInstructions}</p>
  //       <iframe
  //         width="560"
  //         height="315"
  //         src={ newUrl }
  //         title="YouTube video player"
  //         allow="
  //       accelerometer;
  //       autoplay;
  //       clipboard-write;
  //       encrypted-media;
  //       gyroscope;
  //       picture-in-picture"
  //         allowFullScreen
  //         data-testid="video"
  //       />
  //       <RecipeDetailsCarrousel recomendations={ recomendations } />
  //       <button
  //         className="start-recipe-btn"
  //         data-testid="start-recipe-btn"
  //         onClick={ handleClick }
  //       >
  //         {inProgressRecipes && inProgressRecipes?.drinks[id as string]
  //           ? 'Continue Recipe'
  //           : 'Start Recipe'}
  //       </button>
  //     </div>
  //   );
  // }
  return (
    <div>
      <h1>Recipe Details</h1>
      <button
        className="share-btn"
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
      <button
        className="favorite-btn"
        type="button"
        onClick={ handleFavoriteClick }
      >
        {isFavorite ? (
          <img src={ blackHeartIcon } alt="share" data-testid="favorite-btn" />
        ) : (
          <img src={ whiteHeartIcon } alt="share" data-testid="favorite-btn" />
        )}
      </button>
      <img
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt=""
        data-testid="recipe-photo"
      />
      <h2 data-testid="recipe-title">{recipe.strMeal || recipe.strDrink}</h2>
      <p data-testid="recipe-category">
        {recipe.strAlcoholic || recipe.strCategory}
      </p>
      <RecipeDetailsIngredientList
        ingredients={ ingredients }
        measures={ measures }
        recipe={ recipe }
      />
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <iframe
        width="560"
        height="315"
        src={ newUrl }
        title="YouTube video player"
        allowFullScreen
        data-testid="video"
      />
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
