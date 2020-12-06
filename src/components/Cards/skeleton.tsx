import CardSkeleton from "@components/Card/skeleton";
import styles from "./index.module.scss";
const array = new Array(12).fill(0);

export default function Cards(): JSX.Element {
	return (
		<div className={styles.wrapper}>
			<p className={styles.header}>Your files</p>
			<div className={styles.myGrid}>
				{array.map((card, i) => (
					<CardSkeleton key={i} />
				))}
			</div>
		</div>
	);
}
