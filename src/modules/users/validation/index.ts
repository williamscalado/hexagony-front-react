import * as yup from 'yup';
import { IUser, IUserUpdate } from '../domain';

export const userFormValidation: yup.SchemaOf<IUser> = yup.object().shape({
  create_at: yup.string().notRequired(),
  id: yup.string().notRequired(),
  email: yup.string().email().required(),
  name: yup.string().required('full name is a required field'),
  password: yup.string().required().min(8).max(100),
  passwordConfirmation: yup
    .string()
    .when('isEdition', {
      is: (isEdition: boolean | undefined) => (isEdition === undefined ? true : false),
      then: yup
        .string()
        .required('confirm password is a required field')
        .min(8, 'confirm password must be at least 8 characters')
        .max(100, 'confirm password must be at most 100 characters'),
    })
    .oneOf([yup.ref('password'), null], 'passwords do not match'),
  update_at: yup.string().notRequired(),
  isEdition: yup.boolean().notRequired(),
});

export const userFormValidationUpdate: yup.SchemaOf<IUserUpdate> = yup.object().shape({
  create_at: yup.string().notRequired(),
  id: yup.string().notRequired(),
  email: yup.string().email().required(),
  name: yup.string().required(),
  password: yup.string().notRequired().min(8).max(100),
  passwordConfirmation: yup.string().notRequired().min(8).max(100),
  update_at: yup.string().notRequired(),
  isEdition: yup.boolean().notRequired(),
});
