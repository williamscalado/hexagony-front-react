import { useEffect, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import Api from "../../service/Api";
import "./style.scss";

interface IAlbums {
	created_at: string;
	id: string;
	length: number;
	name: string;
	updated_at: string;
}

export const ListAlbum = () => {
	const [albumData, setAlbumData] = useState([{} as IAlbums]);

	const getAllAlbums = async () => {
		const result = await Api.get("/album");
		if (!result.data) return;
		setAlbumData(result.data);
	};
	useEffect(() => {
		getAllAlbums();
	}, []);
	console.log(albumData);
	return (
		<div className="container-list-album">
			<h3>Albums</h3>
			{albumData.map((item) => {
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
