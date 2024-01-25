import { useNavigate } from 'react-router-dom';

function Profile() {
  const navigate = useNavigate();
  const email = localStorage.getItem('user');

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
    <div>
      <h1>Profile</h1>
      <p data-testid="profile-email">{email}</p>
      <button
        name="done-recipes"
        data-testid="profile-done-btn"
        onClick={ handleClick }
      >
        Done Recipes
      </button>
      <button
        name="favorite-recipes"
        data-testid="profile-favorite-btn"
        onClick={ handleClick }
      >
        Favorite Recipes
      </button>
      <button name="logout" data-testid="profile-logout-btn" onClick={ handleClick }>
        Logout
      </button>
    </div>
  );
}

export default Profile;
