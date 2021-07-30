import Link from "next/link";
import { FC } from "react";
import styles from "./index.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

export interface ISidebarItem {
	name: string;
	path: string;
	icon: IconProp;
}

const SidebarItem: FC<ISidebarItem> = ({ path, name, icon }) => {
	return (
		<Link href={path}>
			<a className={styles.wrapper}>
				<FontAwesomeIcon icon={icon} className={styles.icon} />
				<span>{name}</span>
			</a>
		</Link>
	);
};

export default SidebarItem;
