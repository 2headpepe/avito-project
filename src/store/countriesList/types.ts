export type TCountry = {
  name: string;
  slug: string;
};

export type TState = {
  data: TCountry[];
  status: string;
  error: string | null;
};
