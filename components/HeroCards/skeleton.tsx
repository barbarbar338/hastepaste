import { LocaleParser } from "@libs/localeParser";
import { Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
const array = new Array(24).fill("a");

function BulletLoader(): JSX.Element {
	return (
		<div className={styles.bulletSkeleton}>
			<span className={`${styles.icon} material-icons-round`}>text_snippet</span>
			<h1 className={styles.header}>
				<Skeleton>
					<Typography>{array.join("")}</Typography>
				</Skeleton>
			</h1>
			<Skeleton>
				<Typography>{array.join("")}</Typography>
			</Skeleton>
			<a className={styles.copy}>
				<div className={styles.wrapper}>
					<span className={`${styles.icon} material-icons-round`}>content_copy</span>
				</div>
			</a>
		</div>
	);
}

export default function HeroCards(): JSX.Element {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);
	return (
		<div className={styles.wrapper}>
			<div className={styles.publishedWrapper}>
				<p className={styles.header}>
					{parser.get("components_hero_cards_last_published")}
				</p>
				<div className={styles.cards}>
					<BulletLoader />
					<BulletLoader />
					<BulletLoader />
					<BulletLoader />
				</div>
			</div>
			<div className={styles.forkedWrapper}>
				<p className={styles.header}>{parser.get("components_hero_cards_forks")}</p>
				<div className={styles.cards}>
					<BulletLoader />
					<BulletLoader />
					<BulletLoader />
				</div>
			</div>
		</div>
	);
}
