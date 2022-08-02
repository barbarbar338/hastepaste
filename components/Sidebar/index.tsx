import { FC } from "react";
import SidebarItem from "../SidebarItem";
import Icon from "@assets/icons/default-defaultnobg2048.png";
import styles from "./index.module.scss";
import { useRouter } from "next/dist/client/router";
import { LocaleParser } from "@libs/localeParser";
import {
	FiGithub,
	FiHome,
	FiGlobe,
	FiInfo,
	FiUsers,
	FiFile,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

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
			Icon: FiHome,
		},
		{
			name: "GitHub",
			path: "https://github.com/barbarbar338/hastepaste",
			Icon: FiGithub,
		},
		{
			name: parser.get("tos") as string,
			path: "/tos",
			Icon: FiInfo,
		},
		{
			name: parser.get("guide") as string,
			path: "/guide",
			Icon: FiFile,
		},
		{
			name: parser.get("translate") as string,
			path: "https://crowdin.com/project/hastepaste",
			Icon: FiGlobe,
		},
		{
			name: parser.get("status") as string,
			path: "https://status.hastepaste.xyz",
			Icon: FiInfo,
		},
		{
			name: parser.get("team") as string,
			path: "/team",
			Icon: FiUsers,
		},
	];

	return (
		<div className={open ? styles.navbarOpen : styles.navbarClose}>
			<Link href="/" passHref>
				<div className={styles.navBanner}>
					<div className={styles.wrapper}>
						<div className="w-24 h-24">
							<Image
								src={Icon.src}
								alt="HastePaste"
								blurDataURL={Icon.blurDataURL}
								width={Icon.width}
								height={Icon.height}
							/>
						</div>
						<a className="text-white">HastePaste</a>
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
