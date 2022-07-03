import Api from "../../../service/Api";
import { IUser, IUserUseCase } from "../domain";

const getAll = async () => {
	const result = await Api.get("/user");
	if (!result.data) return;
	return result.data;
};

const getById = async (id: string) => {
	const result = await Api.get(`/user/${id}`);
	if (!result.data) return;
	return result.data;
};

const create = async (data: IUser) => {
	await Api.post("/user", data);
};

const update = async (data: IUser) => {
	await Api.put(`/user/${data?.id}`, data);
};

const remove = async (id: string) => {
	await Api.delete(`/user/${id}`);
};

export const userUseCase: IUserUseCase = {
	getAll,
	getById,
	create,
	update,
	remove,
};
