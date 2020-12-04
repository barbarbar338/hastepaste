import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
const array = new Array(24).fill("a");

function BulletLoader(): JSX.Element {
	return (
		<div>
			<div className="flex items-center px-3 py-3 space-x-6 bg-pink-100 rounded-md">
				<span
					className="text-pink-500 select-none material-icons-round"
					style={{ fontSize: "28px" }}
				>
					folder
				</span>
				<h1 className="text-gray-700">
					<Skeleton>
						<Typography>{array.join("")}</Typography>
					</Skeleton>
				</h1>
				<Skeleton>
					<Typography>{array.join("")}</Typography>
				</Skeleton>
				<a className="flex items-center justify-end flex-1">
					<div className="flex cursor-pointer items-center justify-center p-1.5 bg-white rounded-md">
						<span
							className="text-pink-500 material-icons-round"
							style={{ fontSize: "24px" }}
						>
							content_copy
						</span>
					</div>
				</a>
			</div>
		</div>
	);
}

export default function HeroCards(): JSX.Element {
	return (
		<div className="flex flex-col space-y-6 md:space-x-6 md:space-y-0 md:flex-row">
			<div className="flex flex-col w-full bg-white rounded-md shadow md:w-4/6">
				<p className="px-5 py-5 text-2xl text-gray-600 border-b border-gray-300">
					Your published last files
				</p>
				<div className="flex flex-col h-64 px-5 py-5 space-y-3 overflow-y-auto">
					<BulletLoader />
					<BulletLoader />
					<BulletLoader />
					<BulletLoader />
				</div>
			</div>
			<div className="flex flex-wrap bg-white rounded-md shadow md:w-1/2">
				<p className="w-full px-5 py-5 text-2xl text-gray-600 border-b border-gray-300">
					Your saved files
				</p>
				<div className="flex flex-col h-64 px-5 py-5 space-y-3 overflow-y-auto">
					<BulletLoader />
					<BulletLoader />
					<BulletLoader />
				</div>
			</div>
		</div>
	);
}
