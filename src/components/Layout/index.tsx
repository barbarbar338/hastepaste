import Navbar from "@components/Navbar/index";
import Footer from "@components/Footer/index";
import { FC } from "react";
import { IUser } from "@libs/useFetchUser";

export interface ILayoutProps {
	user?: IUser;
	loading: boolean;
}

const Layout: FC<ILayoutProps> = (props) => {
	const { user, loading, children } = props;
	return (
		<div className="flex flex-col">
			<div className="w-full bg-pink-500">
				<div className="flex flex-wrap w-full">
					<Navbar user={user} loading={loading} />
				</div>
			</div>
			{children}
			<Footer />
		</div>
	);
};

export default Layout;
