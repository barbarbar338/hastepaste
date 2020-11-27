import Navbar from "@components/NavBar";
import classnames from "classnames";

const Layout = (Page) => {
	const PageLayout = () => (
		<>
			<header className={classnames("w-full", "fixed")}>
				<Navbar
					links={[{ name: "Github", url: "https://github.com/HastePasteApp" }]}
				/>
			</header>
			<main
				className={classnames(
					"flex",
					"flex-col",
					"justify-center",
					"items-center",
					"w-full",
					"h-screen",
				)}
			>
				<Page />
			</main>
		</>
	);
	return PageLayout;
};

export default Layout;
