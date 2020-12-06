import { FC } from "react";
import Link from "next/link";
import styles from "./index.module.scss";

export interface CardProps {
	name: string;
	link: string;
}

const Card: FC<CardProps> = (props) => {
	const { name, link } = props;
	return (
		<Link href={link}>
			<div className={styles.wrapper}>
				<span className={`${styles.iconHidden} material-icons-round`}>
					text_snippet
				</span>
				<span className={`${styles.icon} material-icons-round`}>text_snippet</span>
				<div className={styles.name}>
					<p>{name}</p>
				</div>
			</div>
		</Link>
	);
};

export default Card;
