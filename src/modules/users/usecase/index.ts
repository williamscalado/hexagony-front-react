import { HttpAdapter } from '../../../adapters/http/axios/index';
import { IUser, IUserUpdate, IUserUseCase } from '../domain';

const getAll = async () => {
  try {
    return await HttpAdapter.fetch({ method: 'GET', url: '/user' });
  } catch (err: Error | any) {
    throw err;
  }
};

const getById = async (id: string) => {
  try {
    return await HttpAdapter.fetch({
      method: 'GET',
      url: `/user/${id}`,
    });
  } catch (err: Error | any) {
    throw err;
  }
};

const create = async (data: IUser) => {
  try {
    await HttpAdapter.fetch({
      method: 'POST',
      url: '/user',
      data: data,
    });
  } catch (err: Error | any) {
    throw err;
  }
};

const update = async (data: IUserUpdate) => {
  try {
    await HttpAdapter.fetch({
      method: 'PUT',
      url: `/user/${data?.id}`,
      data: data,
    });
  } catch (err: Error | any) {
    throw err;
  }
};

const remove = async (id: string) => {
  try {
    await HttpAdapter.fetch({
      method: 'DELETE',
      url: `/user/${id}`,
    });
  } catch (err: Error | any) {
    throw err;
  }
};

export const userUseCase: IUserUseCase = {
  getAll,
  getById,
  create,
  update,
  remove,
};
