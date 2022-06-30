import React from "react";
import Api from "../../../service/Api";

export interface IAlbums {
	created_at: string;
	id: string;
	length: number;
	name: string;
	updated_at: string;
}

interface IAlbumUseCase {
	getAll: () => Promise<void> | IAlbums[] | any;
	GetAllAlbum: () => Promise<void> | IAlbums[] | any;
	deleteAlbum: (id: string) => Promise<void>;
	setNewAlbum: () => void;
}

const getAll = async () => {
	const result = await Api.get("/album");
	if (!result.data) return;
	return result.data;
};

const GetAllAlbum = () => {
	const [albumsList, setAlbumsList] = React.useState<IAlbums[]>([]);

	const getAlbums = React.useCallback(async () => {
		const albumData = await AlbumUseCase.getAll();
		setAlbumsList(albumData);
	}, []);

	React.useEffect(() => {
		getAlbums();
	}, [getAlbums]);

	return albumsList;
};

const setNewAlbum = () => {
	return GetAllAlbum();
};

const deleteAlbum = async (id: string) => {
	const result = await Api.patch("/album", id);
	return result.data;
};

export const AlbumUseCase: IAlbumUseCase = {
	getAll,
	GetAllAlbum,
	deleteAlbum,
	setNewAlbum,
};
