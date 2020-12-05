import { FC } from "react";
import PropTypes from "prop-types";

export interface HeroProps {
	mail: string;
}

const Hero: FC<HeroProps> = ({ mail }) => {
	return (
		<div className="container flex flex-col items-center max-w-screen-xl px-16 pt-10 pb-32 mx-auto sm:flex-row">
			<div className="flex flex-col w-full pb-10 text-center sm:pb-0 sm:text-left">
				<h1 className="text-4xl text-white">
					Hello <span className="font-semibold">{mail}</span>
				</h1>
				<p className="text-xl text-white">Welcome to the island of HastePaste.</p>
			</div>
		</div>
	);
};

Hero.propTypes = {
	mail: PropTypes.string.isRequired,
};

export default Hero;
