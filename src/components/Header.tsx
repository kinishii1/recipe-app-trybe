import { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../images/profileIcon.svg';
import search from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header({
  title,
  withSearchIcons,
}: {
  title: string;
  withSearchIcons: boolean;
}) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  return (
    <div>
      <Link to="/profile">
        <img data-testid="profile-top-btn" src={ profile } alt="profile" />
      </Link>

      {withSearchIcons && (
        <button onClick={ () => setShowSearchBar(!showSearchBar) }>
          <img data-testid="search-top-btn" src={ search } alt="search" />
        </button>
      )}

      {showSearchBar && (
        <SearchBar isDrink={ title === 'Drinks' } />
      )}
      <h1 data-testid="page-title">{title}</h1>
    </div>
  );
}

export default Header;
