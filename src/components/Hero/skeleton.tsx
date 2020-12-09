import { LocaleParser } from "@libs/localeParser";
import { useRouter } from "next/router";
import styles from "./index.module.scss";

export default function HeroSkeleton(): JSX.Element {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1
					dangerouslySetInnerHTML={{
						__html: parser.get("components_hero_header_skeleton") as string,
					}}
				/>
				<p>{parser.get("components_hero_description_skeleton")}</p>
			</div>
		</div>
	);
}
