import { LocaleParser } from "@libs/localeParser";
import { useRouter } from "next/router";
import { FC } from "react";
import styles from "./index.module.scss";

export interface HeroProps {
	mail: string;
}

const Hero: FC<HeroProps> = ({ mail }) => {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<h1
					dangerouslySetInnerHTML={{
						__html: parser.get("components_hero_header", { mail }) as string,
					}}
				/>
				<p>{parser.get("components_hero_description")}</p>
			</div>
		</div>
	);
};

export default Hero;
