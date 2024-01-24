import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './styles.css';
import shareIcon from '../../images/shareIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import { formatFavorite } from '../../helpers/formatFavorite';
import { useShare } from '../../hooks/useShare';

function RecipeDetails({ isDrink }: { isDrink: boolean }) {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>({});
  const [recomendations, setRecomendations] = useState<any>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { handleShareClick, copyStatus } = useShare();
  const navigate = useNavigate();

  const inProgressRecipes = JSON.parse(
    localStorage.getItem('inProgressRecipes') as string,
  );
  const favoriteRecipes = JSON.parse(
    localStorage.getItem('favoriteRecipes') as string,
  );
  const addFavorite = (newFavorite: any) => {
    if (!favoriteRecipes) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavorite]));
      return;
    }
    const newFavoriteRecipes = [...favoriteRecipes, newFavorite];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };
  const removeFavorite = (newFavorite: any) => {
    const newFavoriteRecipes = favoriteRecipes.filter(
      (favorite: any) => favorite.id !== newFavorite.id,
    );
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
  };
  const handleFavoriteClick = () => {
    const newFavorite = formatFavorite(recipe, isDrink);
    if (isFavorite) {
      removeFavorite(newFavorite);
      setIsFavorite(false);
      return;
    }
    addFavorite(newFavorite);
    setIsFavorite(true);
  };
  useEffect(() => {
    if (
      favoriteRecipes?.some((favorite: any) => favorite.id === recipe.idMeal)
      || favoriteRecipes?.some((favorite: any) => favorite.id === recipe.idDrink)
    ) setIsFavorite(true);
    else setIsFavorite(false);
  }, [favoriteRecipes]);
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
  const ingredients = Object.keys(recipe)
    .filter((key) => key.includes('strIngredient'))
    .filter((key) => recipe[key] !== null && recipe[key] !== '');
  const measures = Object.keys(recipe)
    .filter((key) => key.includes('strMeasure'))
    .filter((key) => recipe[key] !== null && recipe[key] !== '');
  const url = recipe?.strYoutube;
  const newUrl = url?.replace('watch?v=', 'embed/');
  const handleClick = () => {
    if (isDrink) {
      navigate(`/drinks/${id}/in-progress`);
    } else {
      navigate(`/meals/${id}/in-progress`);
    }
  };
  if (isDrink) {
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
        <img src={ recipe.strDrinkThumb } alt="" data-testid="recipe-photo" />
        <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
        <p data-testid="recipe-category">{recipe.strAlcoholic}</p>
        <ol>
          {ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              {`${recipe[ingredient]} - ${recipe[measures[index]]}`}
            </li>
          ))}
        </ol>
        <p data-testid="instructions">{recipe.strInstructions}</p>
        <iframe
          width="560"
          height="315"
          src={ newUrl }
          title="YouTube video player"
          allow="
        accelerometer;
        autoplay;
        clipboard-write;
        encrypted-media;
        gyroscope;
        picture-in-picture"
          allowFullScreen
          data-testid="video"
        />
        <div className="carousel-container">
          {recomendations.map((recomendation: any, index: number) => (
            <div data-testid={ `${index}-recommendation-card` } key={ index }>
              <img
                src={ recomendation.strMealThumb }
                alt={ recomendation.strMeal }
              />
              <p data-testid={ `${index}-recommendation-title` }>
                {recomendation.strMeal}
              </p>
            </div>
          ))}
        </div>
        <button
          className="start-recipe-btn"
          data-testid="start-recipe-btn"
          onClick={ handleClick }
        >
          {inProgressRecipes && inProgressRecipes?.drinks[id as string]
            ? 'Continue Recipe'
            : 'Start Recipe'}
        </button>
      </div>
    );
  }
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
      <img src={ recipe.strMealThumb } alt="" data-testid="recipe-photo" />
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <p data-testid="recipe-category">{recipe.strCategory}</p>
      <ol>
        {ingredients.map((ingredient, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${recipe[ingredient]} - ${recipe[measures[index]]}`}
          </li>
        ))}
      </ol>
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <iframe
        width="560"
        height="315"
        src={ newUrl }
        title="YouTube video player"
        allowFullScreen
        data-testid="video"
      />
      <div className="carousel-container">
        {recomendations.map((recomendation: any, index: number) => (
          <div data-testid={ `${index}-recommendation-card` } key={ index }>
            <img
              src={ recomendation.strDrinkThumb }
              alt={ recomendation.strDrink }
            />
            <p data-testid={ `${index}-recommendation-title` }>
              {recomendation.strDrink}
            </p>
          </div>
        ))}
      </div>
      <button
        className="start-recipe-btn"
        data-testid="start-recipe-btn"
        onClick={ handleClick }
      >
        {inProgressRecipes && inProgressRecipes?.meals[id as string]
          ? 'Continue Recipe'
          : 'Start Recipe'}
      </button>
    </div>
  );
}
export default RecipeDetails;
