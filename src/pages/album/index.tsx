import React from "react";
import { Header } from "../../components/header";
import { ListAlbum } from "../../components/listAlbum";
import { NewAlbum } from "../../components/newAlbum";
import "./style.scss";

export const PageAlbum = () => {
	return (
		<React.Fragment>
			<Header />
			<div className="container-albums">
				<section className="content-album">
					<NewAlbum />
					<ListAlbum />
				</section>
			</div>
		</React.Fragment>
	);
};
