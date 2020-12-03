import Navbar from "@components/Navbar/index";

export default function Layout({ children }) {
	return (
		<div>
			<div className="flex flex-col">
				<div className="w-full bg-lapis-500">
					<div className="flex flex-wrap w-full">
						<Navbar />
					</div>
				</div>
				<div className="w-full -mt-24">{children}</div>
			</div>
		</div>
	);
}
