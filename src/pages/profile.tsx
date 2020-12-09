import { NextSeo } from "next-seo";
import { useFetchUser } from "@libs/useFetchUser";
import { useEffect, useState } from "react";
import HeroCards from "@components/HeroCards/index";
import HeroCardsSkeleton from "@components/HeroCards/skeleton";
import Cards from "@components/Cards/index";
import CardsSkeleton from "@components/Cards/skeleton";
import Hero from "@components/Hero/index";
import HeroSkeleton from "@components/Hero/skeleton";
import Layout from "@components/Layout/index";
import styles from "@styles/modules/profile.module.scss";
import { LocaleParser } from "@libs/localeParser";
import { useRouter } from "next/router";

export default function ProfilePage(): JSX.Element {
	const { user, loading } = useFetchUser(true);
	const [paste, setPaste] = useState([]);
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	useEffect(() => {
		if (user) setPaste(user.paste as unknown[]);
	});

	return (
		<Layout user={user} loading={loading}>
			<NextSeo
				title={
					loading
						? (parser.get("pages_profile_loading") as string)
						: (parser.get("pages_profile_title") as string)
				}
			/>
			<div className={styles.hero}>
				{loading || !user ? (
					<HeroSkeleton />
				) : (
					<Hero mail={(user.user.mail as string).split("@")[0]} />
				)}
			</div>
			<div className={styles.content}>
				<div className={styles.cards}>
					{loading || !user ? <HeroCardsSkeleton /> : <HeroCards paste={paste} />}
					{loading || !user ? <CardsSkeleton /> : <Cards paste={paste} />}
				</div>
			</div>
		</Layout>
	);
}
