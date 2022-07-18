export type IFormLogin = {
  email: string;
  password: string;
};

export interface IFormUseCase {
  authenticate: (credentials: IFormLogin) => Promise<void>;
  logout: () => void;
}
