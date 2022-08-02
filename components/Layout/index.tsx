import { FC, ReactNode } from "react";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import Sidebar from "@components/Sidebar";
import Donate from "@components/Donate";
import NavbarDropdown from "../NavbarDropdown";
import styles from "./index.module.scss";
import Footer from "../Footer";
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

export interface ILayoutProps {
	title: string;
	children: ReactNode;
}

const Layout: FC<ILayoutProps> = ({ title, children }) => {
	const [sidebar, setSidebar] = useState(false);

	return (
		<>
			<NextSeo title={title} />
			<div className={styles.wrapper}>
				<div
					className={sidebar ? styles.barsOpen : styles.barsClose}
					onClick={() => setSidebar(false)}
				/>
				<Sidebar open={sidebar} />
				<div className={styles.content}>
					<header>
						<div className={styles.left}>
							<button className={styles.collapse} onClick={() => setSidebar(true)}>
								<FiMenu className={styles.icon} />
							</button>
							<div className={styles.title}>{title} - HastePaste</div>
						</div>
						<div className={styles.right}>
							<NavbarDropdown />
						</div>
					</header>
					<main>
						<motion.div variants={container} initial="hidden" animate="visible">
							<div className={styles.contentWrapper}>
								<Donate />
								{children}
							</div>
							<motion.div variants={item}>
								<Footer />
							</motion.div>
						</motion.div>
					</main>
				</div>
			</div>
		</>
	);
};

export default Layout;
