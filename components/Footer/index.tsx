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
							<a href="https://github.com/barbarbar338" className={styles.pink}>
								barbarbar338
							</a>{" "}
							using{" "}
							<a href="http://nextjs.org/" className={styles.gray}>
								NextJS
							</a>
							,{" "}
							<a href="https://tailwindcss.com/" className={styles.blue}>
								TailwindCSS
							</a>{" "}
							and{" "}
							<a href="https://supabase.io/" className={styles.green}>
								Supabase
							</a>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
