import { FC } from "react";
import PropTypes from "prop-types";
import Link from "next/link";

export interface PublishedProps {
	name: string;
	description: string;
	link: string;
}

const Published: FC<PublishedProps> = (props) => {
	const { name, description, link } = props;
	return (
		<Link href={link}>
			<div className="flex items-center px-3 py-3 space-x-6 bg-pink-100 cursor-pointer rounded-md">
				<span
					className="text-pink-500 select-none material-icons-round"
					style={{ fontSize: "28px" }}
				>
					folder
				</span>
				<h1 className="text-gray-700">{name}</h1>
				<p className="text-sm text-gray-400">
					{description
						? description.length > 30
							? description.slice(0, 30) + "..."
							: description
						: "My awesome file!"}
				</p>
				<div className="flex items-center justify-end flex-1">
					<div className="flex items-center justify-center p-1.5 bg-white rounded-md">
						<span
							className="text-pink-500 material-icons-round"
							style={{ fontSize: "24px" }}
						>
							content_copy
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

Published.propTypes = {
	name: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default Published;
