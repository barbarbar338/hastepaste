import Navbar from "@components/Navbar/index";
import Footer from "@components/Footer/index";
import { FC } from "react";

const Layout: FC = ({ children }) => {
	return (
		<div className="flex flex-col">
			<div className="w-full bg-pink-500">
				<div className="flex flex-wrap w-full">
					<Navbar />
				</div>
			</div>
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
