import { yupResolver } from "@hookform/resolvers/yup";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setAuth } from "../../auth/authentication";
import { ApiAuth } from "../../service/Api";
import "./style.scss";

type formLogin = {
	email: string;
	password: string;
};

const formRules: yup.SchemaOf<formLogin> = yup.object().shape({
	email: yup
		.string()
		.trim()
		.email()
		.required(),
	password: yup
		.string()
		.trim()
		.min(8)
		.required(),
});

export const FormLogin = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({});
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<formLogin>({
		mode: "onBlur",
		reValidateMode: "onBlur",
		shouldFocusError: true,
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
		try {
			const result = await ApiAuth.post("auth", data);
			return result.data.token;
		} catch (error: Error | any) {
			toast.error(error.response.data.message);
		}
	};

	const onSubmit = async (data: formLogin) => {
		const resultToken = await getTokenLogin(data);
		setAuth(resultToken)

		if (resultToken) navigate("/");
	};

	return (
		<React.Fragment>
			{" "}
			<div>
				<Toaster />
			</div>
			<div className="ContainerLogin">
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="email">E-mail </label>
					<input
						{...register("email")}
						type="text"
						onChange={handleInputChange}
						placeholder="email@x.com"
						autoFocus
					/>
					{<span>{errors?.email?.message}</span>}
					<label htmlFor="password">Password </label>
					<input
						type="password"
						{...register("password")}
						placeholder="********"
						onChange={handleInputChange}
					/>
					{<span>{errors?.password?.message}</span>}

					<button type="submit">Sign In</button>
				</form>
			</div>
		</React.Fragment>
	);
};
