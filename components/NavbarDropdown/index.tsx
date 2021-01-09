import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";
import styles from "./index.module.scss";
import { useRouter } from "next/dist/client/router";
import { LocaleParser } from "@libs/localeParser";

export default function NavbarDropdown(): JSX.Element {
	const [dropdown, setDropdown] = useState(false);
	const [session] = useSession();
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	return (
		<div className={styles.wrapper}>
			{session ? (
				<>
					<button onClick={() => setDropdown(!dropdown)} className={styles.imageBtn}>
						<img
							className="h-full w-full object-cover"
							src={session.user.image}
							alt="Avatar"
						/>
					</button>
					<div
						className={dropdown ? styles.closeBlockOpen : styles.closeBlockClose}
						onClick={() => setDropdown(false)}
					/>
					<div className={dropdown ? styles.dropdownOpen : styles.dropdownClose}>
						<Link href="/dashboard">
							<span className={`${styles.linkItem} cursor-pointer`}>
								{parser.get("dashboard")}
							</span>
						</Link>
						<button
							className={`${styles.linkItem} text-left w-full`}
							onClick={() => signOut()}
						>
							{parser.get("logout")}
						</button>
					</div>
				</>
			) : (
				<button className={styles.btn} onClick={() => signIn()}>
					{parser.get("login")}
				</button>
			)}
		</div>
	);
}
