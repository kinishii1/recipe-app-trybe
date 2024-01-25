function RecipeDetailsCarrousel({ recomendations }: { recomendations: any }) {
  return (
    <div className="carousel-container">
      {recomendations.map((recomendation: any, index: number) => (
        <div
          className="carousel-card"
          data-testid={ `${index}-recommendation-card` }
          key={ index }
        >
          <img
            src={ recomendation.strMealThumb || recomendation.strDrinkThumb }
            alt={ recomendation.strMeal || recomendation.strDrink }
          />
          <p data-testid={ `${index}-recommendation-title` }>
            {recomendation.strMeal || recomendation.strDrink}
          </p>
        </div>
      ))}
    </div>
  );
}

export default RecipeDetailsCarrousel;
