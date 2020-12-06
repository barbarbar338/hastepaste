import Published from "@components/HeroCardItem/published";
import Saved from "@components/HeroCardItem/saved";
import { FC } from "react";
import styles from "./index.module.scss";

export interface IHeroCard {
	paste: {
		id: string;
		title: string;
		description?: string;
		[key: string]: unknown;
	}[];
}

const HeroCards: FC<IHeroCard> = ({ paste }) => {
	const published = paste
		.filter((i) => !i.fork_id)
		.sort((a, b) => {
			const aDate = new Date(a.createdAt as string).getTime();
			const bDate = new Date(b.createdAt as string).getTime();
			return bDate - aDate;
		})
		.slice(0, 5);
	const forks = paste.filter((i) => i.fork_id);

	return (
		<div className={styles.wrapper}>
			<div className={styles.publishedWrapper}>
				<p className={styles.header}>Your published last files</p>
				<div className={styles.cards}>
					{published.map((i, idx) => (
						<Published
							key={idx}
							name={i.title}
							description={i.description}
							link={`/explore?id=${encodeURIComponent(i.id)}`}
						/>
					))}
				</div>
			</div>
			<div className={styles.forkedWrapper}>
				<p className={styles.header}>Your forks</p>
				<div className={styles.cards}>
					{forks.map((i, idx) => (
						<Saved
							key={idx}
							name={i.title}
							description={i.description}
							link={`/explore?id=${encodeURIComponent(i.id)}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default HeroCards;
