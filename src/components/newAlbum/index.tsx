import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as yup from "yup";
import { AlbumUseCase, IAlbums } from "../../modules/album/useCase";
import { albumListState, albumUpdateState } from "../../state/albumState";
import "./style.scss";

const newAlbumFormRule: yup.SchemaOf<IAlbums> = yup.object().shape({
	id: yup.string().notRequired(),
	name: yup.string().required().min(3),
	length: yup.number().typeError("length must be a number").required().min(1),
	created_at: yup.string().notRequired(),
	updated_at: yup.string().notRequired(),
});

const InitialUpdate = {
	id: "",
	name: "",
	length: 0,
};

export const NewAlbum = () => {
	const setAlbumsState = useSetRecoilState(albumListState);
	const updateAlbum = useRecoilState(albumUpdateState);
	const setUpdateAlbum = useSetRecoilState(albumUpdateState);

	const nameAlbum = updateAlbum[0].name;
	const lengthAlbum = updateAlbum[0].length;

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<IAlbums>({
		mode: "onBlur",
		reValidateMode: "onBlur",
		shouldFocusError: true,
		resolver: yupResolver(newAlbumFormRule),
	});

	const onSubmit = async (data: IAlbums) => {
		try {
			const newData: IAlbums = {
				...data,
				length: +data.length,
			};
			const newDataUpdate = {
				...newData,
				id: updateAlbum[0].id,
			};

			const updateStatus = updateAlbum[0].id;
			updateStatus
				? await AlbumUseCase.update(newDataUpdate)
				: await AlbumUseCase.create(newData);

			const res = await AlbumUseCase.getAll();
			setAlbumsState(res);

			setUpdateAlbum(InitialUpdate);
			reset();
			toast.success(updateStatus ? "update album" : "create album");
		} catch (error) {
			toast.error(
				updateAlbum[0]?.id ? "failed to update album" : "failed to create album"
			);
		}
	};

	return (
		<div className="container-new-album">
			<div className="content-new-album">
				<h3>New Album</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="">Name</label>
					<input {...register("name")} type="text" defaultValue={nameAlbum} />
					{errors?.name && <span>{errors?.name?.message} </span>}
					<label htmlFor="">Length</label>
					<input
						{...register("length")}
						type="number"
						defaultValue={lengthAlbum}
					/>
					{errors?.length && <span>{errors.length.message}</span>}
					<button>Add</button>
				</form>
			</div>
		</div>
	);
};
