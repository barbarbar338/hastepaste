import classnames from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import Brand from "@brand-kit/word-arts/default-defaultblacktextnobg1024x512.png";

export interface NavbarProps {
	links: { name: string; url: string }[];
}

const Navbar = ({ links }: NavbarProps) => (
	<>
		<nav
			className={classnames(
				"container",
				"flex",
				"m-auto",
				"justify-between",
				"items-center",
			)}
		>
			<Link href="/">
				<a>
					<img width="192px" src={Brand} />
				</a>
			</Link>
			<div>
				<ul className={classnames("flex")}>
					{links.map((link, i) => (
						<NavLink label={link.name} href={link.url} key={i} />
					))}
				</ul>
			</div>
		</nav>
	</>
);

const NavLink = ({ href, label }) => {
	const router = useRouter();
	return (
		<li
			className={classnames(
				"text-gray-900",
				"font-medium",
				"p-4",
				"cursor-pointer",
			)}
			role="link"
			tabIndex={0}
			onClick={() => router.push(href)}
		>
			<a tabIndex={-1} href={href}>
				{label}
			</a>
		</li>
	);
};

export default Navbar;
