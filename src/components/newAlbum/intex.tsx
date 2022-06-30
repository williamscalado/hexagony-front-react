import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSetRecoilState } from "recoil";
import * as yup from "yup";
import { AlbumUseCase, IAlbums } from "../../module/album/useCase";
import { albumListState } from "../listAlbum";
import "./style.scss";

const newAlbumFormRule: yup.SchemaOf<IAlbums> = yup.object().shape({
	id: yup.string().notRequired(),
	name: yup.string().required().min(3),
	length: yup.number().typeError("length must be a number").required().min(1),
	created_at: yup.string().notRequired(),
	updated_at: yup.string().notRequired(),
});

export const NewAlbum = () => {
	const setAlbumsState = useSetRecoilState(albumListState);

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

			await AlbumUseCase.create(newData);
			const res = await AlbumUseCase.getAll();
			setAlbumsState(res);

			reset();

			toast.success("album created");
		} catch (error) {
			toast.error("failed to create album");
		}
	};

	return (
		<div className="container-new-album">
			<div className="content-new-album">
				<h3>New Album</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="">Name</label>
					<input {...register("name")} type="text" />
					{errors?.name && <span>{errors?.name?.message} </span>}
					<label htmlFor="">Length</label>
					<input {...register("length")} type="number" />
					{errors?.length && <span>{errors.length.message}</span>}
					<button>Add</button>
				</form>
			</div>
		</div>
	);
};
