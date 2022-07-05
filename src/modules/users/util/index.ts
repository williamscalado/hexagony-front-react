const getAvatar = (gender: string) => {
	let urlAvatar = null;
	switch (gender) {
		case "male":
			urlAvatar = "avatar-male.png";
			break;
		case "female":
			urlAvatar = "avatar-fale.png";
			break;
		case "unknown":
			urlAvatar = "user-avatar.png";
			break;
	}

	return urlAvatar;
};

const getFirstName = (fullName: string) => {
	const firstName = fullName.split(" ").slice(0, 2)[0];
	return firstName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

export const userUtil = {
	getAvatar,
	getFirstName,
};
