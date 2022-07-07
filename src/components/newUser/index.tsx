import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsCheckAll, BsEye, BsEyeSlash } from "react-icons/bs";
import { useSetRecoilState } from "recoil";
import { IUser } from "../../modules/users/domain";
import { userUseCase } from "../../modules/users/usecase";
import { userFormValidation } from "../../modules/users/validation";
import { userState } from "../../state/userState";
import "./style.scss";

interface IPassword {
	[key: string]: boolean;
}
const InitialStatusPassword = {
	password: false,
	passwordConfirm: false,
};
export const NewUserForm = () => {
	const setUserAllUser = useSetRecoilState<IUser[]>(userState);
	const [showPassword, setShowPassword] = useState<IPassword>(
		InitialStatusPassword
	);

	const handleVisiblePassword = (inputName: string) => {
		showPassword[`${inputName}`]
			? setShowPassword({
					...showPassword,
					[`${inputName}`]: false,
			  })
			: setShowPassword({
					...showPassword,
					[`${inputName}`]: true,
			  });
	};

	useEffect(() => {
		const timer = setTimeout(
			() => setShowPassword(InitialStatusPassword),
			5000
		);
		return () => clearInterval(timer);
	}, [showPassword]);

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
			toast.success("user created");
		} catch (error) {
			toast.error("failed to create user");
		}
	};

	return (
		<div className="container-new-form-user">
			<div className="avatar-user">
				<img src="../../assets/image/user-avatar.png" alt="User Avatar" />
			</div>

			<form id="hook-form" onSubmit={handleSubmit(onSubmit)}>
				<label htmlFor="name">Full Name</label>
				<input {...register("name")} type="text" />
				<span>{errors?.name && errors.name.message}</span>
				<label htmlFor="email">Email</label>
				<input type="text" {...register("email")} />
				<span>{errors?.email && errors.email.message}</span>

				<label htmlFor="password">Password</label>
				<span className="user-password">
					<input
						type={showPassword.password ? "text" : "password"}
						{...register("password")}
					/>
					<button
						type="button"
						onClick={() => handleVisiblePassword("password")}
					>
						{showPassword.password ? <BsEye /> : <BsEyeSlash />}
					</button>
				</span>
				<span>{errors?.password && errors.password.message}</span>
				<label htmlFor="passwordConfirmation">Confirm Password</label>
				<span className="user-password">
					<input
						type={showPassword.passwordConfirm ? "text" : "password"}
						{...register("passwordConfirmation")}
					/>
					<button
						type="button"
						onClick={() => handleVisiblePassword("passwordConfirm")}
					>
						{showPassword.passwordConfirm ? <BsEye /> : <BsEyeSlash />}
					</button>
				</span>
				<span>
					{errors.passwordConfirmation && errors.passwordConfirmation.message}
				</span>
				<button type="submit" form="hook-form" className="buttonSend">
					<BsCheckAll className="btn-icon" />
					Save
				</button>
			</form>
		</div>
	);
};
