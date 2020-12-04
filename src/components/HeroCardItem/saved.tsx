import { FC } from "react";
import PropTypes from "prop-types";

export interface SavedProps {
	name: string;
	description: string;
	link: string;
}

const Saved: FC<SavedProps> = (props) => {
	const { name, description, link } = props;
	return (
		<div>
			<div className="relative flex items-center px-3 py-3 space-x-6 bg-pink-100 rounded-md">
				<span
					className="text-pink-500 select-none material-icons-round"
					style={{ fontSize: "28px" }}
				>
					bookmark
				</span>
				<h1 className="text-gray-700">{name}</h1>
				<p className="text-sm text-gray-400">{description}</p>
				<a href={link} className="flex items-center justify-end flex-1">
					<div className="flex cursor-pointer items-center justify-center p-1.5 bg-white rounded-md">
						<span
							className="text-pink-500 material-icons-round"
							style={{ fontSize: "24px" }}
						>
							open_in_new
						</span>
					</div>
				</a>
			</div>
		</div>
	);
};

Saved.propTypes = {
	name: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default Saved;
