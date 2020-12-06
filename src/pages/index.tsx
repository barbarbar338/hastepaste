import { NextSeo } from "next-seo";
import { useState } from "react";
import { toast } from "react-toastify";
import { useFetchUser } from "@libs/useFetchUser";
import { useRouter } from "next/router";
import BarLoader from "@components/BarLoader";
import CONFIG from "src/config";
import Layout from "@components/Layout/index";

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
		if (user.access_token) headers["Authorization"] = user.access_token;
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
			<div>
				<div className="bg-pink-500">
					<div className="container flex flex-col max-w-screen-xl px-5 py-16 mx-auto lg:px-0">
						<h1 className="text-3xl font-medium text-white">Create Paste</h1>
						<p className="text-pink-100 ">
							Take your content on a journey through the magic world of HastePaste!
						</p>
					</div>
				</div>
				<div className="container max-w-screen-xl px-5 mx-auto -mt-10 lg:px-0">
					<ul className="grid w-full grid-cols-1 px-5 py-5 bg-white rounded-lg lg:grid-cols-2 -gap-4">
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg lg:col-span-1">
							<p className="text-gray-900">Paste Name</p>
							<input
								className="w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md text-md focus:outline-none"
								placeholder="My awesome paste!"
								onChange={(e) => setTitle(e.target.value)}
							/>
							<span className="text-xs text-red-400">* Required.</span>
						</li>
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg lg:col-span-1">
							<p className="text-gray-900">Description</p>
							<input
								className="w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md text-md focus:outline-none"
								placeholder="Take a look at this paste"
								onChange={(e) => setDescription(e.target.value)}
							/>
						</li>
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
							<p className="text-gray-900">Paste Content</p>
							<textarea
								className="w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md h-72 text-md focus:outline-none"
								placeholder="bla bla bla"
								onChange={(e) => setPaste(e.target.value)}
							/>
							<span className="text-xs text-red-400">* Required.</span>
						</li>
						<button
							onClick={createPaste}
							className="w-full col-span-3 px-3 py-3 text-sm font-medium text-white transition duration-150 bg-pink-500 rounded-lg hover:bg-pink-600 focus:outline-none"
						>
							{loading ? <BarLoader /> : "Create!"}
						</button>
					</ul>
				</div>
			</div>
		</Layout>
	);
}
