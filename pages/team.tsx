import { LocaleParser } from "@libs/localeParser";
import Layout from "@components/Layout";
import { useRouter } from "next/router";
import TeamCard from "@components/TeamCard";
import styles from "@styles/modules/team.module.scss";
import { motion, Variants } from "framer-motion";

const users = [
	{
		name: "Barış DEMİRCİ",
		title: "Full-Stack Developer",
		site: "https://bariscodes.me/",
		github: "barbarbar338",
		avatar: "https://avatars.githubusercontent.com/u/35371155",
	},
	{
		name: "Barış GÖKTEPE",
		title: "Back-End Developer",
		site: "https://github.com/bckd00r",
		github: "bckd00r",
		avatar: "https://avatars.githubusercontent.com/u/48347237",
	},
	{
		name: "nicotinexgucci",
		title: "Russian Translator",
		site: "https://nicotinetranslation.xyz/",
		github: "nicotinexgucci",
		avatar: "https://avatars.githubusercontent.com/u/78096621",
	},
];

const container: Variants = {
	hidden: {
		opacity: 1,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

export default function TeamPage(): JSX.Element {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	return (
		<Layout title={parser.get("team") as string}>
			<motion.div
				className={styles.wrapper}
				variants={container}
				initial="hidden"
				animate="visible"
			>
				{users.map((user, idx) => (
					<TeamCard key={idx} {...user} />
				))}
			</motion.div>
		</Layout>
	);
}
