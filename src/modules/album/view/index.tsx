import React from "react";
import { Footer } from "../../../components/Footer";
import { Header } from "../../../components/Header";
import { ListAlbum } from "./ListAlbum";
import { NewAlbum } from "./NewAlbum";
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
			<Footer />
		</React.Fragment>
	);
};
