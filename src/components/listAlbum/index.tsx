import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import "./style.scss";
export const ListAlbum = () => {
	return (
		<div className="container-list-album">
			<h3>Albums</h3>
			<div className="list-album">
				<div className="list-album-info">
					<span>Name Album</span>
					<span>Length 8</span>
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
		</div>
	);
};
