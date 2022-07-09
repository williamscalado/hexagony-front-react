import { AiOutlineMail } from "react-icons/ai";
import { BsGithub, BsTwitter } from "react-icons/bs";
import { GrLinkedin } from "react-icons/gr";
import "./style.scss";
export const About = () => {
	return (
		<div className="container-about">
			<div className="content-about">
				<div className="content-profile">
					<img src="../../../assets/image/cyro_about.jpg" alt="" />
					<div className="profile">
						<span>
							<strong>Cyro Dubeux</strong>
						</span>
						<span> Software Engineer</span>
					</div>
					<div className="icon-social">
						<GrLinkedin />
						<BsGithub />
						<AiOutlineMail />
						<BsTwitter />
					</div>
				</div>

				<div className="content-profile">
					<img src="../../../assets/image/williams_about.jpg" alt="" />
					<div className="profile">
						<span>
							<strong>Williams Calado</strong>
						</span>
						<span>
							Front-end Develop Jr | Postgraduate in Software Engineering
						</span>
					</div>

					<div className="icon-social">
						<GrLinkedin />
						<BsGithub />
						<AiOutlineMail />
						<BsTwitter />
					</div>
				</div>
			</div>
		</div>
	);
};
