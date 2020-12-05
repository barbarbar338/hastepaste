import { useFetchUser } from "@libs/useFetchUser";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CONFIG from "src/config";
import { Cookies } from "react-cookie";
import Loader from "react-loader-spinner";
import Recaptcha from "react-recaptcha";
import Link from "next/link";

const cookie = new Cookies();

export default function Login(): JSX.Element {
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const { user } = useFetchUser(false);
	const router = useRouter();

	useEffect(() => {
		if (user) router.push("/profile");
	});

	const handleForm = async (e) => {
		if (loading) return;
		e.preventDefault();
		if (!isVerified) return toast.error("❌ Are you a robot?");
		if (!mail) return toast.error("❌ Please provide a valid e-mail address.");
		if (!password) return toast.error("❌ Please provide your password.");
		if (password.length < 8)
			return toast.error("❌ Your password must be longer than 8 characters.");
		setLoading(true);
		const headers = { "Content-Type": "application/json" };
		const res = await fetch(`${CONFIG.API_URL}/auth/login`, {
			method: "POST",
			headers,
			body: JSON.stringify({ mail, password }),
		});
		const body = await res.json();
		setLoading(false);
		if (body.message === "Invalid mail or password")
			return toast.error(
				"❌ Make sure you enter your email and password correctly.",
			);
		cookie.set("access_token", body.data.access_token);
		router.push("/profile");
	};

	return (
		<>
			<NextSeo title="Login" />
			<div>
				<div className="bg-pink-500">
					<div className="container flex flex-col max-w-screen-xl px-5 py-16 mx-auto lg:px-0">
						<h1 className="text-3xl font-medium text-white">Login</h1>
						<p className="text-pink-100 ">
							Welcome back to HastePaste's magical world!
						</p>
					</div>
				</div>
				<div className="container max-w-screen-xl px-5 mx-auto -mt-10 lg:px-0">
					<form onSubmit={handleForm}>
						<ul className="grid w-full grid-cols-1 px-5 py-5 bg-white rounded-lg lg:grid-cols-2 -gap-4">
							<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
								<p className="text-gray-900">E-Mail</p>
								<input
									className="w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md text-md focus:outline-none"
									placeholder="account@hastepaste.xyz"
									type="email"
									onChange={(e) => setMail(e.target.value)}
									required
								/>
								<span className="text-xs text-red-400">* Required.</span>
							</li>
							<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
								<p className="text-gray-900">Password</p>
								<input
									className="w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md text-md focus:outline-none"
									placeholder="●●●●●●●●"
									type="password"
									onChange={(e) => setPassword(e.target.value)}
									required
								/>
								<span className="text-xs text-red-400">* Required.</span>
							</li>
							<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
								<Recaptcha
									sitekey={CONFIG.GRECAPTCHA_KEY}
									render="explicit"
									verifyCallback={() => setIsVerified(true)}
									expiredCallback={() => setIsVerified(false)}
								/>
								<span className="text-xs text-red-400">* Required.</span>
							</li>
							<button className="w-full col-span-3 px-3 py-3 text-sm font-medium text-white transition duration-150 bg-pink-500 rounded-lg hover:bg-pink-600 focus:outline-none">
								{loading ? (
									<span>
										<Loader
											type="ThreeDots"
											color="#fff"
											style={{
												width: "8%",
												margin: "auto",
											}}
										/>
									</span>
								) : (
									"Login"
								)}
							</button>
							<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg items-center">
								<span className="text-xs">
									Don't have an account?{" "}
									<Link href="/signup">
										<span className="text-pink-600 cursor-pointer hover:text-pink-400">
											Sign Up
										</span>
									</Link>
								</span>
							</li>
						</ul>
					</form>
				</div>
			</div>
		</>
	);
}
