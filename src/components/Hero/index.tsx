import { FC } from "react";
import styles from "./index.module.scss";

export interface HeroProps {
	mail: string;
}

const Hero: FC<HeroProps> = ({ mail }) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1>
					Hello <span>{mail}</span>
				</h1>
				<p>Welcome to the island of HastePaste.</p>
			</div>
		</div>
	);
};

export default Hero;
