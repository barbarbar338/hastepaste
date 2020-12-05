import { FC } from "react";

export interface IBarLoader {
	dark?: boolean;
}

const BarLoader: FC<IBarLoader> = (props) => {
	const { dark } = props;
	return (
		<div className="loader">
			<div style={{ backgroundColor: dark ? "#000" : "#fff" }} />
			<div style={{ backgroundColor: dark ? "#000" : "#fff" }} />
			<div style={{ backgroundColor: dark ? "#000" : "#fff" }} />
		</div>
	);
};

export default BarLoader;
