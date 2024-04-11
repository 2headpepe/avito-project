interface ICountry {
  name: string;
  slug: string;
}

export interface IState {
  data: ICountry[];
  status: string;
  error: string | null;
}

export type ICountryResponse = ICountry[];
