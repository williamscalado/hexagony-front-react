import * as yup from "yup";
import { IUser } from "../domain";

export const userFormValidation: yup.SchemaOf<IUser> = yup.object().shape({
	create_at: yup.string().notRequired(),
	id: yup.string().notRequired(),
	email: yup.string().email().required(),
	name: yup.string().required(),
	password: yup.string().required(),
	passwordConfirmation: yup
		.string()
		.when("isEdition", {
			is: (isEdition: boolean | undefined) =>
				isEdition === undefined ? true : false,
			then: yup.string().required(),
		})
		.oneOf([yup.ref("password"), null], " passwordConfirmation"),
	update_at: yup.string().notRequired(),
	isEdition: yup.boolean().notRequired(),
});
