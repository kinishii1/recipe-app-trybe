import { DoneRecipeData } from '../../types';

function DoneRecipiesTags({ recipe, index } : { recipe: DoneRecipeData, index: any }) {
  return recipe.tags.map((tag: any) => (
    <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
      {tag}
    </span>
  ));
}

export default DoneRecipiesTags;
