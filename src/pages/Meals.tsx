import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <>
      <Recipes isDrink={ false } />
      <Footer />
    </>
  );
}

export default Meals;
