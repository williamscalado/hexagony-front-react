import { useEffect, useState } from "react";
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
}

const getAll = async () => {
	const result = await Api.get("/album");
	if (!result.data) return;
	return result.data;
};

const GetAllAlbum = () => {
	const [albumData, setAlbumData] = useState<IAlbums[]>([{} as IAlbums]);

	const albumEffect = async () => {
		const result = await AlbumUseCase.getAll();
		setAlbumData(result);
	};
	useEffect(() => {
		albumEffect();
	}, [albumData]);

	return albumData;
};

export const AlbumUseCase: IAlbumUseCase = {
	getAll,
	GetAllAlbum,
};
