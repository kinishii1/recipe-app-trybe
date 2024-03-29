const apiRequestDrink = async (param: string, value: string) => {
  if (param === 'ingredient') {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${value}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return { drinks: null };
    }
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
  console.log(response);
  const data = await response.json();
  console.log(data);
  return data;
};

export default apiRequestDrink;
