import { FC } from "react";
import Link from "next/link";

export interface CardProps {
	name: string;
	link: string;
}

const Card: FC<CardProps> = (props) => {
	const { name, link } = props;
	return (
		<Link href={link}>
			<div className="flex flex-col cursor-pointer items-center justify-center bg-white rounded-md shadow">
				<span
					className="hidden text-pink-500 material-icons-round md:block"
					style={{ fontSize: "128px" }}
				>
					text_snippet
				</span>
				<span
					className="block text-pink-500 material-icons-round md:hidden"
					style={{ fontSize: "72px" }}
				>
					text_snippet
				</span>
				<div className="flex items-center justify-center w-full px-2 py-2 border-t border-gray-200 rounded-b-md">
					<p className="text-sm text-black">{name}</p>
				</div>
			</div>
		</Link>
	);
};

export default Card;
