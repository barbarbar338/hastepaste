import { NextSeo } from "next-seo";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFetchUser } from "@libs/useFetchUser";
import { useRouter } from "next/router";
import BarLoader from "@components/BarLoader";
import CONFIG from "src/config";
import Layout from "@components/Layout/index";
import styles from "@styles/modules/index.module.scss";
import { LocaleParser } from "@libs/localeParser";

export default function IndexPage(): JSX.Element {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [paste, setPaste] = useState("");
	const [loading, setLoading] = useState(false);
	const { user, loading: userLoading } = useFetchUser(false);
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	const createPaste = async () => {
		console.log(router.locale);
		return;
		if (loading) return;
		if (!title)
			return toast.error(
				`❌ ${parser.get("pages_index_create_handler_title_error")}`,
			);
		if (!paste)
			return toast.error(
				`❌ ${parser.get("pages_index_create_handler_content_error")}`,
			);
		setLoading(true);
		const headers = { "Content-Type": "application/json" };
		if (user && user.access_token) headers["Authorization"] = user.access_token;
		const res = await fetch(`${CONFIG.API_URL}/paste`, {
			method: "POST",
			headers,
			body: JSON.stringify({ paste, title, description }),
		});
		if (!res.ok) return toast.error(`❌ ${parser.get("api_error")}`);
		const body = await res.json();
		setLoading(false);
		router.push(`/explore?id=${encodeURIComponent(body.data.id)}`);
	};

	return (
		<Layout user={user} loading={userLoading}>
			<NextSeo title={parser.get("pages_index_title") as string} />
			<div className={styles.hero}>
				<div>
					<h1>{parser.get("pages_index_title")}</h1>
					<p>{parser.get("pages_index_description")}</p>
				</div>
			</div>
			<div className={styles.content}>
				<ul className={styles.list}>
					<li className={styles.smInput}>
						<p>{parser.get("pages_index_content_paste_name")}</p>
						<input
							placeholder={
								parser.get("pages_index_content_paste_name_placeholder") as string
							}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<span className={styles.required}>{parser.get("required")}</span>
					</li>
					<li className={styles.smInput}>
						<p>{parser.get("pages_index_content_paste_description")}</p>
						<input
							placeholder={
								parser.get(
									"pages_index_content_paste_description_placeholder",
								) as string
							}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</li>
					<li className={styles.paste}>
						<p>{parser.get("pages_index_content_paste_content")}</p>
						<textarea
							placeholder={
								parser.get("pages_index_content_paste_content_placeholder") as string
							}
							onChange={(e) => setPaste(e.target.value)}
						/>
						<span className={styles.required}>{parser.get("required")}</span>
					</li>
					<button onClick={createPaste}>
						{loading ? <BarLoader /> : parser.get("pages_index_create")}
					</button>
				</ul>
			</div>
		</Layout>
	);
}
