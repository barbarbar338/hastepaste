import Layout from "@components/Layout";
import { useFetchUser } from "@libs/useFetchUser";
import { NextSeo } from "next-seo";
import styles from "@styles/modules/404.module.scss";
import { LocaleParser } from "@libs/localeParser";
import { useRouter } from "next/router";

export default function NotFound(): JSX.Element {
	const { user, loading } = useFetchUser(false);
	const router = useRouter();
	const parser = new LocaleParser(router.locale);
	return (
		<Layout user={user} loading={loading}>
			<NextSeo title={parser.get("pages_404_header") as string} />
			<div className={styles.hero}>
				<div>
					<h1>404</h1>
					<p>{parser.get("pages_404")}</p>
				</div>
			</div>
		</Layout>
	);
}
