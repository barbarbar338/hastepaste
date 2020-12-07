import Layout from "@components/Layout";
import { useFetchUser } from "@libs/useFetchUser";
import { NextSeo } from "next-seo";

export default function ToS(): JSX.Element {
	const { user, loading } = useFetchUser(false);

	return (
		<Layout user={user} loading={loading}>
			<NextSeo title="Terms Of Service" />
			<div className="bg-dust-500">
				<div className="container flex flex-col max-w-screen-xl px-5 py-16 mx-auto lg:px-0">
					<h1 className="text-3xl font-medium text-white">Terms Of Service</h1>
					<p className="text-dust-100 ">
						By posting content on this site, you agree to comply with the following
						terms. (Last Edit: 07/12/2020)
					</p>
				</div>
			</div>
			<div className="container max-w-screen-xl px-5 mx-auto -mt-10 lg:px-0">
				<ul className="grid w-full grid-cols-1 px-5 py-5 bg-white rounded-lg lg:grid-cols-2 -gap-4">
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">Terms</h1>
						<p className="text-gray-600">
							By accessing this Website, accessible at https://hastepaste.xyz, you
							agree to be bound by these Website Terms and Conditions of Use and to be
							responsible for the agreement with all applicable local laws. If you do
							not agree with any of these terms, you are prohibited from accessing this
							site. The contents on this Website are protected by copyright and
							trademark law. These Terms of Service were created with the help of the
							Terms of Service Generator and the Terms and Conditions Example.
						</p>
					</li>
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">License</h1>
						<p className="text-gray-600">
							HastePaste users are permitted to temporarily download one copy of the
							contents on the Website for personal, non-commercial transitory viewing
							only. This is a license grant, not a transfer of ownership, and under
							this license you cannot:
						</p>
						<ul className="list-disc">
							<li className="text-gray-500">modify or copy the contents</li>
							<li className="text-gray-500">
								use the contents for any commercial purpose or for any public display
							</li>
							<li className="text-gray-500">
								attempt to reverse engineer any software contained on HastePaste's
								website
							</li>
							<li className="text-gray-500">
								remove any copyright or other proprietary notations from the contents
							</li>
							<li className="text-gray-500">
								transferring the contents to another person or "mirror" the contents on
								any other server.
							</li>
						</ul>
						<p className="text-gray-600">
							This will let HastePaste to terminate upon violations of any of these
							restrictions. Upon termination, your viewing right will also be
							terminated and you should destroy any downloaded contents in your
							possession whether it is printed or electronic format.
						</p>
					</li>
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">Disclaimer</h1>
						<p className="text-gray-600">
							All the contents on HastePaste's are provided "as is". HastePaste makes
							no warranties, may it be expressed or implied, therefore negates all
							other warranties. Furthermore, HastePaste does not make any
							representations concerning the accuracy or reliability of the use of the
							contents on its Website or otherwise relating to such contents or any
							sites linked to this Website.
						</p>
					</li>
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">Limitations</h1>
						<p className="text-gray-600">
							HastePaste or its suppliers will not be hold accountable for any damages
							that will arise with the use or inability to use the contents on
							HastePaste’s Website, even if HastePaste or an authorize representative
							of this Website has been notified, orally or written, of the possibility
							of such damage. Some jurisdiction does not allow limitations on implied
							warranties or limitations of liability for incidental damages, these
							limitations may not apply to you.
						</p>
					</li>
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">Revisions</h1>
						<p className="text-gray-600">
							All content shared on HastePaste is checked periodically, but it should
							be remembered that these contents can change after the check. HastePaste
							will not promise that any of the contents in this Website are accurate,
							complete, or current. HastePaste may change the contents contained on its
							Website at any time without notice. HastePaste does not make any
							commitment to update the contents.
						</p>
					</li>
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">Links</h1>
						<p className="text-gray-600">
							HastePaste has not reviewed all of the sites linked to its Website and is
							not responsible for the contents of any such linked site. The presence of
							any link does not imply endorsement by HastePaste of the site. The use of
							any linked website is at the user’s own risk.
						</p>
					</li>
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">Terms of Use Modifications</h1>
						<p className="text-gray-600">
							HastePaste may revise these Terms of Use for the Website at any time
							without prior notice. By using this Website, you agree to be bound by the
							current version of these Terms and Conditions of Use.
						</p>
					</li>
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">Governing Law</h1>
						<p className="text-gray-600">
							Any claim related to HastePaste's Website shall be governed by the laws
							of Turkey without regards to its conflict of law provisions.
						</p>
					</li>
					<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
						<h1 className="text-gray-900 text-xl">Your Privacy</h1>
						<p className="text-gray-600">
							The e-mail and password you used while registering on the site are
							encrypted on our servers and stored in our database after being
							encrypted. The e-mail you use while registering on the site is used only
							to identify you and to own the shared content and cannot be seen by any
							other user. This information you have shared with us is used for
							identification purposes only and is not shared with third parties.
							However, all the pastes you share can be seen by others.
						</p>
					</li>
				</ul>
			</div>
		</Layout>
	);
}
