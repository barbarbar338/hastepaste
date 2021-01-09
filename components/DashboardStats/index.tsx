import { LocaleParser } from "@libs/localeParser";
import { useRouter } from "next/router";
import { FC } from "react";
import Counter from "react-countup";
import styles from "./index.module.scss";

export interface IDashboardStats {
	total: number;
	fork: number;
	paste: number;
}

const DashboardStats: FC<IDashboardStats> = ({ total, fork, paste }) => {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);
	return (
		<div className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.first}>
					<div className={styles.item}>
						<div className={styles.itemContent}>
							<h4>
								<Counter end={total} />
							</h4>
							<div className={styles.text}>{parser.get("total_files")}</div>
						</div>
					</div>
				</div>
				<div className={styles.second}>
					<div className={styles.item}>
						<div className={styles.itemContent}>
							<h4>
								<Counter end={fork} />
							</h4>
							<div className={styles.text}>{parser.get("forks")}</div>
						</div>
					</div>
				</div>
				<div className={styles.third}>
					<div className={styles.item}>
						<div className={styles.itemContent}>
							<h4>
								<Counter end={paste} />
							</h4>
							<div className={styles.text}>{parser.get("your_files")}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardStats;
