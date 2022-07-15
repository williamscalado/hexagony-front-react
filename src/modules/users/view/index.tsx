import React from "react";
import { useRecoilState } from "recoil";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { userUpdateState } from "../../../state/userState";
import { IUserUpdate } from "../domain";
import { ListUser } from "./ListUser";
import { NewUserForm } from "./NewUser";
import { FormUserUpdate } from "./UpdateUserForm";

import "./style.scss";

export const UserPage = () => {
	const stateUpdateUser = useRecoilState<IUserUpdate>(userUpdateState);
	const ref = React.useRef<HTMLDivElement>(null);

	return (
		<React.Fragment>
			<Header />
			<div className="container-user" ref={ref}>
				<div className="container-content-user">
					<ListUser ref={ref} />
					{stateUpdateUser[0].isEdition ? <FormUserUpdate /> : <NewUserForm />}
				</div>
			</div>
			<Footer />
		</React.Fragment>
	);
};
