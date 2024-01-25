type Props = {
  handleFilterAll: () => void;
  handleFilterMeal: () => void;
  handleFilterDrink: () => void;
};

function DoneRecipiesBtns({
  handleFilterAll,
  handleFilterMeal,
  handleFilterDrink,
}: Props) {
  return (
    <div className="done-recipes-btns">
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

export default DoneRecipiesBtns;
