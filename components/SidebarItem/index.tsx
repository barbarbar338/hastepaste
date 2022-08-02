import Link from "next/link";
import { FC } from "react";
import styles from "./index.module.scss";
import { IconType } from "react-icons";

export interface ISidebarItem {
	name: string;
	path: string;
	Icon: IconType;
}

const SidebarItem: FC<ISidebarItem> = ({ path, name, Icon }) => {
	return (
		<Link href={path}>
			<a className={styles.wrapper}>
				<Icon className={styles.icon} />
				<span>{name}</span>
			</a>
		</Link>
	);
};

export default SidebarItem;
