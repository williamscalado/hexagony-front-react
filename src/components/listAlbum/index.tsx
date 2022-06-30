import "react-confirm-alert/src/react-confirm-alert.css";
import { atom, useRecoilState } from "recoil"
import toast from "react-hot-toast";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { AlbumUseCase, IAlbums } from "../../module/album/useCase";
import "./style.scss";


export const albumListState = atom<IAlbums[]>({
	key: 'albumListState',
	default: []
});

export const ListAlbum = () => {

	const [albumsList, setAlbumsList] = useRecoilState<IAlbums[]>(albumListState)

	const getAlbumList = React.useCallback(async () => {
		const res = await AlbumUseCase.getAll()
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

	React.useEffect(() => {
		getAlbumList()
	}, [getAlbumList]);


	console.log(albumsList);
	return (
		<div className="container-list-album">
			<h3>Albums</h3>
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
								<FiEdit />
							</span>
							<span>
					<AiOutlineDelete onClick={() => removeAlbums(String(item.id))} />

							</span>
						</div>
					</div>
				);
			})}
		</div>
	);
};
