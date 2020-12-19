import CardSkeleton from "@components/Card/skeleton";
import { LocaleParser } from "@libs/localeParser";
import { useRouter } from "next/router";
import styles from "./index.module.scss";
const array = new Array(12).fill(0);

export default function Cards(): JSX.Element {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);
	return (
		<div className={styles.wrapper}>
			<p className={styles.header}>{parser.get("components_cards_your_files")}</p>
			<div className={styles.myGrid}>
				{array.map((card, i) => (
					<CardSkeleton key={i} />
				))}
			</div>
		</div>
	);
}
