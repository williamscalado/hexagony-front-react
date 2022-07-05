import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { AlbumUseCase, IAlbums } from "../../modules/album/useCase";
import { albumListState, albumUpdateState } from "../../state/albumState";
import "./style.scss";

export const ListAlbum = () => {
	const [albumsList, setAlbumsList] = useRecoilState<IAlbums[]>(albumListState);
	const setAlbumUpdate = useSetRecoilState(albumUpdateState);

	const getAlbumList = React.useCallback(async () => {
		const res = await AlbumUseCase.getAll();
		setAlbumsList(res);
	}, [setAlbumsList]);

	const removeAlbums = async (id: string) => {
		try {
			await AlbumUseCase.remove(id);
			await getAlbumList();
			toast.success("album removed");
		} catch (err) {
			toast.error("failed to remove album");
		}
	};

	const updateAlbums = async (id: string) => {
		const resultData = await AlbumUseCase.getAlbumById(String(id));
		if (!resultData) return;

		const data = {
			id: resultData?.id,
			name: resultData?.name,
			length: resultData?.length,
		};
		setAlbumUpdate(data);
	};

	React.useEffect(() => {
		getAlbumList();
	}, [getAlbumList]);

	return (
		<div className="container-list-album">
			<h3>Albums</h3>
			{!albumsList && <div className="no-record">No record found</div>}
			{albumsList?.map((item: IAlbums, index: number) => {
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
								<FiEdit onClick={() => updateAlbums(String(item.id))} />
							</span>
							<span>
								<AiOutlineDelete
									onClick={() => removeAlbums(String(item.id))}
								/>
							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};
