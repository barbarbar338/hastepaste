import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import styles from "./index.module.scss";
import { useRouter } from "next/dist/client/router";
import { LocaleParser } from "@libs/localeParser";
import Image from "next/image";

export default function NavbarDropdown(): JSX.Element {
	const [dropdown, setDropdown] = useState(false);
	const { data: session } = useSession();
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	return (
		<div className={styles.wrapper}>
			{session ? (
				<>
					<button onClick={() => setDropdown(!dropdown)} className={styles.imageBtn}>
						<Image
							className="h-full w-full object-cover"
							src={
								session.user.image
									? session.user.image
									: session.user.email
									? `https://avatars.dicebear.com/api/avataaars/${session.user.email}.svg`
									: "https://avatars.dicebear.com/api/avataaars/hastepaste.svg"
							}
							alt="Avatar"
							layout="fill"
						/>
					</button>
					<div
						className={dropdown ? styles.closeBlockOpen : styles.closeBlockClose}
						onClick={() => setDropdown(false)}
					/>
					<div className={dropdown ? styles.dropdownOpen : styles.dropdownClose}>
						<Link href="/dashboard">
							<a className={`${styles.linkItem} cursor-pointer`}>
								{parser.get("dashboard")}
							</a>
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
