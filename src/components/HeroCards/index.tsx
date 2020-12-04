import Published from "@components/HeroCardItem/published";
import Saved from "@components/HeroCardItem/saved";
import { FC } from "react";
import PropTypes from "prop-types";

export interface IHeroCard {
	paste: {
		id: string;
		title: string;
		description?: string;
		[ key: string ]: unknown;
	}[];
}

const HeroCards: FC<IHeroCard> = ({ paste }) => {
	const published = paste.filter(i => !i.fork_id).sort((a, b) => {
		const aDate = new Date(a.createdAt as string).getTime();
		const bDate = new Date(b.createdAt as string).getTime();
		return bDate - aDate;
	}).slice(0, 5);
	const forks = paste.filter(i => i.fork_id);

	return (
		<div className="flex flex-col space-y-6 md:space-x-6 md:space-y-0 md:flex-row">
			<div className="flex flex-col w-full bg-white rounded-md shadow md:w-4/6">
				<p className="px-5 py-5 text-2xl text-gray-600 border-b border-gray-300">
					Your published last files
				</p>
				<div className="flex flex-col h-64 px-5 py-5 space-y-3 overflow-y-auto">
					{
						published.map((i, idx) => <Published
							key={idx}
							name={i.title}
							description={i.description}
							link={`/explore?id=${i.id}`}
						/>)
					}
				</div>
			</div>
			<div className="flex flex-wrap bg-white rounded-md shadow md:w-1/2">
				<p className="w-full px-5 py-5 text-2xl text-gray-600 border-b border-gray-300">
					Your forks
				</p>
				<div className="flex flex-col h-64 px-5 py-5 space-y-3 overflow-y-auto">
					{
						forks.map((i, idx) => <Saved
							key={idx}
							name={i.title}
							description={i.description}
							link={`/explore?id=${i.id}`}
						/>)
					}
				</div>
			</div>
		</div>
	);
}

HeroCards.propTypes = {
	paste: PropTypes.array.isRequired
}

export default HeroCards;
