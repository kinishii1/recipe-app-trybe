import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCategory } from '../../hooks/useCategory';
import { useRecipe } from '../../hooks/useRecipe';

function Recipes({ isDrink }: { isDrink: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [originalRecipes, setOriginalRecipes] = useState<any[]>([]);
  const { recipes, setRecipes } = useRecipe(isDrink);
  const categories = useCategory(isDrink);

  const handleClick = (event: any) => {
    const category = event.target.value;
    setSelectedCategory((prevCategory) => (prevCategory === category
      ? handleClearFilter() : category));
  };

  const handleClearFilter = () => {
    setSelectedCategory('');
    setRecipes(originalRecipes);
  };

  useEffect(() => {
    if (selectedCategory === '') return;
    if (isDrink) {
      setOriginalRecipes(recipes);
      fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`,
      )
        .then((response) => response.json())
        .then((data) => data.drinks.slice(0, 12))
        .then((data) => setRecipes(data));
    } else {
      setOriginalRecipes(recipes);
      fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`,
      )
        .then((response) => response.json())
        .then((data) => data.meals.slice(0, 12))
        .then((data) => setRecipes(data));
    }
  }, [selectedCategory]);

  console.log(categories);
  if (isDrink) {
    return (
      <div>
        {categories.map((category, index) => (
          <button
            key={ index }
            type="button"
            value={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
            onClick={ handleClick }
          >
            {category.strCategory}
          </button>
        ))}
        <button data-testid="All-category-filter" onClick={ handleClearFilter }>
          All
        </button>
        {recipes.map((recipe, index) => (
          <div data-testid={ `${index}-recipe-card` } key={ recipe.idDrink }>
            <Link to={ `/drinks/${recipe.idDrink}` }>
              <h1 data-testid={ `${index}-card-name` }>{recipe.strDrink}</h1>
              <img
                data-testid={ `${index}-card-img` }
                src={ recipe.strDrinkThumb }
                alt={ recipe.strDrink }
              />
            </Link>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      {categories.map((category, index) => (
        <button
          key={ index }
          type="button"
          value={ category.strCategory }
          data-testid={ `${category.strCategory}-category-filter` }
          onClick={ handleClick }
        >
          {category.strCategory}
        </button>
      ))}
      <button data-testid="All-category-filter" onClick={ handleClearFilter }>
        All
      </button>
      {recipes.map((recipe, index) => (
        <div data-testid={ `${index}-recipe-card` } key={ recipe.idMeal }>
          <Link to={ `/meals/${recipe.idMeal}` }>
            <h1 data-testid={ `${index}-card-name` }>{recipe.strMeal}</h1>
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strMealThumb }
              alt={ recipe.strMeal }
            />
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Recipes;
