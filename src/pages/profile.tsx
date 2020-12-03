import { NextSeo } from "next-seo";

import HeroCards from "@components/HeroCards/index";
import Cards from "@components/Cards/index";
import Hero from "@components/Hero/index";

export default function ProfilePage() {
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
