import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

function LayoutHeaderWithoutIcons() {
  const determineTitle = () => {
    const actualPage = window.location.pathname;
    switch (actualPage) {
      case '/done-recipes':
        return 'Done Recipes';
      case '/favorite-recipes':
        return 'Favorite Recipes';
      default:
        return 'Profile';
    }
  };
  const title = determineTitle();
  return (
    <div>
      <Header title={ title } withSearchIcons={ false } />
      <Outlet />
    </div>
  );
}

export default LayoutHeaderWithoutIcons;
