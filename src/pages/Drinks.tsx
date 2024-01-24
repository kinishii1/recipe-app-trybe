import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <>
      <Header title="Drinks" withSearchIcons />
      <div>Drinks</div>
      <Recipes isDrink />
      <Footer />
    </>
  );
}

export default Drinks;
