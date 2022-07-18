import { FormLogin } from './FormLogin'
import './style.scss'

export const PageLogin = () => {
  return (
    <>
      <section className="Container">
        <img src="../../assets/image/logo_hexagony.png" alt="Hexagony" />
        <div className="ContainerForm">
          <FormLogin />
        </div>
      </section>
    </>
  )
}
