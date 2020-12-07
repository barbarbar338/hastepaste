import Layout from "@components/Layout";
import { useFetchUser } from "@libs/useFetchUser";
import { NextSeo } from "next-seo";
import styles from "@styles/modules/404.module.scss";

export default function NotFound(): JSX.Element {
	const { user, loading } = useFetchUser(false);

	return (
		<Layout user={user} loading={loading}>
			<NextSeo title="Page Not Found" />
			<div className={styles.hero}>
				<div>
					<h1>404</h1>
					<p>Page not found...</p>
				</div>
			</div>
		</Layout>
	);
}
