import { Link } from 'react-router-dom';
import drinkIconFooter from '../../images/drinkIconFooter.png';
import mealIconFooter from '../../images/mealIconFooter.png';
import './styles.css';

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <Link to="/drinks">
        <img src={ drinkIconFooter } alt="drink" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIconFooter } alt="drink" data-testid="meals-bottom-btn" />
      </Link>
    </div>
  );
}

export default Footer;
