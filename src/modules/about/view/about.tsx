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
						<a
							href="https://www.linkedin.com/in/cyro-dubeux-45085b155/?locale=en_US"
							target="_blank"
							rel="noreferrer"
						>
							<GrLinkedin />
						</a>

						<a
							href="https://github.com/cyruzin"
							target="_blank"
							rel="noreferrer"
						>
							<BsGithub />
						</a>
						<a
							href="mailto:mailto:mailto:yourmail@domain.com"
							target="_blank"
							rel="noreferrer"
						>
							<AiOutlineMail />
						</a>

						<a
							href="https://twitter.com/beerinjection"
							target="_blank"
							rel="noreferrer"
						>
							<BsTwitter />
						</a>
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
						<a
							href="https://www.linkedin.com/in/williams-calado-46125b111/"
							target="_blank"
							rel="noreferrer"
						>
							<GrLinkedin />
						</a>
						<a
							href="https://github.com/williamscalado/"
							target="_blank"
							rel="noreferrer"
						>
							<BsGithub />
						</a>

						<a
							href="mailto:mailto:williamscalado@gmail.com"
							target="_blank"
							rel="noreferrer"
						>
							<AiOutlineMail />
						</a>

						<a
							href="https://twitter.com/williamscalado"
							target="_blank"
							rel="noreferrer"
						>
							<BsTwitter />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
