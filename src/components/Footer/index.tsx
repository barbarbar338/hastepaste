import Link from "next/link";
import CONFIG from "src/config";

export default function Footer(): JSX.Element {
	return (
		<footer className="footer bg-white relative pt-1 mt-6">
			<div className="container mx-auto px-6">
				<div className="sm:flex sm:mt-8">
					<div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
						<div className="flex flex-col">
							<span className="font-bold text-gray-700 uppercase mb-2">Follow Us</span>
							{CONFIG.FOOTER.FOLLOW_US.map((profile, idx) => (
								<span key={idx} className="my-2">
									<Link href={profile.path}>
										<span className="text-pink-600 cursor-pointer text-md hover:text-pink-400">
											{profile.name}
										</span>
									</Link>
								</span>
							))}
						</div>
						<div className="flex flex-col">
							<span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">
								Useful Links
							</span>
							{CONFIG.FOOTER.USEFUL_LINKS.map((profile, idx) => (
								<span key={idx} className="my-2">
									<Link href={profile.path}>
										<span className="text-pink-600 cursor-pointer text-md hover:text-pink-400">
											{profile.name}
										</span>
									</Link>
								</span>
							))}
						</div>
						<div className="flex flex-col">
							<span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">
								Contact Us
							</span>
							{CONFIG.FOOTER.CONTACT_US.map((profile, idx) => (
								<span key={idx} className="my-2">
									<Link href={profile.path}>
										<span className="text-pink-600 cursor-pointer text-md hover:text-pink-400">
											{profile.name}
										</span>
									</Link>
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
			<div className="container mx-auto px-6">
				<div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
					<div className="sm:w-2/3 text-center py-6">
						<p className="text-sm mb-2">
							<span className="text-pink-300">HastePaste</span> © 2020 | Back-end &
							front-end by{" "}
							<Link href="https://github.com/barbarbar338">
								<span className="text-pink-300 cursor-pointer hover:text-pink-200">
									barbarbar338
								</span>
							</Link>{" "}
							- Design by{" "}
							<Link href="https://github.com/thisisroi">
								<span className="text-pink-300 cursor-pointer hover:text-pink-200">
									Roi
								</span>
							</Link>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
