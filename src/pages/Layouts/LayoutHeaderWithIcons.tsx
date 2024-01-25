import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

function LayoutHeaderWithtIcons() {
  const actualPage = window.location.pathname;
  const title = actualPage === '/meals' ? 'Meals' : 'Drinks';
  return (
    <div>
      <Header title={ title } withSearchIcons />
      <Outlet />
    </div>
  );
}

export default LayoutHeaderWithtIcons;
