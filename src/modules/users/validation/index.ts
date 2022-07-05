import * as yup from "yup";
import { IUser } from "../domain";

export const userFormValidation: yup.SchemaOf<IUser> = yup.object().shape({
	create_at: yup.string().notRequired(),
	id: yup.string().notRequired(),
	email: yup.string().email().required(),
	name: yup.string().required(),
	password: yup.string().required().min(8).max(100),
	passwordConfirmation: yup
		.string()
		.min(8, "password must be at least 8 characters")
		.max(100, "password must be at most 100 characters")
		.when("isEdition", {
			is: (isEdition: boolean | undefined) =>
				isEdition === undefined ? true : false,
			then: yup.string().required("Confirm your password!"),
		})
		.oneOf([yup.ref("password"), null], "The password entered does not match"),
	update_at: yup.string().notRequired(),
	isEdition: yup.boolean().notRequired(),
});
