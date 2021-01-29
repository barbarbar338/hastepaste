import { FC } from "react";
import SidebarItem from "../SidebarItem";
import Icon from "@assets/icons/default-defaultnobg2048.png";
import styles from "./index.module.scss";
import {
	faBalanceScale,
	faFileContract,
	faGlobe,
	faHome,
	faInfo,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/dist/client/router";
import { LocaleParser } from "@libs/localeParser";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";

export interface ISidebar {
	open: boolean;
}

const Sidebar: FC<ISidebar> = ({ open }) => {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);
	const pages = [
		{
			name: parser.get("home") as string,
			path: "/",
			icon: faHome,
		},
		{
			name: "GitHub",
			path: "https://github.com/barbarbar338/hastepaste",
			icon: faGithub,
		},
		{
			name: parser.get("tos") as string,
			path: "/tos",
			icon: faBalanceScale,
		},
		{
			name: parser.get("guide") as string,
			path: "/guide",
			icon: faFileContract,
		},
		{
			name: parser.get("translate") as string,
			path: "https://crowdin.com/project/hastepaste",
			icon: faGlobe,
		},
		{
			name: parser.get("status") as string,
			path: "https://status.hastepaste.xyz",
			icon: faInfo,
		},
		{
			name: parser.get("team") as string,
			path: "/team",
			icon: faUsers,
		},
	];

	return (
		<div className={open ? styles.navbarOpen : styles.navbarClose}>
			<Link href="/">
				<div className={styles.navBanner}>
					<div className={styles.wrapper}>
						<img src={Icon} />
						<span>HastePaste</span>
					</div>
				</div>
			</Link>
			<nav className={styles.items}>
				{pages.map((page, idx) => (
					<SidebarItem {...page} key={idx} />
				))}
			</nav>
		</div>
	);
};

export default Sidebar;
