import { atom } from "recoil";
import { IAlbums } from "../modules/album/useCase";

export const albumListState = atom<IAlbums[]>({
	key: "albumListState",
	default: [],
});

export const albumUpdateState = atom<IAlbums>({
	key: "albumUpdateState",
	default: {
		id: "",
		name: "",
		length: 1,
	},
});
