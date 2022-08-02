import { FC } from "react";
import Link from "next/link";
import { FiScissors, FiFolder } from "react-icons/fi";
import { useRouter } from "next/router";
import { LocaleParser } from "@libs/localeParser";
import styles from "./index.module.scss";

export interface IDasboardItem {
	fork?: string;
	title: string;
	description?: string;
	reported?: boolean;
	id: string;
}

const DashboardItem: FC<IDasboardItem> = ({
	fork,
	title,
	description,
	reported,
	id,
}) => {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	return (
		<tr>
			<td className={styles.td}>
				<div className={styles.iconWrapper}>
					{fork ? (
						<FiScissors className={styles.icon} />
					) : (
						<FiFolder className={styles.icon} />
					)}
				</div>
			</td>
			<td className={styles.td}>
				<div className={styles.titleWrapper}>
					<div className={styles.title}>{title}</div>
				</div>
			</td>
			<td className={styles.td}>
				<div className={styles.description}>{description}</div>
			</td>
			<td className={styles.td}>
				<span className={reported ? styles.reported : styles.active}>
					{reported ? parser.get("reported") : parser.get("active")}
				</span>
			</td>
			<td className={styles.linkWrapper}>
				<Link href={`/${encodeURIComponent(id)}`}>
					<a>{parser.get("view")}</a>
				</Link>
			</td>
		</tr>
	);
};

export default DashboardItem;
