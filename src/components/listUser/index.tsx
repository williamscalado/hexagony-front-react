import { getGender } from "gender-detection-from-name";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useRecoilState } from "recoil";
import { getIdIsAuth } from "../../auth/authentication";
import { userUseCase } from "../../modules/users/usecase";
import { userState } from "../../state/userState";
import "./style.scss";

export const ListUser = () => {
	const [userList, setUserList] = useRecoilState(userState);
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
			await userUseCase.remove(id);
			await getAllUser();
			toast.success("User removed");
		} catch (err) {
			toast.error("failed to remove user");
		}
	};

	const getAvatar = (gender: string) => {
		let urlAvatar = null;
		switch (gender) {
			case "male":
				urlAvatar = "avatar-male.png";
				break;
			case "female":
				urlAvatar = "avatar-fale.png";
				break;
			case "unknown":
				urlAvatar = "user-avatar.png";
				break;
		}

		return urlAvatar;
	};

	const getFirstName = (fullName: string) => {
		const firstName = fullName.split(" ").slice(0, 2)[0];
		return firstName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
	};

	return (
		<>
			<div className="container-user-list">
				<h1>Users List</h1>
				<div className="content-user-list">
					{userList &&
						userList.map((item) => {
							const firstName = getFirstName(item.name);
							const gender = getGender(`${firstName}`);
							const urlAvatar = getAvatar(gender);
							return (
								<div key={item.id}>
									<div className="user-list">
										<img src={`../../assets/image/${urlAvatar}`} alt="" />
										<span>{item.name}</span>
										<span></span>
										<span className="user-email">
											{item.email} - {gender}
										</span>
										<div className="user-icon-tools">
											<button>
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
