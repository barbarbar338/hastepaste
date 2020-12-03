export default function Hero() {
	return (
		<div className="container flex flex-col items-center max-w-screen-xl px-16 pt-10 pb-32 mx-auto sm:flex-row">
			<div className="flex flex-col w-full pb-10 text-center sm:pb-0 sm:text-left">
				<h1 className="text-4xl text-white">
					Hello <span className="font-semibold">Roi</span>
				</h1>
				<p className="text-xl text-white">Welcome to the island of HastePaste.</p>
			</div>
			<div className="flex items-center justify-center w-full sm:justify-end">
				<div className="box-border flex flex-col items-center justify-center h-48 px-5 py-5 transition duration-150 transform bg-opacity-50 border-4 border-dashed rounded-lg cursor-pointer hover:scale-105 w-80 bg-lapis-300 border-lapis-200">
					<span
						className="material-icons-round text-lapis-100"
						style={{ fontSize: "64px" }}
					>
						add
					</span>
					<p className="text-lapis-200 text-md">Drop file or click and create</p>
				</div>
			</div>
		</div>
	);
}
