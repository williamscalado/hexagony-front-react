import { yupResolver } from "@hookform/resolvers/yup";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import { IUser, IUserUpdate } from "../../modules/users/domain";
import { userUseCase } from "../../modules/users/usecase";
import { userFormValidationUpdate } from "../../modules/users/validation";
import { userState, userUpdateState } from "../../state/userState";
import "./style.scss";

export const FormUserUpdate = () => {
	const stateUpdate = useRecoilState(userUpdateState);
	const setStateUpdate = useSetRecoilState(userUpdateState);
	const setUserList = useSetRecoilState(userState);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IUser>({
		mode: "onBlur",
		reValidateMode: "onBlur",
		shouldFocusError: true,
		resolver: yupResolver(userFormValidationUpdate),
	});

	const isEdition = React.useMemo(
		() => ({
			id: stateUpdate[0].id || "",
			name: stateUpdate[0].name || "",
			email: stateUpdate[0].email || "",
		}),
		[stateUpdate]
	);

	const setFieldValue = React.useCallback(() => {
		reset({
			name: isEdition.name,
			email: isEdition.email,
		});
	}, [reset, isEdition.name, isEdition.email]);

	useEffect(() => {
		setFieldValue();
	}, [setFieldValue]);

	const handleCancelUpdate = () => {
		setStateUpdate({
			isEdition: false,
		} as IUserUpdate);
	};
	const onSubmit = async (data: IUserUpdate) => {
		try {
			const newDataUpdate = {
				...data,
				id: isEdition.id,
			};
			await userUseCase.update(newDataUpdate);
			const res = await userUseCase.getAll();
			setUserList(res);
			setStateUpdate({
				isEdition: false,
			} as IUserUpdate);
			toast.success("User update");
		} catch (error) {
			toast.error("failed to update user");
		}
	};
	console.log(stateUpdate);
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
				<span>
					{errors.passwordConfirmation && errors.passwordConfirmation.message}
				</span>
				<button type="submit" form="hook-form" className="buttonSend">
					Update
				</button>
				<button
					type="button"
					className="buttonCancel"
					onClick={() => {
						handleCancelUpdate();
					}}
				>
					Cancel
				</button>
			</form>
		</div>
	);
};
