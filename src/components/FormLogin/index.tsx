import { yupResolver } from "@hookform/resolvers/yup";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import Api from "../../service/Api";
import "./style.scss";

type formLogin = {
	email: string;
	password: string;
};

const formRules: yup.SchemaOf<formLogin> = yup.object().shape({
	email: yup
		.string()
		.email("E-mail inválido!")
		.required("Precisamos do seu e-mail"),
	password: yup
		.string()
		.min(8, "Senha curta, mínimo 8 caracteres")
		.required("Digite uma senha válida"),
});

export const FormLogin = () => {
	const [formData, setFormData] = useState({});
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<formLogin>({
		resolver: yupResolver(formRules),
	});

	const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
		const input = e.target as HTMLInputElement;
		setFormData({
			...formData,
			[input.name]: input.value,
		});
	};
	const getTokenLogin = async (data: formLogin) => {
		const result = await Api.post("/auth", data);
		//console.log(result.data);
	};
	const onSubmit = async (data: formLogin) => {
		await getTokenLogin(data);

		//console.log(data);
	};

	return (
		<div className="ContainerLogin">
			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="">E-mail </label>
				<input
					{...register("email", { required: true })}
					type="text"
					onChange={handleInputChange}
					placeholder="email@x.com.br"
				/>
				{errors.email && <span>{errors.email.message}</span>}
				<label htmlFor="">Senha </label>
				<input
					type="password"
					{...register("password", { required: true })}
					placeholder="*****"
					onChange={handleInputChange}
				/>
				{errors.password && <span>{errors.password.message}</span>}

				<button type="submit">Entrar</button>
			</form>
		</div>
	);
};
