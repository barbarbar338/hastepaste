import Navbar from "@components/Navbar/index";
import Footer from "@components/Footer/index";
import { FC } from "react";

const Layout: FC = ({ children }) => {
	return (
		<div>
			<div className="flex flex-col">
				<div className="w-full bg-pink-500">
					<div className="flex flex-wrap w-full">
						<Navbar />
					</div>
				</div>
				<div className="w-full -mt-24">
					{children}
					<Footer />
				</div>
			</div>
		</div>
	);
};

export default Layout;
