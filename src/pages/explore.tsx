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

	useEffect(() => {
		if (!error && user && pasteData) {
			setCanReport(pasteData.owner !== user.user.id && !pasteData.is_reported);
			setCanEdit(pasteData.owner === user.user.id && !pasteData.is_reported);
		}
	});

	const handleReport = async () => {
		if (loading) return;
		if (!canReport) return toast.error("❌ You can't report this paste.");
		setLoading(true);
		const res = await fetch(`${CONFIG.API_URL}/paste/report?id=${router.query.id}`, {
			headers: {
				"Authorization": user.access_token
			}
		});
		const body = await res.json();
		setLoading(false);
		if (!body.data) return toast.error("❌ Please try again later."); 
		toast.success("✔️ Thank you for reporting!");
		router.push("/profile");
	}

	const handleDelete = async () => {
		if (loading) return;
		if (!canEdit) return toast.error("❌ You can't delete this paste.");
		setLoading(true);
		const res = await fetch(`${CONFIG.API_URL}/paste`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				"Authorization": user.access_token
			},
			body: JSON.stringify({
				id: router.query.id
			})
		});
		const body = await res.json();
		setLoading(false);
		if (!body.data) return toast.error("❌ Please try again later.");
		router.push("/profile");
	}

	return (
		<Layout user={user} loading={userLoading}>
			<NextSeo title="Explore Paste" />
			<div>
				<FileHeader
					name={error ? "Paste not found..." : pasteData.title}
					description={
						error
							? "We searched quite a lot for the paste you were looking for but couldn't find it"
							: pasteData.description || "My awesome file!"
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
				<div className="container max-w-screen-xl px-5 mx-auto -mt-10 lg:px-0">
					<ul className="grid w-full grid-cols-1 px-5 py-5 bg-white rounded-lg lg:grid-cols-3 -gap-4">
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
							<SyntaxHighlighter
								style={tomorrowNight}
								showLineNumbers={true}
								wrapLongLines={true}
							>
								{pasteData && pasteData.is_reported
									? "This paste is reported and unavailable for now"
									: error
									? "There must have been some very cool and meaningful things written here... Anyways, why don't try something else?"
									: pasteData.paste}
							</SyntaxHighlighter>
						</li>
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg lg:col-span-1">
							<button
								className={`w-full col-span-3 px-3 py-3 text-sm font-medium text-white transition duration-150 bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none ${
									!canEdit || loading ? "cursor-not-allowed" : "cursor-pointer"
								}`}
							>
								{loading ? <BarLoader /> : "Edit"}
							</button>
						</li>
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg lg:col-span-1">
							<button
								onClick={handleDelete}
								className={`w-full col-span-3 px-3 py-3 text-sm font-medium text-white transition duration-150 bg-pink-500 rounded-lg hover:bg-pink-600 focus:outline-none ${
									!canEdit || loading ? "cursor-not-allowed" : "cursor-pointer"
								}`}
							>
								{loading ? <BarLoader /> : "Delete"}
							</button>
						</li>
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg lg:col-span-1">
							<button
								onClick={handleReport}
								className={`w-full col-span-3 px-3 py-3 text-sm font-medium text-white transition duration-150 bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none ${
									!canReport || loading ? "cursor-not-allowed" : "cursor-pointer"
								}`}
							>
								{loading ? <BarLoader /> : "Report"}
							</button>
						</li>
					</ul>
				</div>
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
