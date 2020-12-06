import styles from "./index.module.scss";

export default function HeroSkeleton(): JSX.Element {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1>
					Hello <span>Stranger</span>
				</h1>
				<p>Give us some time to remember you.</p>
			</div>
		</div>
	);
}
