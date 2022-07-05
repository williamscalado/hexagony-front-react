import React, { useEffect } from "react";
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
										<span className="user-email">{item.email}</span>
										<div className="user-icon-tools">
											<button>
												<FiEdit />
											</button>
											<button>
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
