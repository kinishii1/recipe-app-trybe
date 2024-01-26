import { useCategory } from '../../hooks/useCategory';
import { useRecipe } from '../../hooks/useRecipe';
import CategoryBtn from './CategoryBtn';
import RecipeCard from './RecipeCard';
import './styles.css';
import { useSelectedCategory } from '../../hooks/useSelectedCategory';
import allEmoji from '../../images/allEmoji.svg';
import allEmojiDrink from '../../images/allEmojiDrink.png';

function Recipes({ isDrink }: { isDrink: boolean }) {
  const { recipes, setRecipes } = useRecipe(isDrink);
  const categories = useCategory(isDrink);
  const { handleClick, handleClearFilter } = useSelectedCategory({
    isDrink,
    recipes,
    setRecipes,
  });
  console.log(categories);
  return (
    <div className="recipes-container">
      <div className="recipes-category-container">
        <button data-testid="All-category-filter" onClick={ handleClearFilter }>
          <img src={ isDrink ? allEmojiDrink : allEmoji } alt="" />
          All
        </button>
        {categories?.map((category, index) => (
          <CategoryBtn
            key={ index }
            category={ category }
            index={ index }
            handleClick={ handleClick }
          />
        ))}
      </div>
      <div className="recipe-list">
        {recipes?.map((recipe, index) => (
          <RecipeCard recipe={ recipe } index={ index } key={ recipe.id } />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
