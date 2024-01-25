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