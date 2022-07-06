import React from "react";
import { useRecoilState } from "recoil";
import { Footer } from "../../components/footer";
import { Header } from "../../components/header";
import { ListUser } from "../../components/listUser";
import { NewUserForm } from "../../components/newUser";
import { FormUserUpdate } from "../../components/updateUserForm";
import { IUserUpdate } from "../../modules/users/domain";
import { userUpdateState } from "../../state/userState";
import "./style.scss";

export const UserPage = () => {
	const stateUpdateUser = useRecoilState<IUserUpdate>(userUpdateState);

	return (
		<React.Fragment>
			<Header />
			<div className="container-user">
				<div className="container-content-user">
					<ListUser />
					{stateUpdateUser[0].isEdition ? <FormUserUpdate /> : <NewUserForm />}
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
};
