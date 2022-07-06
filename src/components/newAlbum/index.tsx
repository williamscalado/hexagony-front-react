import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRecoilState, useSetRecoilState } from "recoil";
import * as yup from "yup";
import { AlbumUseCase, IAlbums } from "../../modules/album/useCase";
import { albumListState, albumUpdateState } from "../../state/albumState";
import "./style.scss";

const newAlbumFormRule: yup.SchemaOf<IAlbums> = yup.object().shape({
	id: yup.string().notRequired(),
	name: yup.string().required("full name is a required field").min(3),
	length: yup.number().typeError("length must be a number").required().min(1),
	created_at: yup.string().notRequired(),
	updated_at: yup.string().notRequired(),
});

const InitialUpdate = {
	id: "",
	name: "",
	length: 1,
};

export const NewAlbum = () => {
	const setAlbumsState = useSetRecoilState(albumListState);
	const updateAlbum = useRecoilState(albumUpdateState);
	const setUpdateAlbum = useSetRecoilState(albumUpdateState);

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

	const isEdition = React.useMemo(
		() => ({
			id: updateAlbum[0].id,
			name: updateAlbum[0].name || "",
			length: updateAlbum[0].length || 1,
		}),
		[updateAlbum]
	);

	const setFields = React.useCallback(() => {
		if (isEdition?.id) {
			reset({ name: isEdition.name, length: isEdition.length });
			return;
		}
		reset({ name: "", length: 1 });
	}, [isEdition.id, isEdition.name, isEdition.length, reset]);

	React.useEffect(() => {
		setFields();
	}, [setFields]);

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
			reset({ name: "", length: 1 });
			toast.success(updateStatus ? "album updated" : "album created");
		} catch (error) {
			toast.error(
				updateAlbum[0]?.id ? "failed to update album" : "failed to create album"
			);
		}
	};

	return (
		<div className="container-new-album">
			<div className="content-new-album">
				<form onSubmit={handleSubmit(onSubmit)}>
					<label htmlFor="">Name</label>
					<input {...register("name")} type="text" />
					{errors?.name && <span>{errors?.name?.message} </span>}
					<label htmlFor="">Length</label>
					<input {...register("length")} type="number" />
					{errors?.length && <span>{errors.length.message}</span>}
					<button>Save</button>
				</form>
			</div>
		</div>
	);
};
