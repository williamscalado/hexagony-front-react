import * as yup from "yup";
import { IFormLogin } from "../domain";

export const formRules: yup.SchemaOf<IFormLogin> = yup.object().shape({
  email: yup.string().trim().email().required(),
  password: yup.string().trim().min(8).required(),
});

