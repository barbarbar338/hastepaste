import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import styles from "./index.module.scss";
const array = new Array(24).fill("a");

function BulletLoader(): JSX.Element {
	return (
		<div className={styles.bulletSkeleton}>
			<span className={`${styles.icon} material-icons-round`}>text_snippet</span>
			<h1 className={styles.header}>
				<Skeleton>
					<Typography>{array.join("")}</Typography>
				</Skeleton>
			</h1>
			<Skeleton>
				<Typography>{array.join("")}</Typography>
			</Skeleton>
			<a className={styles.copy}>
				<div className={styles.wrapper}>
					<span className={`${styles.icon} material-icons-round`}>content_copy</span>
				</div>
			</a>
		</div>
	);
}

export default function HeroCards(): JSX.Element {
	return (
		<div className={styles.wrapper}>
			<div className={styles.publishedWrapper}>
				<p className={styles.header}>Your published last files</p>
				<div className={styles.cards}>
					<BulletLoader />
					<BulletLoader />
					<BulletLoader />
					<BulletLoader />
				</div>
			</div>
			<div className={styles.forkedWrapper}>
				<p className={styles.header}>Your forked files</p>
				<div className={styles.cards}>
					<BulletLoader />
					<BulletLoader />
					<BulletLoader />
				</div>
			</div>
		</div>
	);
}
