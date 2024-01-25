import profileIcon from '../../images/profileIcon.svg';
import goatEmoji from '../../images/goatEmoji.svg';
import dessertEmoji from '../../images/dessertEmoji.svg';
import chickenEmoji from '../../images/chickenEmoji.svg';
import breakfastEmoji from '../../images/breakfastEmoji.svg';
import beefEmoji from '../../images/beefEmoji.svg';

type CategoryBtnProps = {
  category: any;
  index: number;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const defineImageCategory = (category: string) => {
  switch (category) {
    case 'Goat':
      return goatEmoji;
    case 'Dessert':
      return dessertEmoji;
    case 'Chicken':
      return chickenEmoji;
    case 'Breakfast':
      return breakfastEmoji;
    case 'Beef':
      return beefEmoji;
    default:
      return profileIcon;
  }
};

function CategoryBtn({ category, index, handleClick } : CategoryBtnProps) {
  return (
    <button
      key={ index }
      type="button"
      value={ category.strCategory }
      data-testid={ `${category.strCategory}-category-filter` }
      onClick={ handleClick }
    >
      <img src={ defineImageCategory(category.strCategory) } alt="" />
      {category.strCategory}
    </button>
  );
}

export default CategoryBtn;
