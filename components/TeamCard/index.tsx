import { LocaleParser } from "@libs/localeParser";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import styles from "./index.module.scss";
import { motion, Variants } from "framer-motion";

export interface ITeamCard {
	name: string;
	title: string;
	site?: string;
	github: string;
	avatar: string;
}

const item: Variants = {
	hidden: {
		x: 20,
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
	},
};

const TeamCard: FC<ITeamCard> = ({ name, title, site, github, avatar }) => {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	return (
		<motion.div className={styles.wrapper} variants={item}>
			<div className={styles.content}>
				<div className={styles.photoWrapper}>
					<img src={avatar} alt="Avatar" />
				</div>
				<div className={styles.cardBody}>
					<h3>{name}</h3>
					<div className={styles.title}>
						<p>{title}</p>
					</div>
					<table className={styles.table}>
						<tbody>
							<tr>
								<td className={styles.tableTitle}>Website</td>
								<td className={styles.tableContent}>
									{site ? (
										<Link href={site}>
											<span className={styles.link}>{site}</span>
										</Link>
									) : (
										parser.get("not_found")
									)}
								</td>
							</tr>
							<tr>
								<td className={styles.tableTitle}>GitHub</td>
								<td className={styles.tableContent}>
									<Link href={`https://github.com/${github}`}>
										<span className={styles.link}>@{github}</span>
									</Link>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</motion.div>
	);
};

export default TeamCard;
