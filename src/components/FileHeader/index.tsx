import { FC, useState } from "react";
import BarLoader from "@components/BarLoader";
import { toast } from "react-toastify";
import { useFetchUser } from "@libs/useFetchUser";
import CONFIG from "src/config";
import { useRouter } from "next/router";

export interface FileHeaderProps {
	name: string;
	description: string;
	canFork: boolean;
	id: string;
}

const FileHeader: FC<FileHeaderProps> = (props) => {
	const { name, description, canFork, id } = props;
	const [loading, setLoading] = useState(false);
	const { user } = useFetchUser(false);
	const router = useRouter();

	const handleButton = async () => {
		if (loading) return;
		if (!user) return toast.error("❌ You need to be logged in to fork a paste.");
		if (user.is_banned)
			return toast.error(
				"❌ You cannot fork a paste because you are banned from the system.",
			);
		if (!canFork) return toast.error("❌ You can't fork this paste.");
		setLoading(true);
		const res = await fetch(`${CONFIG.API_URL}/paste/fork?id=${id}`, {
			headers: {
				Authorization: user.access_token,
			},
		});
		const body = await res.json();
		setLoading(false);
		if (
			body.message === "This paste is reported and only can be forked by an admin"
		)
			return toast.error(
				"❌ This paste is reported and only can be forked by an admin.",
			);
		if (body.message === "You cannot fork your paste")
			return toast.error("❌ You cannot fork your paste.");
		if (!res.ok)
			return toast.error("❌ An error occured. Please try again later");
		router.push(`/explore?id=${body.data.id}`);
	};

	return (
		<div className="bg-pink-500">
			<div className="container max-w-screen-xl px-4 py-12 mx-auto md:px-0">
				<div className="flex items-center space-x-4">
					<span
						className="text-white material-icons-round"
						style={{ fontSize: "100px" }}
					>
						folder
					</span>
					<div className="flex w-full">
						<div className="flex flex-col">
							<h1 className="text-2xl font-semibold text-white">{name}</h1>
							<p className="text-sm font-normal text-pink-100">{description}</p>
						</div>
						<div className="flex items-center justify-end flex-1">
							<button
								className={`text-pink-500 text-sm bg-white flex items-center rounded-lg px-4 md:px-8 py-2.5 focus:outline-none ${
									canFork ? "cursor-pointer" : "cursor-not-allowed"
								}`}
								onClick={handleButton}
							>
								{canFork ? (
									<span className="mr-1 text-pink-500 material-icons-round">
										bookmark
									</span>
								) : (
									<span className="mr-1 text-pink-500 material-icons-round">
										highlight_off
									</span>
								)}
								{canFork ? loading ? <BarLoader dark /> : "Fork" : "Can't Fork"}
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FileHeader;
