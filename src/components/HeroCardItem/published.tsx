import { FC } from "react";
import Link from "next/link";
import styles from "./index.module.scss";

export interface PublishedProps {
	name: string;
	description?: string;
	link: string;
}

const Published: FC<PublishedProps> = (props) => {
	const { name, description, link } = props;
	return (
		<Link href={link}>
			<div className={styles.wrapper}>
				<span className={`${styles.icon} material-icons-round`}>text_snippet</span>
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
						<span className={`${styles.icon} material-icons-round`}>
							content_copy
						</span>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Published;
