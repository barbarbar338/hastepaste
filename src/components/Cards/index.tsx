import Card from "@components/Card/index";
import { FC } from "react";
import styles from "./index.module.scss";

export interface ICards {
	paste: {
		id: string;
		title: string;
		description?: string;
		[key: string]: unknown;
	}[];
}

const Cards: FC<ICards> = ({ paste }) => {
	return (
		<div className={styles.wrapper}>
			<p className={styles.header}>Your files</p>
			<div className={styles.myGrid}>
				{paste.map((i, idx) => (
					<Card
						key={idx}
						name={i.title}
						link={`/explore?id=${encodeURIComponent(i.id)}`}
					/>
				))}
			</div>
		</div>
	);
};

export default Cards;
