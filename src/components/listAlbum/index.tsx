import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { AlbumUseCase, IAlbums } from "../../module/album/useCase";
import "./style.scss";

export const ListAlbum = () => {
	const [albumsList, setAlbumsList] = React.useState<IAlbums[]>([])

	const getAlbums = React.useCallback(async () => {
		const albumData = await AlbumUseCase.getAll();
		setAlbumsList(albumData)
	}, [])

	React.useEffect(() => {
    getAlbums()
	}, [getAlbums])

	return (
		<div className="container-list-album">
			<h3>Albums</h3>
			{albumsList?.map((item: IAlbums, index: number) => {
					return (
						<div key={`${item.name}-${index}-${item.length}`} className="list-album">
							<div className="list-album-info">
								<span>{item.name}</span>
								<span>
									{item.length} {item.length > 1 ? "minutes" : "minute"}
								</span>
							</div>

							<div className="list-album-icons">
								<span>
									<FiEdit />
								</span>
								<span>
									<AiOutlineDelete onClick={() => { }} />
								</span>
							</div>
						</div>
					);
				})}
		</div>
	);
};
