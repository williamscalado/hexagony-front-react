export interface IUser {
	create_at?: string;
	email: string;
	id?: string;
	name: string;
	password: string;
	passwordConfirmation?: string;
	update_at?: string;
	isEdition?: boolean;
}

export interface IUserUseCase {
	getAll: () => Promise<IUser[]>;
	getById: (id: string) => Promise<IUser> | Promise<void>;
	create: (data: IUser) => Promise<void>;
	update: (data: IUser) => Promise<void>;
	remove: (id: string) => Promise<void>;
}
