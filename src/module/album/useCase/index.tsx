import Api from "../../../service/Api";

export interface IAlbums {
	id?: string;
	length: number;
	name: string;
	created_at?: string;
	updated_at?: string;
}

interface IAlbumUseCase {
	getAll: () => Promise<IAlbums[]>;
	create: (album: IAlbums) => Promise<void>;
	update: (album: IAlbums) => Promise<void>;
	remove: (id: string) => Promise<void>;
}

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

export const AlbumUseCase: IAlbumUseCase = {
	getAll,
	create,
	update,
	remove
};
