import ActiveClass from "@components/ActiveClass/index";
import { IUser } from "@libs/useFetchUser";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import { useCookies } from "react-cookie";

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

export interface INavbarProps {
	user?: IUser;
	loading: boolean;
}

const Navbar: FC<INavbarProps> = (props) => {
	const { user, loading } = props;
	const [, , removeCookie] = useCookies(["access_token"]);
	const router = useRouter();

	const handleLogOut = () => {
		removeCookie("access_token");
		router.push("/");
	};

	return (
		<div className="nav">
			<input type="checkbox" id="nav-check" />
			<div className="nav-header">
				<div className="nav-title">
					<Link href="/">
						<span className="cursor-pointer">HastePaste</span>
					</Link>
				</div>
			</div>
			<div className="nav-btn">
				<label htmlFor="nav-check">
					<span></span>
					<span></span>
					<span></span>
				</label>
			</div>
			<div className="nav-links">
				{links.map((data, i) => (
					<ActiveClass key={i} activeClassName="text-white" href={data.to}>
						<span className="link-item cursor-pointer">{data.label}</span>
					</ActiveClass>
				))}
				{loading || !user ? (
					<>
						<ActiveClass activeClassName="text-white" href="/login">
							<span className="link-item cursor-pointer">Login</span>
						</ActiveClass>
						<ActiveClass activeClassName="text-white" href="/signup">
							<span className="link-item cursor-pointer">Sign Up</span>
						</ActiveClass>
					</>
				) : (
					<>
						<ActiveClass activeClassName="text-white" href="/profile">
							<span className="link-item cursor-pointer">Profile</span>
						</ActiveClass>
						<span
							className="text-white link-item cursor-pointer"
							onClick={handleLogOut}
						>
							Logout
						</span>
					</>
				)}
			</div>
		</div>
	);
};

export default Navbar;
