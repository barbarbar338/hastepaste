import { FC } from "react";
import PropTypes from "prop-types";

export interface CardProps {
	name: string;
	link: string;
}

const Card: FC<CardProps> = (props) => {
	const { name, link } = props;
	return (
		<a
			href={link}
			target="_blank"
			className="flex flex-col items-center justify-center bg-white rounded-md shadow"
		>
			<span
				className="hidden text-blue-500 material-icons-round md:block"
				style={{ fontSize: "128px" }}
			>
				folder
			</span>
			<span
				className="block text-blue-500 material-icons-round md:hidden"
				style={{ fontSize: "72px" }}
			>
				folder
			</span>
			<div className="flex items-center justify-center w-full px-2 py-2 border-t border-gray-200 rounded-b-md">
				<p className="text-sm text-black">{name}</p>
			</div>
		</a>
	);
};

Card.propTypes = {
	name: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
};

export default Card;
