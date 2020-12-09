import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFetchUser } from "@libs/useFetchUser";
import { useRouter } from "next/router";
import BarLoader from "@components/BarLoader";
import CONFIG from "src/config";
import Layout from "@components/Layout/index";
import { NextPage, NextPageContext } from "next";
import styles from "@styles/modules/edit.module.scss";
import { LocaleParser } from "@libs/localeParser";

export interface IEditPage {
	error?: boolean;
	pasteData?: {
		paste: string;
		owner?: string;
		title: string;
		createdAt: number;
		fork_id?: string;
		is_reported?: boolean;
		description?: string;
	};
}

const EditPage: NextPage<IEditPage> = (props) => {
	const { error, pasteData } = props;
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [paste, setPaste] = useState("");
	const [loading, setLoading] = useState(false);
	const { user, loading: userLoading } = useFetchUser(false);
	const [canEdit, setCanEdit] = useState(false);
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	useEffect(() => {
		if (
			pasteData &&
			user &&
			pasteData.owner === user.user.id &&
			!pasteData.is_reported
		)
			setCanEdit(true);
	});

	const editPaste = async () => {
		if (loading) return;
		if (!title && !paste)
			return toast.error(`❌ ${parser.get("pages_edit_no_title_or_paste")}`);
		setLoading(true);
		const res = await fetch(`${CONFIG.API_URL}/paste`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: user.access_token,
			},
			body: JSON.stringify({
				id: router.query.id,
				paste,
				title,
				description,
			}),
		});
		const body = await res.json();
		setLoading(false);
		if (
			body.message ===
			`Paste with id ${router.query.id} not found on ${user.user.id}'s account`
		)
			return toast.error(`❌ ${parser.get("pages_edit_cant_edit")}`);
		if (
			body.message === "This paste is reported and only can be edited by an admin"
		)
			return toast.error(`❌ ${parser.get("pages_edit_reported")}`);
		if (body.statusCode !== 200)
			return toast.warning(`❌ ${parser.get("api_error")}`);
		router.push(`/explore?id=${encodeURIComponent(router.query.id as string)}`);
	};

	return (
		<Layout user={user} loading={userLoading}>
			<NextSeo title={parser.get("pages_edit_title") as string} />
			<div className={styles.hero}>
				<div>
					<h1>
						{!pasteData || !canEdit || error
							? parser.get("pages_edit_hero_title_not_found")
							: parser.get("pages_edit_hero_title_edit")}
					</h1>
					<p>
						{!pasteData || error
							? parser.get("pages_edit_hero_description_not_found")
							: canEdit
							? parser.get("pages_edit_hero_description")
							: parser.get("pages_edit_hero_description_not_allowed")}
					</p>
				</div>
			</div>
			<div className={styles.content}>
				<ul>
					<li className={styles.smInput}>
						<p>{parser.get("pages_edit_content_paste_title")}</p>
						<input
							className={
								!pasteData || error
									? "cursor-not-allowed"
									: canEdit
									? "cursor-not-pointer"
									: "cursor-not-allowed"
							}
							placeholder={
								!pasteData || error
									? (parser.get("pages_edit_content_paste_cant_edit") as string)
									: canEdit
									? (parser.get("pages_edit_content_paste_name_placeholder") as string)
									: (parser.get("pages_edit_content_paste_cant_edit") as string)
							}
							defaultValue={pasteData ? pasteData.title : ""}
							readOnly={!canEdit}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</li>
					<li className={styles.smInput}>
						<p>Description</p>
						<input
							className={
								!pasteData || error
									? "cursor-not-allowed"
									: canEdit
									? "cursor-not-pointer"
									: "cursor-not-allowed"
							}
							placeholder={
								!pasteData || error
									? (parser.get("pages_edit_content_paste_cant_edit") as string)
									: canEdit
									? (parser.get(
											"pages_edit_content_paste_description_placeholder",
									  ) as string)
									: (parser.get("pages_edit_content_paste_cant_edit") as string)
							}
							defaultValue={
								pasteData && pasteData.description ? pasteData.description : ""
							}
							readOnly={!canEdit}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</li>
					<li className={styles.lgInput}>
						<p>Paste Content</p>
						<textarea
							className={
								!pasteData || error
									? "cursor-not-allowed"
									: canEdit
									? "cursor-not-pointer"
									: "cursor-not-allowed"
							}
							placeholder={
								!pasteData || error
									? (parser.get("pages_edit_content_paste_cant_edit") as string)
									: canEdit
									? (parser.get(
											"pages_edit_content_paste_content_placeholder",
									  ) as string)
									: (parser.get("pages_edit_content_paste_cant_edit") as string)
							}
							defaultValue={pasteData ? pasteData.paste : ""}
							readOnly={!canEdit}
							onChange={(e) => setPaste(e.target.value)}
						/>
					</li>
					<button
						onClick={editPaste}
						className={
							!pasteData || error
								? "cursor-not-allowed"
								: canEdit
								? "cursor-not-pointer"
								: "cursor-not-allowed"
						}
					>
						{loading ? <BarLoader /> : parser.get("pages_edit_content_update")}
					</button>
				</ul>
			</div>
		</Layout>
	);
};

EditPage.getInitialProps = async ({
	query: { id },
}: NextPageContext): Promise<IEditPage> => {
	if (!id) return { error: true };
	const res = await fetch(
		`${CONFIG.API_URL}/paste?id=${encodeURIComponent(
			typeof id === "string" ? id : id[0],
		)}`,
	);
	if (!res.ok) return { error: true };
	const { data } = await res.json();
	return { pasteData: data };
};

export default EditPage;
