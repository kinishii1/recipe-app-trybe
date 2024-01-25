import { DoneRecipe } from '../../types';

function DoneRecipiesTags({ recipe, index } : { recipe: DoneRecipe, index: number }) {
  return recipe.tags.map((tag) => (
    <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
      {tag}
    </span>
  ));
}

export default DoneRecipiesTags;
