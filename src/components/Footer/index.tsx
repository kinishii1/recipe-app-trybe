import { Link } from 'react-router-dom';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';
import './styles.css';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIcon } alt="drink" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="drink" data-testid="meals-bottom-btn" />
      </Link>
    </div>
  );
}

export default Footer;
