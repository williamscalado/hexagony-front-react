import { atom } from "recoil";
import { IUser } from "../modules/users/domain";

export const userState = atom<IUser[]>({
	key: "userState",
	default: [],
});
