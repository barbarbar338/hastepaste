import { FC } from "react";
import styles from "./index.module.scss";

export interface IBarLoader {
	dark?: boolean;
}

const BarLoader: FC<IBarLoader> = (props) => {
	const { dark } = props;
	return (
		<div className={styles.loader}>
			<div style={{ backgroundColor: dark ? "#000" : "#fff" }} />
			<div style={{ backgroundColor: dark ? "#000" : "#fff" }} />
			<div style={{ backgroundColor: dark ? "#000" : "#fff" }} />
		</div>
	);
};

export default BarLoader;
