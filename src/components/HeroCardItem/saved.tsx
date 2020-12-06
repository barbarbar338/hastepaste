import { FC } from "react";
import Link from "next/link";
import styles from "./index.module.scss";

export interface SavedProps {
	name: string;
	description?: string;
	link: string;
}

const Saved: FC<SavedProps> = (props) => {
	const { name, description, link } = props;
	return (
		<Link href={link}>
			<div className={styles.wrapper}>
				<span className={`${styles.icon} material-icons-round`}>bookmark</span>
				<h1 className={styles.header}>{name}</h1>
				<p className={styles.description}>
					{description
						? description.length > 30
							? description.slice(0, 30) + "..."
							: description
						: "My awesome file!"}
				</p>
				<div className={styles.link}>
					<div className={styles.iconWrapper}>
						<span className={`${styles.icon} material-icons-round`}>open_in_new</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Saved;
