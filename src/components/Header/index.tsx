import { useState } from 'react';
import { Link } from 'react-router-dom';
import profile from '../../images/profileIcon.svg';
import search from '../../images/searchIcon.svg';
import SearchBar from './SearchBar';
import { HeaderProps } from '../../types';
import logoAppSM from '../../images/logoAppSM.svg';
import logoAppSM2 from '../../images/logoAppSM2.svg';
import drinkIcon from '../../images/drinkIcon.svg';
import mealIcon from '../../images/mealIcon.svg';

function Header({ title, withSearchIcons }: HeaderProps) {
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  return (
    <>
      <div className="header-container">
        <img src={ logoAppSM } alt="" />

        <img src={ logoAppSM2 } alt="" />

        <div className="header-container-btns">
          {withSearchIcons && (
            <button onClick={ () => setShowSearchBar(!showSearchBar) }>
              <img data-testid="search-top-btn" src={ search } alt="search" />
            </button>
          )}

          <Link to="/profile">
            <img data-testid="profile-top-btn" src={ profile } alt="profile" />
          </Link>
        </div>
      </div>
      <div className="title-hero">
        {title === 'Drinks' ? (
          <img src={ drinkIcon } alt="" />
        ) : (
          <img src={ mealIcon } alt="" />
        )}
        <h1 data-testid="page-title">
          {title}
        </h1>
      </div>
      {showSearchBar && <SearchBar isDrink={ title === 'Drinks' } />}
    </>
  );
}

export default Header;
