import { FC, useState } from "react";
import BarLoader from "@components/BarLoader";
import { toast } from "react-toastify";
import { useFetchUser } from "@libs/useFetchUser";
import CONFIG from "src/config";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

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
		router.push(`/explore?id=${encodeURIComponent(body.data.id)}`);
	};

	return (
		<div className={styles.bg}>
			<div className={styles.wrapper}>
				<div className={styles.myCont}>
					<span className={`${styles.icon} material-icons-round`}>text_snippet</span>
					<div className={styles.content}>
						<div className={styles.details}>
							<h1>{name}</h1>
							<p>{description}</p>
						</div>
						<div className={styles.button}>
							<button
								className={canFork ? "cursor-pointer" : "cursor-not-allowed"}
								onClick={handleButton}
							>
								{canFork ? (
									<span className="material-icons-round">bookmark</span>
								) : (
									<span className="material-icons-round">highlight_off</span>
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
