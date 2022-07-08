import { atom } from "recoil";
import { IUser, IUserUpdate } from "../modules/users/domain";

export const userState = atom<IUser[]>({
	key: "userState",
	default: [],
});

export const userUpdateState = atom<IUserUpdate>({
	key: "userUpdateState",
	default: {
		isEdition: false,
	} as IUserUpdate,
});