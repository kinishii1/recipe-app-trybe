import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function RecipeDetails({ isDrink }: { isDrink: boolean }) {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<any>({});

  useEffect(() => {
    if (isDrink) {
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then((response) => response.json())
        .then((data) => setRecipe(data.drinks[0]));
      return;
    }
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => setRecipe(data.meals[0]));
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
    </div>
  );
}

export default RecipeDetails;
