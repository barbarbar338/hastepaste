export default function Footer() {
	return (
		<footer className="footer bg-white relative pt-1 mt-6">
			<div className="container mx-auto px-6">
				<div className="sm:flex sm:mt-8">
					<div className="mt-8 sm:mt-0 sm:w-full sm:px-8 flex flex-col md:flex-row justify-between">
						<div className="flex flex-col">
							<span className="font-bold text-gray-700 uppercase mb-2">
								Footer header 1
							</span>
							<span className="my-2">
								<a href="#" className="text-blue-700  text-md hover:text-blue-500">
									link 1
								</a>
							</span>
							<span className="my-2">
								<a href="#" className="text-blue-700  text-md hover:text-blue-500">
									link 1
								</a>
							</span>
							<span className="my-2">
								<a href="#" className="text-blue-700  text-md hover:text-blue-500">
									link 1
								</a>
							</span>
						</div>
						<div className="flex flex-col">
							<span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">
								Footer header 2
							</span>
							<span className="my-2">
								<a href="#" className="text-blue-700 text-md hover:text-blue-500">
									link 1
								</a>
							</span>
							<span className="my-2">
								<a href="#" className="text-blue-700  text-md hover:text-blue-500">
									link 1
								</a>
							</span>
							<span className="my-2">
								<a href="#" className="text-blue-700 text-md hover:text-blue-500">
									link 1
								</a>
							</span>
						</div>
						<div className="flex flex-col">
							<span className="font-bold text-gray-700 uppercase mt-4 md:mt-0 mb-2">
								Footer header 3
							</span>
							<span className="my-2">
								<a href="#" className="text-blue-700  text-md hover:text-blue-500">
									link 1
								</a>
							</span>
							<span className="my-2">
								<a href="#" className="text-blue-700  text-md hover:text-blue-500">
									link 1
								</a>
							</span>
							<span className="my-2">
								<a href="#" className="text-blue-700  text-md hover:text-blue-500">
									link 1
								</a>
							</span>
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
							<a
								href="https://github.com/barbarbar338"
								target="_blank"
								className="text-pink-300"
							>
								barbarbar338
							</a>{" "}
							- Design by{" "}
							<a
								href="https://github.com/thisisroi"
								target="_blank"
								className="text-pink-300"
							>
								Roi
							</a>
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
