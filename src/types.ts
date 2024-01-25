export type HeaderProps = {
  title: string;
  withSearchIcons: boolean;
};

export type InputProps = {
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId?: string;
  value?: string;
  id?: string;
  labelText?: string;
  name?: string;
};

export type DoneRecipe = {
  id: string;
  type: string;
  area: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
  doneDate: string;
  tags: string[];
  nationality: string;
};

export type Favorite = {
  id: string;
  type: string;
  nationality: string;
  category: string;
  alcoholicOrNot: string;
  name: string;
  image: string;
};
