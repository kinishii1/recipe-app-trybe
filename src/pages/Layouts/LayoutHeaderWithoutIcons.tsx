import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';

function LayoutHeaderWithoutIcons() {
  return (
    <div>
      <Header title="Done Recipes" withSearchIcons={ false } />
      <Outlet />
    </div>
  );
}

export default LayoutHeaderWithoutIcons;
