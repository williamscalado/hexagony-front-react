import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useRecoilState } from "recoil";
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
			await userUseCase.remove(id);
			await getAllUser();
			toast.success("User removed");
		} catch (err) {
			toast.error("failed to remove user");
		}
	};

	return (
		<>
			<div className="container-user-list">
				<h1>Users List</h1>
				<div className="content-user-list">
					{userList &&
						userList.map((item) => {
							return (
								<div key={item.id}>
									<div className="user-list">
										<img src="../../assets/image/user-avatar.png" alt="" />
										<span>{item.name}</span>
										<span></span>
										<span className="user-email">{item.email}</span>
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
