import { FC, useState } from "react";
import PropTypes from "prop-types";

export interface FileHeaderProps {
	name: string;
	description: string;
}

const FileHeader: FC<FileHeaderProps> = (props) => {
	const { name, description } = props;
	const [active, setActive] = useState(false);
	return (
		<div className="bg-blue-500">
			<div className="container max-w-screen-xl px-4 py-12 mx-auto md:px-0">
				<div className="flex items-center space-x-4">
					<span
						className="text-white material-icons-round"
						style={{ fontSize: "100px" }}
					>
						folder
					</span>
					<div className="flex w-full">
						<div className="flex flex-col">
							<h1 className="text-2xl font-semibold text-white">{name}</h1>
							<p className="text-sm font-normal text-blue-100">{description}</p>
						</div>
						<div className="flex items-center justify-end flex-1">
							<button
								onClick={() => setActive(!active)}
								className={`text-${
									active !== true ? "blue" : "green"
								}-500 text-sm bg-white flex items-center rounded-lg px-4 md:px-8 py-2.5 focus:outline-none`}
							>
								{active !== true ? (
									<span className="mr-1 text-blue-500 material-icons-round">
										bookmark
									</span>
								) : (
									<span className="mr-1 text-green-500 material-icons-round">check</span>
								)}
								{active !== true ? "Save" : "Saved"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

FileHeader.propTypes = {
	name: PropTypes.string.isRequired,
	description: PropTypes.string.isRequired,
};

export default FileHeader;
