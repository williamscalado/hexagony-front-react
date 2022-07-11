import { IFormLogin, IFormUseCase } from '../domain';
import { ApiAuth } from "../../../adapters/http/axios";
import { setAuth, logout as destroy } from '../../../helpers/authentication';

async function authenticate(credentials: IFormLogin): Promise<void> {
  try {
    const result = await ApiAuth.post("auth", credentials);
    setAuth(result.data.token);
  } catch (err) {
    throw err
  }
}

function logout(): void {
  destroy();
}

export const FormUseCase: IFormUseCase = {
  authenticate,
  logout
}