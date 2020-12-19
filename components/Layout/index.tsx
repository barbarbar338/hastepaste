import Navbar from "@components/Navbar/index";
import Footer from "@components/Footer/index";
import { FC } from "react";
import { IUser } from "@libs/useFetchUser";
import styles from "./index.module.scss";

export interface ILayoutProps {
	user?: IUser;
	loading: boolean;
}

const Layout: FC<ILayoutProps> = (props) => {
	const { user, loading, children } = props;
	return (
		<div className={styles.wrapper}>
			<div className={styles.navWrapper}>
				<div className={styles.nav}>
					<Navbar user={user} loading={loading} />
				</div>
			</div>
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
