type IngredientItemProps = {
  recipe: any;
  ingredient: string;
  measures: string[];
  index: number;
  checked: { [key: string]: boolean };
  handleChecked: (ingredient: string) => void;
};

function IngredientItem({
  recipe,
  ingredient,
  measures,
  index,
  checked,
  handleChecked,
}: IngredientItemProps) {
  return (
    <label
      key={ index }
      data-testid={ `${index}-ingredient-step` }
      htmlFor={ ingredient }
      style={
        ingredient in checked
          ? { textDecoration: 'line-through solid rgb(0, 0, 0)' }
          : {}
      }
    >
      <input
        type="checkbox"
        id={ ingredient }
        checked={ ingredient in checked }
        onChange={ () => handleChecked(ingredient) }
      />
      {`${recipe[ingredient]} - ${recipe[measures[index]]}`}
    </label>
  );
}

export default IngredientItem;
