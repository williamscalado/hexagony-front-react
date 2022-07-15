import { useConfirm } from "material-ui-confirm";
import React from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { useRecoilState, useSetRecoilState } from "recoil";
import { utils } from "../../../../helpers/utils";
import { albumListState, albumUpdateState } from "../../../../state/albumState";
import { loadingState } from "../../../../state/sharedState";
import { IAlbums } from "../../domain";
import { AlbumUseCase } from "../../usecase";
import "./style.scss";

export const ListAlbum = React.forwardRef((_, ref: any) => {
	const confirmDialog = useConfirm();
	const [albumsList, setAlbumsList] = useRecoilState<IAlbums[]>(albumListState);
	const setLoading = useSetRecoilState(loadingState);
	const setAlbumUpdate = useSetRecoilState(albumUpdateState);

	const getAllAlbums = React.useCallback(async () => {
		try {
			setLoading(true);
			const res = await AlbumUseCase.getAll();
			setAlbumsList(res);
		} catch (err) {
			toast.error("failed to list albums");
		} finally {
			setLoading(false);
		}
	}, [setAlbumsList, setLoading]);

	const removeAlbums = async (id: string) => {
		try {
			(async () => {
				try {
					await confirmDialog({
						description: "This will permanently delete this album.",
						confirmationButtonProps: { autoFocus: true },
					});
					setLoading(true);

					await AlbumUseCase.remove(id);
					await getAllAlbums();
					setAlbumUpdate({
						id: undefined,
						name: "",
						length: 1,
					});
					toast.success("album removed");
				} catch (err) {
					return;
				} finally {
					setLoading(false);
				}
			})();
		} catch (err) {
			toast.error("failed to remove album");
		}
	};

	const updateAlbums = (id: string) => {
		utils.scrollToTop(ref);
		const resultData = albumsList.find((album) => album.id === id);
		if (!resultData) return;

		const data = {
			id: resultData?.id,
			name: resultData?.name,
			length: resultData?.length,
		};

		setAlbumUpdate(data);
	};

	React.useEffect(() => {
		getAllAlbums();
	}, [getAllAlbums]);

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
						<div className="list-album-icon">
							<img src="../../assets/image/disc-icon.png" alt="album" />
						</div>
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
});
