import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import * as yup from "yup";
import { AlbumUseCase } from "../../module/album/useCase";
import Api from "../../service/Api";
import "./style.scss";

interface INewAlbum {
	name: string;
	length: number;
}

const newAlbumFormRule: yup.SchemaOf<INewAlbum> = yup.object().shape({
	name: yup.string().required().min(3),
	length: yup.number().typeError("length must be a number").required().min(1),
});

export const NewAlbum = () => {
	const { GetAllAlbum } = AlbumUseCase;
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<INewAlbum>({
		mode: "onBlur",
		reValidateMode: "onBlur",
		shouldFocusError: true,
		resolver: yupResolver(newAlbumFormRule),
	});
	const addNewAlbum = async (data: INewAlbum) => {
		try {
			await Api.post("/album", data);
		} catch (error) {
			toast.error("failed to create album");
		}
	};
	const onSubmit = async (data: INewAlbum) => {
		try {
			const newData: INewAlbum = {
				...data,
				length: +data.length,
			};
			await addNewAlbum(newData);

			reset();
			toast.success("album created");
		} catch (error) {
			console.log(error);
			toast.error("failed to create album");
		}
	};
	return (
		<div className="container-new-album">
			<div className="content-new-album">
				<h3>New Album</h3>
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="">Name</label>
					<input {...register("name", { required: true })} type="text" />
					{errors?.name && <span>{errors?.name?.message} </span>}
					<label htmlFor="">Length</label>
					<input {...register("length", { required: true })} type="number" />
					{errors?.length && <span>{errors.length.message}</span>}
					<button>Add</button>
				</form>
			</div>
		</div>
	);
};
