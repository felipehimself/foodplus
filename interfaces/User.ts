export interface IUserData {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean | null;
  image: string;
  role: string | null;
}

export interface IAddress {
  street: string;
  number: number;
  city: string;
  state: string;
}
