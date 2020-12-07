import { NextSeo } from "next-seo";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFetchUser } from "@libs/useFetchUser";
import { useRouter } from "next/router";
import BarLoader from "@components/BarLoader";
import CONFIG from "src/config";
import Layout from "@components/Layout/index";
import styles from "@styles/modules/index.module.scss";

export default function IndexPage(): JSX.Element {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [paste, setPaste] = useState("");
	const [loading, setLoading] = useState(false);
	const { user, loading: userLoading } = useFetchUser(false);
	const router = useRouter();

	const createPaste = async () => {
		if (loading) return;
		if (!title) return toast.error("❌ Please specify the title of your paste.");
		if (!paste)
			return toast.error("❌ Please specify the content of your paste.");
		setLoading(true);
		const headers = { "Content-Type": "application/json" };
		if (user && user.access_token) headers["Authorization"] = user.access_token;
		const res = await fetch(`${CONFIG.API_URL}/paste`, {
			method: "POST",
			headers,
			body: JSON.stringify({ paste, title, description }),
		});
		if (!res.ok)
			return toast.error("❌ An error occured. Please try again later");
		const body = await res.json();
		setLoading(false);
		router.push(`/explore?id=${encodeURIComponent(body.data.id)}`);
	};

	return (
		<Layout user={user} loading={userLoading}>
			<NextSeo title="Create Paste" />
			<div className={styles.hero}>
				<div>
					<h1>Create Paste</h1>
					<p>
						Take your content on a journey through the magic world of HastePaste!
					</p>
				</div>
			</div>
			<div className={styles.content}>
				<ul className={styles.list}>
					<li className={styles.smInput}>
						<p>Paste Name</p>
						<input
							placeholder="My awesome paste!"
							onChange={(e) => setTitle(e.target.value)}
						/>
						<span className={styles.required}>* Required.</span>
					</li>
					<li className={styles.smInput}>
						<p>Description</p>
						<input
							placeholder="Take a look at this paste"
							onChange={(e) => setDescription(e.target.value)}
						/>
					</li>
					<li className={styles.paste}>
						<p>Paste Content</p>
						<textarea
							placeholder="Hey take a look at this"
							onChange={(e) => setPaste(e.target.value)}
						/>
						<span className={styles.required}>* Required.</span>
					</li>
					<button onClick={createPaste}>
						{loading ? <BarLoader /> : "Create!"}
					</button>
				</ul>
			</div>
		</Layout>
	);
}
