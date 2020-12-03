import { FC } from "react";
import PropTypes from "prop-types";

export interface PublishedProps {
	name: string;
	description: string;
	link: string;
}

const Published: FC<PublishedProps> = (props) => {
	const { name, description, link } = props;
	return (
		<div>
			<div className="flex items-center px-3 py-3 space-x-6 bg-blue-100 rounded-md">
				<span
					className="text-blue-500 select-none material-icons-round"
					style={{ fontSize: "28px" }}
				>
					folder
				</span>
				<h1 className="text-gray-700">{name}</h1>
				<p className="text-sm text-gray-400">{description}</p>
				<a href={link} className="flex items-center justify-end flex-1">
					<div className="flex cursor-pointer items-center justify-center p-1.5 bg-white rounded-md">
						<span
							className="text-blue-500 material-icons-round"
							style={{ fontSize: "24px" }}
						>
							content_copy
						</span>
					</div>
				</a>
			</div>
		</div>
	);
};

Published.propTypes = {
	name: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default Published;
