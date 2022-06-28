import "./style.scss";
export const NewAlbum = () => {
	return (
		<div className="container-new-album">
			<div className="content-new-album">
				<h3>New Album</h3>
				<form action="">
					<span>Name</span>
					<input type="text" />
					<span>Length</span>
					<input type="number" />

					<button>Add</button>
				</form>
			</div>
		</div>
	);
};
