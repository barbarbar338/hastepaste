import ActiveClass from "@components/ActiveClass/index";

const links = {
	left: [
		{
			label: "Home",
			to: "/",
		},
		{
			label: "GitHub",
			to: "https://github.com/HastePasteApp/",
		},
	],
	right: [
		{
			label: "Login",
			to: "/login",
		},
		{
			label: "Sign Up",
			to: "/signup",
		},
	],
};

export default function Navbar(): JSX.Element {
	return (
		<div className="flex w-full px-5 py-6">
			<div className="container flex items-center max-w-screen-xl mx-auto space-x-12">
				<h1 className="text-2xl font-semibold text-white">HastePaste</h1>
				<ul className="flex items-center space-x-6">
					{links.left.map((link, i) => (
						<li key={i}>
							<ActiveClass activeClassName="text-white" href={link.to}>
								<a className="text-sm text-white">{link.label}</a>
							</ActiveClass>
						</li>
					))}
				</ul>
				<div className="flex items-center justify-end flex-1">
					<ul className="flex items-center space-x-6">
						{links.right.map((link, i) => (
							<li key={i}>
								<ActiveClass activeClassName="text-white" href={link.to}>
									<a className="text-sm text-white">{link.label}</a>
								</ActiveClass>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}
