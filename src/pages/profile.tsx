import { NextSeo } from "next-seo";
import { useFetchUser } from "@libs/useFetchUser";

import HeroCards from "@components/HeroCards/index";
import HeroCardsSkeleton from "@components/HeroCards/skeleton";
import Cards from "@components/Cards/index";
import CardsSkeleton from "@components/Cards/skeleton";
import Hero from "@components/Hero/index";
import HeroSkeleton from "@components/Hero/skeleton";



export default function ProfilePage() {
	const { loading } = useFetchUser();

	if (loading) return (
		<>
			<NextSeo title="Loading" />
			
			<div>
				<div className="w-full bg-blue-500">
					<HeroSkeleton />
				</div>
				<div className="container max-w-screen-xl mx-auto -mt-24">
					<div className="px-5 lg:px-0">
						<HeroCardsSkeleton />
						<CardsSkeleton />
					</div>
				</div>
			</div>		
		</>
	)

	return (
		<>
			<NextSeo title="Profile" />
			<div>
				<div className="w-full bg-blue-500">
					<Hero />
				</div>
				<div className="container max-w-screen-xl mx-auto -mt-24">
					<div className="px-5 lg:px-0">
						<HeroCards />
						<Cards />
					</div>
				</div>
			</div>
		</>
	);
}
