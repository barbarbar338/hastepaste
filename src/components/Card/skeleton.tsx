import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

export default function Card() {
    return (
		<a
			target="_blank"
			className="flex flex-col items-center justify-center bg-white rounded-md shadow"
		>
			<span
				className="hidden text-blue-500 material-icons-round md:block"
				style={{ fontSize: "128px" }}
			>
				folder
			</span>
			<span
				className="block text-blue-500 material-icons-round md:hidden"
				style={{ fontSize: "72px" }}
			>
				folder
			</span>
			<div className="items-center justify-center w-full px-2 py-2 border-t border-gray-200 rounded-b-md">
                <Typography variant="caption">
                    <Skeleton />
                </Typography>
			</div>
		</a>
	);
};
