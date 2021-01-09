import Layout from "@components/Layout";
import { LocaleParser } from "@libs/localeParser";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@styles/modules/404.module.scss";

export default function NotFoundPage(): JSX.Element {
    const router = useRouter();
    const parser = new LocaleParser(router.locale);

	return (
		<Layout title="404">
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<div className={styles.fix}>
						<div className={styles.title}>404</div>
						<p className={styles.short}>
							{parser.get("not_found_desc")}
						</p>
						<p className={styles.long}>
                            {parser.get("not_found_long_desc")}
						</p>

						<Link href="/">
                            <span className={styles.btn}>
                                {parser.get("go_home")}
                            </span>
						</Link>
					</div>
				</div>
			</div>
		</Layout>
	);
}
