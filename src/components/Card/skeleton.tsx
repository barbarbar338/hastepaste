import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import styles from "./index.module.scss";

export default function Card(): JSX.Element {
	return (
		<div className={styles.wrapper}>
			<span className={`${styles.iconHidden} material-icons-round`}>
				text_snippet
			</span>
			<span className={`${styles.icon} material-icons-round`}>text_snippet</span>
			<div className={styles.name}>
				<Typography variant="caption">
					<Skeleton />
				</Typography>
			</div>
		</div>
	);
}
