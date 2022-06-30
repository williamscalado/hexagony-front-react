import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { AlbumUseCase, IAlbums } from "../../module/album/useCase";
import "./style.scss";

export const ListAlbum = () => {
	const { GetAllAlbum } = AlbumUseCase;

	const handleDeleteAlbum = (id: string) => {
		if (!id) toast.error("Error processing request!");

		console.log(id);
	};

	const albumData = GetAllAlbum();

	console.log(albumData);
	return (
		<div className="container-list-album">
			<h3>Albums</h3>
			{albumData &&
				albumData.map((item: IAlbums, index: number) => {
					return (
						<div
							key={`${item.name}-${index}-${item.length}`}
							className="list-album"
						>
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
									<AiOutlineDelete onClick={() => handleDeleteAlbum(item.id)} />
								</span>
							</div>
						</div>
					);
				})}
		</div>
	);
};
