import ActiveClass from "@components/ActiveClass/index";
import { useFetchUser } from "@libs/useFetchUser";

const links = [
	{
		label: "Home",
		to: "/",
	},
	{
		label: "GitHub",
		to: "https://github.com/HastePasteApp/",
	},
	{
		label: "ToS",
		to: "/tos",
	},
];

export default function Navbar(): JSX.Element {
	const { user, loading } = useFetchUser(false);

	return (
		<div className="flex w-full px-5 py-6">
			<div className="container flex items-center max-w-screen-xl mx-auto space-x-12">
				<h1 className="text-2xl font-semibold text-white">HastePaste</h1>
				<ul className="flex items-center space-x-6">
					{links.map((link, i) => (
						<li key={i}>
							<ActiveClass activeClassName="text-white" href={link.to}>
								<span className="text-sm text-white cursor-pointer">{link.label}</span>
							</ActiveClass>
						</li>
					))}
				</ul>
				<div className="flex items-center justify-end flex-1">
					<ul className="flex items-center space-x-6">
						{loading || !user ? (
							<>
								<li>
									<ActiveClass activeClassName="text-white" href="/login">
										<span className="text-sm text-white cursor-pointer">Login</span>
									</ActiveClass>
								</li>
								<li>
									<ActiveClass activeClassName="text-white" href="/signup">
										<span className="text-sm text-white cursor-pointer">Sign Up</span>
									</ActiveClass>
								</li>
							</>
						) : (
							<li>
								<ActiveClass activeClassName="text-white" href="/profile">
									<span className="text-sm text-white cursor-pointer">Profile</span>
								</ActiveClass>
							</li>
						)}
					</ul>
				</div>
			</div>
		</div>
	);
}
