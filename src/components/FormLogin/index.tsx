import "./style.scss";
export const FormLogin = () => {
	return (
		<div className="ContainerLogin">
			<form action="">
				<label htmlFor="">E-mail </label>
				<input type="text" />
				<label htmlFor="">Senha </label>
				<input type="text" />
				<button>Entrar</button>
			</form>
		</div>
	);
};
