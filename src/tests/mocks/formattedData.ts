const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
const mockDoneDrink = {
  id: '15997',
  type: 'drink',
  area: '',
  category: 'Ordinary Drink',
  alcoholicOrNot: 'Optional alcohol',
  name: 'GG',
  image:
    'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  doneDate: '23/06/2021',
  tags: [],
};
const mockDoneMeal = {
  id: '52977',
  type: 'meal',
  area: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image:
    'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  doneDate: '23/06/2021',
  tags: ['Pasta', 'Curry'],
};
const inProgressRecipes = {
  drinks: {
    15997: ['Gin', 'Lemon', 'Ice', 'Mint'],
  },
  meals: {
    52977: ['Penne', 'Tomato', 'Garlic', 'Onion'],
  },
};
export {
  favoriteRecipes,
  mockDoneDrink,
  mockDoneMeal,
  inProgressRecipes,
};
