import mealEmojiFooter from '../../images/mealIconFooter.png';
import drinkEmojiFooter from '../../images/drinkIconFooter.png';
import allEmoji from '../../images/allEmoji.svg';

type Props = {
  handleFilterAll: () => void;
  handleFilterMeal: () => void;
  handleFilterDrink: () => void;
};

function FavoriteRecipesBtns({
  handleFilterAll,
  handleFilterMeal,
  handleFilterDrink,
} : Props) {
  return (
    <div className="done-recipes-btns">
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilterAll }
      >
        <img src={ allEmoji } alt="" />
        <p>All</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleFilterMeal }
      >
        <img src={ mealEmojiFooter } alt="" />
        <p>Meals</p>
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilterDrink }
      >
        <img src={ drinkEmojiFooter } alt="" />
        <p>Drinks</p>
      </button>
    </div>
  );
}

export default FavoriteRecipesBtns;
