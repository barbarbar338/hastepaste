import Card from "@components/Card/index";
import { FC } from "react";
import PropTypes from "prop-types";

export interface ICards {
	paste: {
		id: string;
		title: string;
		description?: string;
		[key: string]: unknown;
	}[];
}

const Cards: FC<ICards> = ({ paste }) => {
	return (
		<div className="mt-6">
			<p className="mb-6 text-2xl text-black">Your files</p>
			<div className="grid grid-cols-2 grid-rows-1 gap-4 mb-6 lg:grid-cols-6">
				{paste.map((i, idx) => (
					<Card key={idx} name={i.title} link={`/explore?id=${i.id}`} />
				))}
			</div>
		</div>
	);
};

Cards.propTypes = {
	paste: PropTypes.array.isRequired,
};

export default Cards;
