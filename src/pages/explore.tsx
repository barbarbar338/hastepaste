import FileHeader from "@components/FileHeader/index";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { NextSeo } from "next-seo";
import { NextPage, NextPageContext } from "next";
import { useFetchUser } from "@libs/useFetchUser";
import { useRouter } from "next/router";
import CONFIG from "src/config";
import Layout from "@components/Layout/index";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BarLoader from "@components/BarLoader";
import styles from "@styles/modules/explore.module.scss";
import { LocaleParser } from "@libs/localeParser";

export interface IFilePage {
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

const FilePage: NextPage<IFilePage> = ({ error, pasteData }) => {
	const router = useRouter();
	const { user, loading: userLoading } = useFetchUser(false);
	const [loading, setLoading] = useState(false);
	const [canEdit, setCanEdit] = useState(false);
	const [canReport, setCanReport] = useState(false);
	const parser = new LocaleParser(router.locale);

	useEffect(() => {
		if (!error && user && pasteData) {
			setCanReport(pasteData.owner !== user.user.id && !pasteData.is_reported);
			setCanEdit(pasteData.owner === user.user.id && !pasteData.is_reported);
		}
	});

	const handleEdit = () => {
		if (loading) return;
		if (!canEdit)
			return toast.error(`❌ ${parser.get("pages_explore_edit_handler_error")}`);
		router.push(`/edit?id=${router.query.id}`);
	};

	const handleReport = async () => {
		if (loading) return;
		if (!canReport)
			return toast.error(`❌ ${parser.get("pages_explore_report_handler_error")}`);
		setLoading(true);
		const res = await fetch(
			`${CONFIG.API_URL}/paste/report?id=${router.query.id}`,
			{
				headers: {
					Authorization: user.access_token,
				},
			},
		);
		const body = await res.json();
		setLoading(false);
		if (!body.data) return toast.error(`❌ ${parser.get("api_error")}`);
		toast.success(`✔️ ${parser.get("pages_explore_report_handler_success")}`);
		router.push("/profile");
	};

	const handleDelete = async () => {
		if (loading) return;
		if (!canEdit)
			return toast.error(`❌ ${parser.get("pages_explore_delete_error")}`);
		setLoading(true);
		const res = await fetch(`${CONFIG.API_URL}/paste`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: user.access_token,
			},
			body: JSON.stringify({
				id: router.query.id,
			}),
		});
		const body = await res.json();
		setLoading(false);
		if (!body.data) return toast.error(`❌ ${parser.get("api_error")}`);
		router.push("/profile");
	};

	return (
		<Layout user={user} loading={userLoading}>
			<NextSeo title={parser.get("pages_explore_title") as string} />
			<FileHeader
				name={
					error ? (parser.get("pages_explore_not_found") as string) : pasteData.title
				}
				description={
					error
						? (parser.get("pages_explore_description_not_found") as string)
						: pasteData.description ||
						  (parser.get("pages_explore_description_default") as string)
				}
				canFork={
					(pasteData && pasteData.is_reported) || !user || user.is_banned
						? false
						: error
						? false
						: pasteData.owner !== user.user.id
				}
				id={router.query.id as string}
			/>
			<div className={styles.wrapper}>
				<ul>
					<li className={styles.code}>
						<SyntaxHighlighter
							style={tomorrowNight}
							showLineNumbers={true}
							wrapLongLines={true}
						>
							{pasteData && pasteData.is_reported
								? (parser.get("pages_explore_content_reported") as string)
								: error
								? (parser.get("pages_explore_content_not_found") as string)
								: pasteData.paste}
						</SyntaxHighlighter>
					</li>
					<li className={styles.buttonWrapper}>
						<button
							onClick={handleEdit}
							className={
								(!canEdit || loading ? "cursor-not-allowed" : "cursor-pointer") +
								" bg-green-500 hover:bg-green-600"
							}
						>
							{loading ? <BarLoader /> : parser.get("pages_explore_edit")}
						</button>
					</li>
					<li className={styles.buttonWrapper}>
						<button
							onClick={handleDelete}
							className={
								(!canEdit || loading ? "cursor-not-allowed" : "cursor-pointer") +
								" bg-red-500 hover:bg-red-600"
							}
						>
							{loading ? <BarLoader /> : parser.get("pages_explore_delete")}
						</button>
					</li>
					<li className={styles.buttonWrapper}>
						<button
							onClick={handleReport}
							className={
								(!canReport || loading ? "cursor-not-allowed" : "cursor-pointer") +
								" bg-yellow-500 hover:bg-yellow-600"
							}
						>
							{loading ? <BarLoader /> : parser.get("pages_explore_report")}
						</button>
					</li>
				</ul>
			</div>
		</Layout>
	);
};

FilePage.getInitialProps = async ({
	query: { id },
}: NextPageContext): Promise<IFilePage> => {
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

export default FilePage;
