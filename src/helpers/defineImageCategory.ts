import profileIcon from '../images/profileIcon.svg';
import goatEmoji from '../images/goatEmoji.svg';
import dessertEmoji from '../images/dessertEmoji.svg';
import chickenEmoji from '../images/chickenEmoji.svg';
import breakfastEmoji from '../images/breakfastEmoji.svg';
import beefEmoji from '../images/beefEmoji.svg';
import ordinaryEmojiDrink from '../images/ordinaryEmojiDrink.png';
import cocktailEmoji from '../images/cocktailEmoji.png';
import shakeEmoji from '../images/shakeEmoji.png';
import otherEmojiDrink from '../images/otherEmojiDrink.png';
import cocoaEmojiDrink from '../images/cocoaEmojiDrink.png';
import defaultIcon from '../images/defaultIcon.svg';

export const defineImageCategory = (category: string) => {
  switch (category) {
    case 'Goat':
      return goatEmoji;
    case 'Dessert':
      return dessertEmoji;
    case 'Chicken':
      return chickenEmoji;
    case 'Breakfast':
      return breakfastEmoji;
    case 'Beef':
      return beefEmoji;
    case 'Ordinary Drink':
      return ordinaryEmojiDrink;
    case 'Cocktail':
      return cocktailEmoji;
    case 'Shake':
      return shakeEmoji;
    case 'Other / Unknown':
      return otherEmojiDrink;
    case 'Cocoa':
      return cocoaEmojiDrink;
    default:
      return defaultIcon;
  }
};
