export default function Hero(): JSX.Element {
	return (
		<div className="container flex flex-col items-center max-w-screen-xl px-16 pt-10 pb-32 mx-auto sm:flex-row">
			<div className="flex flex-col w-full pb-10 text-center sm:pb-0 sm:text-left">
				<h1 className="text-4xl text-white">
					Hello <span className="font-semibold">Stranger</span>
				</h1>
				<p className="text-xl text-white">Give us some time to remember you.</p>
			</div>
		</div>
	);
}
