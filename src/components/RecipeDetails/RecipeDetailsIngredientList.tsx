type Props = {
  ingredients: string[];
  measures: string[];
  recipe: any;
};

function RecipeDetailsIngredientList({ ingredients, measures, recipe } : Props) {
  return (
    <ol>
      {ingredients.map((ingredient, index) => (
        <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
          {`${recipe[ingredient]} - ${recipe[measures[index]]}`}
        </li>
      ))}
    </ol>
  );
}

export default RecipeDetailsIngredientList;
