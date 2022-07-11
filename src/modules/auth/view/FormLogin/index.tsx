import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IFormLogin } from "../../domain";
import { FormUseCase } from "../../usecase";
import { formRules } from "../../validation";
import "./style.scss";

export const FormLogin = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState(false);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<IFormLogin>({
		mode: "onSubmit",
		reValidateMode: "onBlur",
		shouldFocusError: true,
		resolver: yupResolver(formRules),
		defaultValues: { email: "", password: "" },
	});

	const onSubmit = async (credentials: IFormLogin) => {
		try {
			setLoading(true);
			await FormUseCase.authenticate(credentials);
			navigate("/");
		} catch (error: Error | any) {
			toast.error(
				error.response.data.message || error.response.data.errors[0].message
			);
		} finally {
			setLoading(false);
		}
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
						placeholder="email@x.com"
					/>
					{<span>{errors?.email?.message}</span>}
					<label htmlFor="password">Password </label>
					<input
						type="password"
						data-testid="password"
						{...register("password")}
						placeholder="********"
					/>
					{<span>{errors?.password?.message}</span>}

					<button id="formLogin" type="submit" disabled={loading}>
						{loading ? "Loading..." : "Sign In"}
					</button>
				</form>
			</div>
		</React.Fragment>
	);
};
