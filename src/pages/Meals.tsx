import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Meals() {
  return (
    <>
      <Header title="Meals" withSearchIcons />
      <Recipes isDrink={ false } />
      <Footer />
    </>
  );
}

export default Meals;
