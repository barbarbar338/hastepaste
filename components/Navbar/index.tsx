import ActiveClass from "@components/ActiveClass/index";
import { IUser } from "@libs/useFetchUser";
import { LocaleParser } from "@libs/localeParser";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useCookies } from "react-cookie";
import styles from "./index.module.scss";

export interface INavbarProps {
	user?: IUser;
	loading: boolean;
}

const Navbar: FC<INavbarProps> = (props) => {
	const { user, loading } = props;
	const [, , removeCookie] = useCookies(["access_token"]);
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	const links = [
		{
			label: parser.get("componens_navbar_home"),
			to: "/",
		},
		{
			label: "GitHub",
			to: "https://github.com/HastePasteApp/",
		},
		{
			label: "ToS",
			to: "/tos",
		},
	];

	const handleLogOut = () => {
		removeCookie("access_token");
		router.push("/");
	};

	return (
		<div className={styles.nav}>
			<input type="checkbox" id="nav-check" className={styles.navCheck} />
			<div className={styles.navHeader}>
				<div className={styles.navTitle}>
					<Link href="/">
						<span>HastePaste</span>
					</Link>
				</div>
			</div>
			<div className={styles.navButton}>
				<label htmlFor="nav-check">
					<span></span>
					<span></span>
					<span></span>
				</label>
			</div>
			<div className={styles.navLinks}>
				{links.map((data, i) => (
					<ActiveClass key={i} activeClassName="text-white" href={data.to}>
						<span className={styles.linkItem}>{data.label}</span>
					</ActiveClass>
				))}
				{loading || !user ? (
					<>
						<ActiveClass activeClassName="text-white" href="/login">
							<span className={styles.linkItem}>
								{parser.get("componens_navbar_login")}
							</span>
						</ActiveClass>
						<ActiveClass activeClassName="text-white" href="/signup">
							<span className={styles.linkItem}>
								{parser.get("componens_navbar_signup")}
							</span>
						</ActiveClass>
					</>
				) : (
					<>
						<ActiveClass activeClassName="text-white" href="/profile">
							<span className={styles.linkItem}>
								{parser.get("componens_navbar_profile")}
							</span>
						</ActiveClass>
						<span className={styles.linkItem} onClick={handleLogOut}>
							{parser.get("componens_navbar_logout")}
						</span>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
