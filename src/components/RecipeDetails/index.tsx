import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './styles.css';

function RecipeDetails({ isDrink }: { isDrink: boolean }) {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>({});
  const [recomendations, setRecomendations] = useState<any>([]);

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

  if (isDrink) {
    return (
      <div>
        <h1>Recipe Details</h1>
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
            <div
              data-testid={ `${index}-recommendation-card` }
              key={ index }
            >
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
      </div>
    );
  }

  return (
    <div>
      <h1>Recipe Details</h1>
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
          <div
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
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
    </div>
  );
}

export default RecipeDetails;
