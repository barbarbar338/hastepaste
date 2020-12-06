import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFetchUser } from "@libs/useFetchUser";
import { useRouter } from "next/router";
import BarLoader from "@components/BarLoader";
import CONFIG from "src/config";
import Layout from "@components/Layout/index";
import { NextPage, NextPageContext } from "next";

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
			return toast.error("❌ Please update the title or content of your paste.");
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
			return toast.error("❌ You can't edit this paste.");
		if (
			body.message === "This paste is reported and only can be edited by an admin"
		)
			return toast.error(
				"❌ This paste is reported and only can be edited by an admin.",
			);
		if (body.message === "paste or title required")
			toast.warning("⚠️ It looks like no changes have been made");
		router.push(`/explore?id=${encodeURIComponent(router.query.id as string)}`);
	};

	return (
		<Layout user={user} loading={userLoading}>
			<NextSeo title="Edit Paste" />
			<div>
				<div className="bg-pink-500">
					<div className="container flex flex-col max-w-screen-xl px-5 py-16 mx-auto lg:px-0">
						<h1 className="text-3xl font-medium text-white">
							{!pasteData || !canEdit || error ? "Paste Not Found" : "Edit Paste"}
						</h1>
						<p className="text-pink-100 ">
							{!pasteData || error
								? "We searched quite a lot for the paste you were looking for but couldn't find it"
								: canEdit
								? "Is there something missing in your paste? Fix it now!"
								: "You Can't Edit This Paste"}
						</p>
					</div>
				</div>
				<div className="container max-w-screen-xl px-5 mx-auto -mt-10 lg:px-0">
					<ul className="grid w-full grid-cols-1 px-5 py-5 bg-white rounded-lg lg:grid-cols-2 -gap-4">
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg lg:col-span-1">
							<p className="text-gray-900">Paste Name</p>
							<input
								className={`w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md text-md focus:outline-none ${
									!pasteData || error
										? "cursor-not-allowed"
										: canEdit
										? "cursor-not-pointer"
										: "cursor-not-allowed"
								}`}
								placeholder={
									!pasteData || error
										? "You Can't Edit This Paste"
										: canEdit
										? "My awesome paste!"
										: "You Can't Edit This Paste"
								}
								defaultValue={pasteData ? pasteData.title : ""}
								readOnly={!canEdit}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</li>
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg lg:col-span-1">
							<p className="text-gray-900">Description</p>
							<input
								className={`w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md text-md focus:outline-none ${
									!pasteData || error
										? "cursor-not-allowed"
										: canEdit
										? "cursor-not-pointer"
										: "cursor-not-allowed"
								}`}
								placeholder={
									!pasteData || error
										? "You Can't Edit This Paste"
										: canEdit
										? "Take a look at this paste"
										: "You Can't Edit This Paste"
								}
								defaultValue={
									pasteData && pasteData.description ? pasteData.description : ""
								}
								readOnly={!canEdit}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</li>
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
							<p className="text-gray-900">Paste Content</p>
							<textarea
								className={`w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md h-72 text-md focus:outline-none ${
									!pasteData || error
										? "cursor-not-allowed"
										: canEdit
										? "cursor-not-pointer"
										: "cursor-not-allowed"
								}`}
								placeholder={
									!pasteData || error
										? "You Can't Edit This Paste"
										: canEdit
										? "Hey take a look at this"
										: "You Can't Edit This Paste"
								}
								defaultValue={pasteData ? pasteData.paste : ""}
								readOnly={!canEdit}
								onChange={(e) => setPaste(e.target.value)}
							/>
						</li>
						<button
							onClick={editPaste}
							className={`w-full col-span-3 px-3 py-3 text-sm font-medium text-white transition duration-150 bg-pink-500 rounded-lg hover:bg-pink-600 focus:outline-none ${
								!pasteData || error
									? "cursor-not-allowed"
									: canEdit
									? "cursor-not-pointer"
									: "cursor-not-allowed"
							}`}
						>
							{loading ? <BarLoader /> : "Update!"}
						</button>
					</ul>
				</div>
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
