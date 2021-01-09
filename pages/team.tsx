import { LocaleParser } from "@libs/localeParser";
import Layout from "@components/Layout";
import { useRouter } from "next/router";
import TeamCard from "@components/TeamCard";
import styles from "@styles/modules/team.module.scss";

const users = [
	{
		name: "Barış DEMİRCİ",
		title: "Full-Stack Developer",
		site: "https://bariscodes.me/",
		github: "barbarbar338",
		avatar: "https://avatars1.githubusercontent.com/u/35371155",
	},
	{
		name: "Amil ALEKBEROV",
		title: "UI/UX Designer",
		site: "http://roi-portfolio.vercel.app/",
		github: "thisisroi",
		avatar: "https://avatars1.githubusercontent.com/u/48417958",
	},
	{
		name: "Barış GÖKTEPE",
		title: "Back-End Developer",
		github: "bckd00r",
		avatar: "https://avatars3.githubusercontent.com/u/48347237",
	},
];

export default function TeamPage(): JSX.Element {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	return (
		<Layout title={parser.get("team") as string}>
			<div className={styles.wrapper}>
				{users.map((user, idx) => (
					<TeamCard key={idx} {...user} />
				))}
			</div>
		</Layout>
	);
}
