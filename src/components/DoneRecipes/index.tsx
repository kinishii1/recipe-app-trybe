function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') ?? '') || [];
  return (
    <div>
      <div className="done-recipes-btns">
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-meal-btn">
          Meals
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drinks
        </button>
      </div>
      <div className="done-recipes-container">
        {doneRecipes.map((recipe: any, index: any) => (
          <div key={ index }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'meal'
                ? `${recipe.area} - ${recipe.category}`
                : recipe.alcoholicOrNot}
            </p>
            <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            <p data-testid={ `${index}-horizontal-done-date` }>
              {recipe.doneDate}
            </p>
            {
              recipe.tags.map((tag: any) => (
                <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
                  {tag}
                </span>
              ))
            }
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              className="horizontal-share-btn"
            >
              Share
            </button>
            <button
              type="button"
              className="horizontal-favorite-btn"
              data-testid={ `${index}-horizontal-favorite-btn` }
            >
              Favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoneRecipes;
