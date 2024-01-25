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
    <div>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilterAll }
      >
        All
      </button>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleFilterMeal }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleFilterDrink }
      >
        Drinks
      </button>
    </div>
  );
}

export default FavoriteRecipesBtns;
