import { Header } from "../../components/header";
import { ListAlbum } from "../../components/listAlbum";
import { NewAlbum } from "../../components/newAlbum/intex";
import "./style.scss";
export const PageAlbum = () => {
	return (
		<>
			<Header />
			<div className="container-albums">
				<section className="content-album">
					<NewAlbum />
					<ListAlbum />
				</section>
			</div>
		</>
	);
};
