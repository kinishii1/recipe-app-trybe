import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

function LayoutHeaderWithtIcons() {
  return (
    <div>
      <Header title="Done Recipes" withSearchIcons />
      <Outlet />
    </div>
  );
}

export default LayoutHeaderWithtIcons;
