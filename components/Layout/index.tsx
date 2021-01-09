import { FC } from "react";
import { NextSeo } from "next-seo";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "@components/Sidebar";
import NavbarDropdown from "../NavbarDropdown";
import styles from "./index.module.scss";
import Footer from "../Footer";

export interface ILayoutProps {
	title: string;
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
								<FontAwesomeIcon className={styles.icon} icon={faBars} />
							</button>
							<div className={styles.title}>{title} - HastePaste</div>
						</div>
						<div className={styles.right}>
							<NavbarDropdown />
						</div>
					</header>
					<main>
						<div className={styles.contentWrapper}>{children}</div>
						<Footer />
					</main>
				</div>
			</div>
		</>
	);
};

export default Layout;
