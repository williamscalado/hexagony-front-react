import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsEyeSlash } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { IUser } from "../../modules/users/domain";
import { userUseCase } from "../../modules/users/usecase";
import { userFormValidation } from "../../modules/users/validation";
import { userState } from "../../state/userState";
import "./style.scss";
export const NewUserForm = () => {
	const setUserAllUser = useSetRecoilState<IUser[]>(userState);
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IUser>({
		mode: "onBlur",
		reValidateMode: "onBlur",
		shouldFocusError: true,
		resolver: yupResolver(userFormValidation),
	});

	const onSubmit = async (data: IUser) => {
		try {
			delete data.passwordConfirmation;
			await userUseCase.create(data);
			const res = await userUseCase.getAll();
			setUserAllUser(res);
			reset();
			toast.success("Create user");
		} catch (error) {
			toast.error("failed to create user");
		}
	};

	return (
		<div className="container-new-form-user">
			<div className="avatar-user">
				<img src="../../assets/image/user-avatar.png" alt="User Avatar" />
			</div>

			<form onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">Full Name</label>
				<input {...register("name")} type="text" />
				<span>{errors?.name && errors.name.message}</span>
				<label htmlFor="email">Email</label>
				<input type="text" {...register("email")} />
				<span>{errors?.email && errors.email.message}</span>

				<label htmlFor="password">Password</label>
				<span className="user-password">
					<input type="password" {...register("password")} />
					<button>{showPassword ? <BsEyeSlash /> : <BsEyeSlash />}</button>
				</span>
				<span>{errors?.password && errors.password.message}</span>
				<label htmlFor="passwordConfirmation">Confirm Password</label>
				<span className="user-password">
					<input type="password" {...register("passwordConfirmation")} />
					<button
						type="button"
						onClick={() => {
							console.log("ok");
						}}
					>
						{showPassword ? <BsEyeSlash /> : <BsEyeSlash />}
					</button>
				</span>
				<span>
					{errors.passwordConfirmation && errors.passwordConfirmation.message}
				</span>
				<button type="submit" className="buttonSend">
					Save
				</button>
			</form>
		</div>
	);
};
