import { useEffect, useState } from 'react';

export const useCheckedStatus = (ingredients: any) => {
  const [checked, setChecked] = useState<any>(() => {
    const saved = localStorage.getItem('checkedItems');
    const initialValue = JSON.parse(saved || '{}');
    return initialValue;
  });
  const allChecked = ingredients.every(
    (ingredient: any) => checked[ingredient],
  );

  useEffect(() => {
    localStorage.setItem('checkedItems', JSON.stringify(checked));
  }, [checked]);

  const handleChecked = (ingredient: string) => {
    if (checked[ingredient]) {
      const newChecked = { ...checked };
      delete newChecked[ingredient];
      setChecked(newChecked);
    } else {
      const newChecked = { ...checked, [ingredient]: true };
      setChecked(newChecked);
    }
  };

  return { checked, handleChecked, allChecked };
};
