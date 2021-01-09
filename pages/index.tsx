import { LocaleParser } from "@libs/localeParser";
import Layout from "@components/Layout";
import { useRouter } from "next/dist/client/router";
import styles from "@styles/modules/index.module.scss";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/client";
import { supabase } from "@libs/initSupabase";
import { toast } from "react-toastify";
import Preloader from "@assets/preloader.gif";
import { generate as randomString } from "@libs/randomString";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs";

export default function IndexPage(): JSX.Element {
	const [content, setContent] = useState("");
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [checked, setChecked] = useState(false);
	const [session] = useSession();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	const submit = async (e: FormEvent<HTMLFormElement>): Promise<unknown> => {
		e.preventDefault();
		if (loading) return;
		if (!checked) return toast.error(parser.get("agree_terms"));
		if (!title) return toast.error(parser.get("specify_title"));
		if (!content) return toast.error(parser.get("specify_content"));
		setLoading(true);
		const id = randomString();
		const { data, status } = await supabase
			.from("Pastes")
			.insert({
				id,
				owner: session ? session.user.email : null,
				fork: null,
				reported: false,
				description,
				content,
				title,
			})
			.single();
		setLoading(false);
		if (status < 200 || status > 299)
			return toast.warning(parser.get("api_error"));
		router.push(`/${encodeURIComponent(data.id)}`);
	};

	return (
		<Layout title={parser.get("index") as string}>
			<form className={styles.form} onSubmit={submit}>
				<h3 className={styles.title}>{parser.get("index")}</h3>
				<p className={styles.desc}>{parser.get("index_desc")}</p>
				<input
					type="text"
					placeholder={parser.get("paste_name") as string}
					onChange={(e) => setTitle(e.target.value)}
					className={styles.input}
				/>
				<input
					type="text"
					placeholder={parser.get("paste_description") as string}
					onChange={(e) => setDescription(e.target.value)}
					className={styles.input}
				/>
				<Editor
                    className={styles.code}
                    value={content}
                    onValueChange={code => setContent(code)}
                    highlight={code => highlight(code, languages.js, "js")}
                    padding={10}
					placeholder={parser.get("paste_content") as string}
                    style={{
                        fontFamily: '"Fira code", "Fira Mono", monospace',
                    }}
                />
				<div className={styles.tosWrapper}>
					<input
						type="checkbox"
						className={styles.check}
						onClick={() => setChecked(!checked)}
						defaultChecked={checked}
					/>
					<p
						dangerouslySetInnerHTML={{
							__html: parser.get("accept_tos", {
								tos: `<a href="/tos">${parser.get("tos_long")}</a>.`,
							}) as string,
						}}
					/>
				</div>
				<button className={`${styles.btn} ld-over${loading ? " running" : ""}`}>
					<img src={Preloader} className="ld" />
					{parser.get("create")}
				</button>
			</form>
		</Layout>
	);
}
