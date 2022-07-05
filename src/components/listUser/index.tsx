import React, { useEffect } from "react";
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
		<div className="container-user-list">
			<h1>Users list</h1>
		</div>
	);
};
