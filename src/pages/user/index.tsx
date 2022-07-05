import React from "react";
import { Header } from "../../components/header";
import { ListUser } from "../../components/listUser";
import { NewUserForm } from "../../components/newUser";
import "./style.scss";
export const UserPage = () => {
	return (
		<React.Fragment>
			<Header />
			<div className="container-user">
				<div className="container-content-user">
					<ListUser />
					<NewUserForm />
				</div>
			</div>
		</React.Fragment>
	);
};
