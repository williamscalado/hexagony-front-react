import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { AlbumUseCase, IAlbums } from "../../module/album/useCase";
import "./style.scss";

export const ListAlbum = () => {
	const albumData = AlbumUseCase.GetAllAlbum();
	return (
		<div className="container-list-album">
			<h3>Albums</h3>
			{albumData &&
				albumData.map((item: IAlbums) => {
					return (
						<div key={item.id} className="list-album">
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
									<AiOutlineDelete onClick={() => {}} />
								</span>
							</div>
						</div>
					);
				})}
		</div>
	);
};
