import { atom } from "recoil";
import { IAlbums } from "../modules/album/useCase";
import { IUser } from "../modules/users/domain";

export const userState = atom<IUser[]>({
	key: "userState",
	default: [],
});

export const albumListState = atom<IAlbums[]>({
	key: "albumListState",
	default: [],
});

export const albumUpdateState = atom<IAlbums>({
	key: "albumUpdateState",
	default: {
		id: "",
		name: "",
		length: 0,
	},
});
