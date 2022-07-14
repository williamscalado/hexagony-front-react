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

interface IMenuMock {
	name: string;
	link: string;
	icon?: string;
	desktop?: boolean;
}

interface IconsKeys {
	[key: string]: string | any;
}

const menuMock: IMenuMock[] = [
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
		link: "/about",
		icon: "iconLogout",
		desktop: false,
	},
];

const getIconMenu = (icon: string) => {
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

	function handleLogout() {
		FormUseCase.logout();
		navigate("/login");
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
								{menuMock &&
									menuMock
										.filter((item) => item.desktop === true)
										.map((item) => {
											return (
												<li>
													<Link to={item.link}>{item.name}</Link>
												</li>
											);
										})}
							</ul>
							<button onClick={handleLogout}>
								<GiExitDoor className="btn-icon" />
								Logout
							</button>
						</nav>
					</div>
				</div>
				<nav className="menu-navigate-mobile">
					<Menu width={"60%"}>
						<ul>
							{menuMock &&
								menuMock.map((item) => {
									return (
										<li>
											<Link to={item.link}>
												{item.icon && getIconMenu(item.icon)}

												<span>{item.name}</span>
											</Link>
										</li>
									);
								})}
						</ul>
					</Menu>
				</nav>
			</div>
		</React.Fragment>
	);
};
