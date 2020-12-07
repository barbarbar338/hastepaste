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

export default function ProfilePage(): JSX.Element {
	const { user, loading } = useFetchUser(true);
	const [paste, setPaste] = useState([]);

	useEffect(() => {
		if (user) setPaste(user.paste as unknown[]);
	});

	return (
		<Layout user={user} loading={loading}>
			<NextSeo title={loading ? "Loading" : "Profile"} />
			<div>
				<div className="w-full bg-dust-500">
					{loading || !user ? (
						<HeroSkeleton />
					) : (
						<Hero mail={(user.user.mail as string).split("@")[0]} />
					)}
				</div>
				<div className="container max-w-screen-xl mx-auto -mt-24">
					<div className="px-5 lg:px-0">
						{loading || !user ? <HeroCardsSkeleton /> : <HeroCards paste={paste} />}
						{loading || !user ? <CardsSkeleton /> : <Cards paste={paste} />}
					</div>
				</div>
			</div>
		</Layout>
	);
}
