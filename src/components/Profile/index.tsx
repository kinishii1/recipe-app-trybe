import { useNavigate } from 'react-router-dom';
import './styles.css';
import doneIcon from '../../images/doneIcon.png';
import favoriteIcon from '../../images/favoriteIcon.svg';
import logoutIcon from '../../images/logoutIcon.png';

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const { email } = user;

  const handleClick = ({ target }: any) => {
    const { name } = target;
    if (name === 'done-recipes') {
      navigate('/done-recipes');
    }
    if (name === 'favorite-recipes') {
      navigate('/favorite-recipes');
    }
    if (name === 'logout') {
      localStorage.clear();
      navigate('/');
    }
  };
  return (
    <div className="profile-container">
      <h3 data-testid="profile-email">{email}</h3>

      <div className="profile-container-btns">
        <button
          name="done-recipes"
          data-testid="profile-done-btn"
          onClick={ handleClick }
        >
          <img src={ doneIcon } alt="" />
          Done Recipes
        </button>
        <button
          name="favorite-recipes"
          data-testid="profile-favorite-btn"
          onClick={ handleClick }
        >
          <img src={ favoriteIcon } alt="" />
          Favorite Recipes
        </button>
        <button
          name="logout"
          data-testid="profile-logout-btn"
          onClick={ handleClick }
        >
          <img src={ logoutIcon } alt="" />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
