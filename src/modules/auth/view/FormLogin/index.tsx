
import React, { FormEvent, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ApiAuth } from "../../../../adapters/http/axios";
import { setAuth } from "../../../../helpers/authentication";
import { IFormLogin } from "../../domain";
import { formRules } from "../../validation";
import "./style.scss";

export const FormLogin = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);
	const [formData, setFormData] = useState({});
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IFormLogin>({
		mode: "onSubmit",
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

	const getTokenLogin = async (data: IFormLogin) => {
		try {
			setLoading(true);
			const result = await ApiAuth.post("auth", data);
			return result.data.token;
		} catch (error: Error | any) {
			toast.error(error.response.data.message);
		} finally {
			setLoading(false);
		}
	};

	const onSubmit = async (data: IFormLogin) => {
		const resultToken = await getTokenLogin(data);
		setAuth(resultToken);

		if (resultToken) navigate("/");
	};

	return (
		<React.Fragment>
			<div className="ContainerLogin">
				<form onSubmit={handleSubmit(onSubmit)} id="formLogin">
					<label htmlFor="email">E-mail </label>
					<input
						{...register("email")}
						type="text"
						data-testid="email"
						onChange={handleInputChange}
						placeholder="email@x.com"
						autoFocus
					/>
					{<span>{errors?.email?.message}</span>}
					<label htmlFor="password">Password </label>
					<input
						type="password"
						data-testid="password"
						{...register("password")}
						placeholder="********"
						onChange={handleInputChange}
					/>
					{<span>{errors?.password?.message}</span>}

					<button type="submit" disabled={loading}>
						{loading ? 'Loading...' : 'Sign In'}
					</button>
				</form>
			</div>
		</React.Fragment>
	);
};
