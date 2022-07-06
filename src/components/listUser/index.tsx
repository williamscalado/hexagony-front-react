import { getGender } from "gender-detection-from-name";
import { useConfirm } from "material-ui-confirm";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { getIdIsAuth } from "../../auth/authentication";
import { IUserUpdate } from "../../modules/users/domain";
import { userUseCase } from "../../modules/users/usecase";
import { userUtil } from "../../modules/users/util";
import { userState, userUpdateState } from "../../state/userState";
import "./style.scss";

export const ListUser = () => {
	const confirmDialog = useConfirm();
	const [userList, setUserList] = useRecoilState(userState);
	const setDataUserUpdate = useSetRecoilState(userUpdateState);

	const getAllUser = React.useCallback(async () => {
		const result = await userUseCase.getAll();
		setUserList(result);
	}, [setUserList]);

	useEffect(() => {
		getAllUser();
	}, [getAllUser]);

	const removeUsers = async (id: string) => {
		try {
			if (id === getIdIsAuth()) throw new Error();
			await confirmDialog({
				description: "This will permanently delete this user.",
				confirmationButtonProps: { autoFocus: true },
			});
			await userUseCase.remove(id);
			await getAllUser();
			setDataUserUpdate({
				isEdition: false,
			} as IUserUpdate);
			toast.success("User removed");
		} catch (err) {
			toast.error("failed to remove user");
		}
	};

	const handleUpdateUser = async (id: string) => {
		try {
			if (!id) throw new Error();
			const resUser = await userUseCase.getById(id);

			const newData = {
				...resUser,
				isEdition: true,
			};
			setDataUserUpdate(newData as IUserUpdate);
		} catch (err) {}
	};

	return (
		<>
			<div className="container-user-list">
				<h1>Users</h1>
				<div className="content-user-list">
					{userList &&
						userList.map((item) => {
							const firstName = userUtil.getFirstName(item.name);
							const gender = getGender(`${firstName}`);
							const urlAvatar = userUtil.getAvatar(gender);
							return (
								<div key={item.id}>
									<div className="user-list">
										<img src={`../../assets/image/${urlAvatar}`} alt="" />
										<span>{item.name}</span>
										<span></span>
										<span className="user-email">{item.email}</span>
										<div className="user-icon-tools">
											<button
												onClick={() => {
													handleUpdateUser(String(item.id));
												}}
											>
												<FiEdit />
											</button>
											<button
												onClick={() => {
													removeUsers(String(item.id));
												}}
											>
												<AiOutlineDelete />
											</button>
										</div>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
};
