import * as yup from "yup";
import { IFormLogin } from "../domain";

export const formRules: yup.SchemaOf<IFormLogin> = yup.object().shape({
	email: yup.string().trim().lowercase().email().required(),
	password: yup
		.string()
		.required()
		.min(8, "password must be at least 8 characters"),
});
