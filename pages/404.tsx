import Layout from "@components/Layout";
import { LocaleParser } from "@libs/localeParser";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@styles/modules/404.module.scss";
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
		y: 20,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
	},
};

export default function NotFoundPage(): JSX.Element {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	return (
		<Layout title="404">
			<motion.div
				className={styles.wrapper}
				variants={container}
				initial="hidden"
				animate="visible"
			>
				<div className={styles.content}>
					<div className={styles.fix}>
						<div className={styles.title}>404</div>
						<p className={styles.short}>{parser.get("not_found_desc")}</p>
						<p className={styles.long}>{parser.get("not_found_long_desc")}</p>

						<Link href="/">
							<motion.a className={styles.btn} variants={item}>
								{parser.get("go_home")}
							</motion.a>
						</Link>
					</div>
				</div>
			</motion.div>
		</Layout>
	);
}
