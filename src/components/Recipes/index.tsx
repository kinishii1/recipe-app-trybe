import { useCategory } from '../../hooks/useCategory';
import { useRecipe } from '../../hooks/useRecipe';
import CategoryBtn from './CategoryBtn';
import RecipeCard from './RecipeCard';
import { useSelectedCategory } from '../../hooks/useSelectedCategory';

function Recipes({ isDrink }: { isDrink: boolean }) {
  const { recipes, setRecipes } = useRecipe(isDrink);
  const categories = useCategory(isDrink);
  const { handleClick,
    handleClearFilter } = useSelectedCategory({ isDrink, recipes, setRecipes });
  console.log(categories);
  return (
    <div>
      {categories.map((category, index) => (
        <CategoryBtn
          key={ index }
          category={ category }
          index={ index }
          handleClick={ handleClick }
        />
      ))}
      <button data-testid="All-category-filter" onClick={ handleClearFilter }>
        All
      </button>
      {recipes.map((recipe, index) => (
        <RecipeCard recipe={ recipe } index={ index } key={ recipe.id } />
      ))}
    </div>
  );
}

export default Recipes;
