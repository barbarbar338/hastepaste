import Published from "@components/HeroCardItem/published";
import Saved from "@components/HeroCardItem/saved";

export default function HeroCards() {
	return (
		<div className="flex flex-col space-y-6 md:space-x-6 md:space-y-0 md:flex-row">
			<div className="flex flex-col w-full bg-white rounded-md shadow md:w-4/6">
				<p className="px-5 py-5 text-2xl text-gray-600 border-b border-gray-300">
					Your published last files
				</p>
				<div className="flex flex-col h-64 px-5 py-5 space-y-3 overflow-y-auto">
					<Published
						name="example file"
						description="Lorem ipsum dolor sit ame..."
						link="#"
					/>
					<Published
						name="example file"
						description="Lorem ipsum dolor sit ame..."
						link="#"
					/>
					<Published
						name="example file"
						description="Lorem ipsum dolor sit ame..."
						link="#"
					/>
					<Published
						name="example file"
						description="Lorem ipsum dolor sit ame..."
						link="#"
					/>
					<Published
						name="example file"
						description="Lorem ipsum dolor sit ame..."
						link="#"
					/>
				</div>
			</div>
			<div className="flex flex-wrap bg-white rounded-md shadow md:w-1/2">
				<p className="w-full px-5 py-5 text-2xl text-gray-600 border-b border-gray-300">
					Your saved files
				</p>
				<div className="flex flex-col h-64 px-5 py-5 space-y-3 overflow-y-auto">
					<Saved
						name="tailwind modal"
						description="Lorem ipsum dolor sit ame..."
						link="#"
					/>
				</div>
			</div>
		</div>
	);
}
