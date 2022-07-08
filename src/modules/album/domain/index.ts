export interface IAlbums {
	id?: string;
	length: number;
	name: string;
	created_at?: string;
	updated_at?: string;
}

export interface IAlbumUseCase {
	getAll: () => Promise<IAlbums[]>;
	create: (album: IAlbums) => Promise<void>;
	update: (album: IAlbums) => Promise<void>;
	remove: (id: string) => Promise<void>;
	getAlbumById: (id: string) => Promise<IAlbums>;
}
