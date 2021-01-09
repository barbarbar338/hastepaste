import Link from "next/link";
import styles from "./index.module.scss";

export default function Footer(): JSX.Element {
	return (
		<footer className={styles.wrapper}>
			<div className={styles.content}>
				<div className={styles.items}>
					<div>
						<span>Copyright © 2020 HastePaste. All Rights Reserved.</span>
					</div>
					<div className={styles.right}>
						<div className={styles.text}>
							Made with <span className={styles.red}>❤</span> by{" "}
							<Link href="https://github.com/barbarbar338">
								<span className={styles.pink}>barbarbar338</span>
							</Link>{" "}
							using{" "}
							<Link href="http://nextjs.org/">
								<span className={styles.gray}>NextJS</span>
							</Link>
							,{" "}
							<Link href="https://tailwindcss.com/">
								<span className={styles.blue}>TailwindCSS</span>
							</Link>{" "}
							and{" "}
							<Link href="https://supabase.io/">
								<span className={styles.green}>Supabase</span>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
