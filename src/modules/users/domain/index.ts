export interface IUser {
	create_at?: string;
	email: string;
	id?: string;
	name: string;
	password: string;
	passwordConfirmation?: string;
	update_at?: string;
	isEdition?: boolean | false;
}

export type IUserUpdate = Omit<IUser, "password" | "passwordConfirmation">;

export interface IUserUseCase {
	getAll: () => Promise<IUser[]>;
	getById: (id: string) => Promise<IUser> | Promise<void>;
	create: (data: IUser) => Promise<void>;
	update: (data: IUserUpdate) => Promise<void>;
	remove: (id: string) => Promise<void>;
}
