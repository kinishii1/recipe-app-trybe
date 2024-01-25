import profileIcon from '../../images/profileIcon.svg';

type CategoryBtnProps = {
  category: any;
  index: number;
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
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
      <img src={ profileIcon } alt="" />
      {category.strCategory}
    </button>
  );
}

export default CategoryBtn;
