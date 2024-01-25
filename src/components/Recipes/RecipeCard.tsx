import { Link } from 'react-router-dom';

function RecipeCard({ recipe, index }: { recipe: any; index: number }) {
  const type = recipe.idMeal ? 'meals' : 'drinks';
  return (
    <div data-testid={ `${index}-recipe-card` } key={ recipe.idMeal || recipe.idDrink }>
      <Link to={ `/${type}/${recipe.idMeal || recipe.idDrink}` }>
        <img
          data-testid={ `${index}-card-img` }
          src={ recipe.strMealThumb || recipe.strDrinkThumb }
          alt={ recipe.strMeal || recipe.strDrink }
        />
        <h1 data-testid={ `${index}-card-name` }>{recipe.strMeal || recipe.strDrink }</h1>
      </Link>
    </div>
  );
}

export default RecipeCard;
