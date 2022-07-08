import Api from "../../../adapter/http/axios";
import { IAlbums, IAlbumUseCase } from "../domain";

const getAll = async () => {
	const result = await Api.get("/album");
	if (!result.data) return;
	return result.data;
};

const create = async (album: IAlbums) => {
	await Api.post("/album", album);
};

const update = async (album: IAlbums) => {
	await Api.put(`/album/${album.id}`, album);
};

const remove = async (id: string) => {
	await Api.delete(`/album/${id}`);
};

const getAlbumById = async (id: string) => {
	const result = await Api.get(`/album/${id}`);
	if (!result.data) return;
	return result.data;
};

export const AlbumUseCase: IAlbumUseCase = {
	getAll,
	create,
	update,
	remove,
	getAlbumById,
};
