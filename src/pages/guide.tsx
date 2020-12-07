import Layout from "@components/Layout";
import { useFetchUser } from "@libs/useFetchUser";
import { NextSeo } from "next-seo";

export default function Guides(): JSX.Element {
	const { user, loading } = useFetchUser(false);

	return (
		<Layout user={user} loading={loading}>
			<NextSeo title="Paste Guidelines" />
			<div className="bg-dust-500">
				<div className="container flex flex-col max-w-screen-xl px-5 py-16 mx-auto lg:px-0">
					<h1 className="text-3xl font-medium text-white">Paste Guidelines</h1>
					<p className="text-dust-100 ">
						The resource you should follow when creating a paste (Last Edit:
						07/12/2020)
					</p>
				</div>
			</div>
			<div className="container max-w-screen-xl px-5 mx-auto -mt-10 lg:px-0">
				<ul className="grid w-full grid-cols-1 px-5 py-5 bg-white rounded-lg lg:grid-cols-2 -gap-4">
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">Legal disclaimer</h1>
						<p className="text-gray-600">
							Our only goal is for people to share their content with their friends
							safely and quickly. To keep our website safe for everyone, we regularly
							check the shared content and make necessary adjustments.
						</p>
						<p className="text-gray-600">
							Although we try to monitor shared content, we are not responsible for any
							content that is shared. What we want our users to do when they encounter
							such content is to report the content using the button on the page. When
							something like this happens, your content can be removed forever and your
							account can be disabled forever.
						</p>
					</li>
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">What you can do with a paste</h1>
						<ul className="list-disc">
							<li className="text-gray-500">You can share a code.</li>
							<li className="text-gray-500">You can share a note.</li>
							<li className="text-gray-500">
								You can list things you shouldn't forget.
							</li>
							<li className="text-gray-500">You can create a shopping list.</li>
							<li className="text-gray-500">You can share a quote.</li>
							<li className="text-gray-500">
								And you can share almost anything you can think of.
							</li>
						</ul>
					</li>
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">What you can't do with a paste</h1>
						<p className="text-gray-600">
							If we encounter content shared for the purposes stated below, the content
							will be removed from our system forever and the owner of the content will
							be banned forever.
						</p>
						<ul className="list-disc">
							<li className="text-gray-500">
								<strong>Don't post content that contains illegal activity.</strong> Your
								content should not directly or indirectly promote any illegal activity.
								Don't help users create and spread malicious activities.
							</li>
							<li className="text-gray-500">
								<strong>Don't post inappropriate content.</strong> Don't post content
								that promotes a point of view or activity that we do not tolerate,
								including but not limited to racism, harassment, pornography, suicide,
								self-harm, swearing, or hatred of certain communities.
							</li>
							<li className="text-gray-500">
								<strong>Don't ask for money.</strong> Our site and the content shared on
								our site are completely free and will always remain free.
							</li>
							<li className="text-gray-500">
								<strong>Don't spam Paste.</strong> Don't spam pastes whose content
								consists of random words or letters.
							</li>
							<li className="text-gray-500">
								<strong>Don't share personal information.</strong> Don't share your
								personal information, such as your name, address, telephone number or
								credit card information, or someone else's information. Don't share
								other people's secrets. Don't use our services to embarrass or humiliate
								another person.
							</li>
							<li className="text-gray-500">
								<strong>Don't spam Paste.</strong> Don't spam pastes whose content
								consists of random words or letters.
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</Layout>
	);
}
