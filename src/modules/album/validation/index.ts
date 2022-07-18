import * as yup from 'yup'
import { IAlbums } from '../domain'

export const newAlbumFormRule: yup.SchemaOf<IAlbums> = yup.object().shape({
  id: yup.string().notRequired(),
  name: yup.string().required().min(3),
  length: yup.number().typeError('length must be a number').required().min(1),
  created_at: yup.string().notRequired(),
  updated_at: yup.string().notRequired(),
})
