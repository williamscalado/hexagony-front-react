import { yupResolver } from "@hookform/resolvers/yup";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { setAuth } from "../../auth/authentication";
import Api from "../../service/Api";
import "./style.scss";

type formLogin = {
	email: string;
	password: string;
};

const formRules: yup.SchemaOf<formLogin> = yup.object().shape({
	email: yup
		.string()
		.email("E-mail invalid!")
		.required("Enter your best email"),
	password: yup
		.string()
		.min(8, "short password, minimum 8 character")
		.required("The password is not valid!"),
});

export const FormLogin = () => {
	const navigate = useNavigate();
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
		try {
			const result = await Api.post("auth", data).then((res) => res);

			return result.data.token;
		} catch (error: Error | any) {
			toast.error(error.response.data.message);
		}
	};

	const onSubmit = async (data: formLogin) => {
		try {
			const resultToken = await getTokenLogin(data);
			setAuth(resultToken);

			if (resultToken) navigate("/");
		} catch (error) {
			toast.error("We had a problem processing your login, please try again!");
		}
	};

	return (
		<>
			{" "}
			<div>
				<Toaster />
			</div>
			<div className="ContainerLogin">
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="">E-mail </label>
					<input
						{...register("email", { required: true })}
						type="text"
						onChange={handleInputChange}
						placeholder="email@x.com"
					/>
					{errors.email && <span>{errors.email.message}</span>}
					<label htmlFor="">Password </label>
					<input
						type="password"
						{...register("password", { required: true })}
						placeholder="*****"
						onChange={handleInputChange}
					/>
					{errors.password && <span>{errors.password.message}</span>}

					<button type="submit">Sign In</button>
				</form>
			</div>
		</>
	);
};
