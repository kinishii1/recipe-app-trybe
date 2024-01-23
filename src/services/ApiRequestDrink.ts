const apiRequestDrink = async (param: string, value: string) => {
  if (param === 'ingredient') {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`,
    );
    const data = await response.json();
    return data;
  } if (param === 'name') {
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${value}`,
    );
    const data = await response.json();
    console.log(data);
    return data;
  }
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${value}`,
  );
  const data = await response.json();
  return data;
};

export default apiRequestDrink;
