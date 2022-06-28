import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import "./style.scss";

interface INewAlbum {
	name: string;
	length: string;
}

const newAlbumFormRule: yup.SchemaOf<INewAlbum> = yup.object().shape({
	name: yup.string().required().min(3),
	length: yup.string().required().min(1),
});

export const NewAlbum = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<INewAlbum>({
		mode: "onBlur",
		reValidateMode: "onBlur",
		shouldFocusError: true,
		resolver: yupResolver(newAlbumFormRule),
	});

	const onSubmit = async (data: INewAlbum) => {
		console.log(data);
		return data;
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
