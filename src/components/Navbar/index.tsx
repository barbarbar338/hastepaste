import ActiveClass from "@components/ActiveClass/index";

const links = [
	{
		label: "Home",
		to: "/",
	},
	{
		label: "GitHub",
		to: "https://github.com/HastePasteApp/",
	},
];

export default function Navbar() {
	return (
		<div className="flex w-full px-5 py-6">
			<div className="container flex items-center max-w-screen-xl mx-auto space-x-12">
				<h1 className="text-2xl font-semibold text-white">HastePaste</h1>
				<ul className="flex items-center space-x-6">
					{links.map((link, i) => (
						<li key={i}>
							<ActiveClass activeClassName="text-white" href={link.to}>
								<a className="text-sm text-white">{link.label}</a>
							</ActiveClass>
						</li>
					))}
				</ul>
				<div className="flex items-center justify-end flex-1">
					<img
						className="w-10 h-10 rounded-full"
						src="https://cdn.discordapp.com/avatars/726953781903884388/8b007da4226e040487bb1e801bce5626.png?size=1024"
					/>
				</div>
			</div>
		</div>
	);
}
