import { LocaleParser } from "@libs/localeParser";
import { useRouter } from "next/router";
import { FC } from "react";
import Counter from "react-countup";
import styles from "./index.module.scss";
import { motion, Variants } from "framer-motion";

const container: Variants = {
	hidden: {
		opacity: 1,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

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
				<motion.div className={styles.first} variants={container}>
					<div className={styles.item}>
						<div className={styles.itemContent}>
							<motion.h4 variants={item}>
								<Counter end={total} />
							</motion.h4>
							<motion.div className={styles.text} variants={item}>
								{parser.get("total_files")}
							</motion.div>
						</div>
					</div>
				</motion.div>
				<motion.div className={styles.second} variants={container}>
					<div className={styles.item}>
						<div className={styles.itemContent}>
							<motion.h4 variants={item}>
								<Counter end={fork} />
							</motion.h4>
							<motion.div className={styles.text} variants={item}>
								{parser.get("forks")}
							</motion.div>
						</div>
					</div>
				</motion.div>
				<motion.div className={styles.third} variants={container}>
					<div className={styles.item}>
						<div className={styles.itemContent}>
							<motion.h4 variants={item}>
								<Counter end={paste} />
							</motion.h4>
							<motion.div className={styles.text} variants={item}>
								{parser.get("your_files")}
							</motion.div>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};

export default DashboardStats;
