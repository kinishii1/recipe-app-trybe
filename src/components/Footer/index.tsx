import { Link } from 'react-router-dom';
import drinkEmojiFooter from '../../images/drinkEmojiFooter.png';
import mealEmojiFooter from '../../images/mealEmojiFooter.png';
import './styles.css';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkEmojiFooter } alt="drink" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealEmojiFooter } alt="drink" data-testid="meals-bottom-btn" />
      </Link>
    </div>
  );
}

export default Footer;
