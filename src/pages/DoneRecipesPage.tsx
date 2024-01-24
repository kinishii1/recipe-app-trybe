import DoneRecipes from '../components/DoneRecipes';
import Header from '../components/Header';

function DoneRecipesPage() {
  return (
    <>
      <Header title="Done Recipes" withSearchIcons={ false } />
      <div>DoneRecipes</div>
      <DoneRecipes />
    </>
  );
}

export default DoneRecipesPage;
