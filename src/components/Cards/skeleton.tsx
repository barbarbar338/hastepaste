import CardSkeleton from "@components/Card/skeleton";
const array = new Array(12).fill(0);

export default function Cards(): JSX.Element {
	return (
		<div className="mt-6">
			<p className="mb-6 text-2xl text-black">Your files</p>
			<div className="grid grid-cols-2 grid-rows-1 gap-4 mb-6 lg:grid-cols-6">
				{array.map((card, i) => (
					<CardSkeleton key={i} />
				))}
			</div>
		</div>
	);
}
