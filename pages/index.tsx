import { LocaleParser } from "@libs/localeParser";
import Layout from "@components/Layout";
import { useRouter } from "next/dist/client/router";
import styles from "@styles/modules/index.module.scss";
import { FormEvent, useState } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@libs/initSupabase";
import { toast } from "react-toastify";
import { generate as randomString } from "@libs/randomString";
import { motion, Variants } from "framer-motion";
import { Loader } from "@components/Loader";
import { Editor } from "@components/Editor";
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";

const container: Variants = {
	hidden: {
		opacity: 1,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const itemY: Variants = {
	hidden: {
		y: 20,
		opacity: 0,
	},
	visible: {
		y: 0,
		opacity: 1,
	},
};

const itemX: Variants = {
	hidden: {
		x: 20,
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
	},
};

export default function IndexPage(): JSX.Element {
	const [content, setContent] = useState(EditorState.createEmpty());
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [checked, setChecked] = useState(false);
	const { data: session } = useSession();
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	const submit = async (e: FormEvent<HTMLFormElement>): Promise<unknown> => {
		e.preventDefault();
		if (loading) return;
		if (!checked) return toast.error(parser.get("agree_terms"));
		if (!title) return toast.error(parser.get("specify_title"));
		const draft = convertToRaw(content.getCurrentContent());
		if (!draft.blocks.map((block) => block.text.trim()).filter(Boolean).length)
			return toast.error(parser.get("specify_content"));
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
				content: draftToHtml(draft),
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
			<motion.form
				className={styles.form}
				onSubmit={submit}
				variants={container}
				initial="hidden"
				animate="visible"
			>
				<motion.div variants={itemX}>
					<h3 className={styles.title}>{parser.get("index")}</h3>
					<p className={styles.desc}>{parser.get("index_desc")}</p>
				</motion.div>
				<motion.input
					type="text"
					placeholder={parser.get("paste_name") as string}
					onChange={(e) => setTitle(e.target.value)}
					className={styles.input}
					variants={itemY}
				/>
				<motion.input
					type="text"
					placeholder={parser.get("paste_description") as string}
					onChange={(e) => setDescription(e.target.value)}
					className={styles.input}
					variants={itemY}
				/>
				<motion.div variants={itemY}>
					<Editor editorState={content} setEditorState={setContent} />
				</motion.div>
				<motion.div className={styles.tosWrapper} variants={itemX}>
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
				</motion.div>
				<motion.button
					className={`${styles.btn} ld-over${loading ? " running" : ""}`}
					variants={itemX}
				>
					<Loader />
					{parser.get("create")}
				</motion.button>
			</motion.form>
		</Layout>
	);
}
