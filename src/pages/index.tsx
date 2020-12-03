import { NextSeo } from "next-seo";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

export default function Add() {

	cookie.set("access_token", "231321", {
		expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	})
	const token = cookie.get("access_token");
	console.log(token);

	return (
		<>
			<NextSeo title="Create Paste" />
			<div>
				<div className="bg-blue-500">
					<div className="container flex flex-col max-w-screen-xl px-5 py-16 mx-auto lg:px-0">
						<h1 className="text-3xl font-medium text-white">Add file</h1>
						<p className="text-blue-100 ">Add your file in HastePaste</p>
					</div>
				</div>
				<div className="container max-w-screen-xl px-5 mx-auto -mt-10 lg:px-0">
					<ul className="grid w-full grid-cols-1 px-5 py-5 bg-white rounded-lg lg:grid-cols-2 -gap-4">
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg lg:col-span-1">
							<p className="text-gray-900">File Name</p>
							<input
								className="w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md text-md focus:outline-none"
								placeholder="example file"
							/>
							<span className="text-xs text-red-400">* Required.</span>
						</li>
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg lg:col-span-1">
							<p className="text-gray-900">Description</p>
							<input
								className="w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md text-md focus:outline-none"
								placeholder="bla bla"
							/>
						</li>
						<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
							<p className="text-gray-900">Your code</p>
							<textarea
								className="w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md h-72 text-md focus:outline-none"
								placeholder="bla bla bla"
							/>
						</li>
						<button className="w-full col-span-3 px-3 py-3 text-sm font-medium text-white transition duration-150 bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none">
							Save and submit
						</button>
					</ul>
				</div>
			</div>
		</>
	);
}
