import React from "react";
import { slide as Menu } from "react-burger-menu";
import { AiOutlineIdcard } from "react-icons/ai";
import { BiUser } from "react-icons/bi";
import { GiExitDoor } from "react-icons/gi";
import { IoAlbumsOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { FormUseCase } from "../../modules/auth/usecase";
import "./style.scss";

interface IMenu {
	name: string;
	link: string;
	icon?: string;
	desktop?: boolean;
}

interface IconsKeys {
	[key: string]: string | any;
}

const menu: IMenu[] = [
	{
		name: "Albums",
		link: "/album",
		icon: "iconAlbums",
		desktop: true,
	},
	{
		name: "Users",
		link: "/users",
		icon: "iconUser",
		desktop: true,
	},
	{
		name: "About",
		link: "/about",
		icon: "iconAbout",
		desktop: true,
	},
	{
		name: "Logout",
		link: "/login",
		icon: "iconLogout",
		desktop: false,
	},
];

const getMenuIcon = (icon: string) => {
	const iconOpc: IconsKeys = {
		iconUser: <BiUser />,
		iconAlbums: <IoAlbumsOutline />,
		iconAbout: <AiOutlineIdcard />,
		iconLogout: <MdOutlineLogout />,
	};

	return iconOpc[icon];
};

export const Header = () => {
	const navigate = useNavigate();

	function handleLogout(path: string) {
		FormUseCase.logout();
		navigate(path);
	}

	return (
		<React.Fragment>
			<div className="container-header">
				<div className="content-header">
					<Link to="/album">
						<img src="../../assets/image/logo_hexagony.png" alt="Hexagony" />
					</Link>
					<div className="content-menu">
						<nav className="menu-navigate">
							<ul>
								{menu &&
									menu
										.filter((item) => item.desktop === true)
										.map((item) => {
											return (
												<li key={item.name}>
													<Link to={item.link}>{item.name}</Link>
												</li>
											);
										})}
							</ul>
							<button onClick={() => handleLogout("/login")}>
								<GiExitDoor className="btn-icon" />
								Logout
							</button>
						</nav>
					</div>
				</div>
				<nav className="menu-navigate-mobile">
					<Menu width={"60%"}>
						<ul>
							{menu &&
								menu.map((item) => {
									return (
										<li
											key={item.name}
											onClick={item.name === 'Logout' ? () => handleLogout("/login") : () => navigate(item.link)}
										>
											<span>{item.icon && getMenuIcon(item.icon)} {item.name}</span>
										</li>
									);
								})}
						</ul>
					</Menu>
				</nav>
			</div>
		</React.Fragment >
	);
};
