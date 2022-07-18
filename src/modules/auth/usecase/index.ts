import { HttpAdapter } from '../../../adapters/http/axios/index'
import { logout as destroy, setAuth } from '../../../helpers/authentication'
import { IFormLogin, IFormUseCase } from '../domain'

async function authenticate(credentials: IFormLogin): Promise<void> {
  try {
    const result = await HttpAdapter.fetch({
      method: 'POST',
      url: '/auth',
      data: credentials,
    })
    setAuth(result.token)
  } catch (err) {
    throw err
  }
}

function logout(): void {
  destroy()
}

export const FormUseCase: IFormUseCase = {
  authenticate,
  logout,
}
