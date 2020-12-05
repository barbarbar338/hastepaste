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

export default function Signup(): JSX.Element {
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const { user } = useFetchUser(false);
	const router = useRouter();

	useEffect(() => {
		if (user) router.push("/");
	});

	const handleForm = async (e) => {
		if (loading) return;
		e.preventDefault();
		if (!isChecked)
			return toast.error("❌ Confirm that you accept the terms of use.");
		if (!isVerified) return toast.error("❌ Are you a robot?");
		if (!mail) return toast.error("❌ Please provide a valid e-mail address.");
		if (!password) return toast.error("❌ Please provide your password.");
		if (password.length < 8)
			return toast.error("❌ Your password must be longer than 8 characters.");
		setLoading(true);
		const headers = { "Content-Type": "application/json" };
		const res = await fetch(`${CONFIG.API_URL}/auth/signup`, {
			method: "POST",
			headers,
			body: JSON.stringify({ mail, password }),
		});
		const body = await res.json();
		if (body.message === "This mail is already registered")
			return toast.error("❌ This e-mail is already in use.");
		cookie.set("access_token", body.data.access_token);
		setLoading(false);
		router.push("/profile");
	};

	return (
		<>
			<NextSeo title="Sign Up" />
			<div>
				<div className="bg-pink-500">
					<div className="container flex flex-col max-w-screen-xl px-5 py-16 mx-auto lg:px-0">
						<h1 className="text-3xl font-medium text-white">Sign Up</h1>
						<p className="text-pink-100 ">Join the magical world of HastePaste!</p>
					</div>
				</div>
				<div className="container max-w-screen-xl px-5 mx-auto -mt-10 lg:px-0">
					<form onSubmit={handleForm}>
						<ul className="grid w-full grid-cols-1 px-5 py-5 bg-white rounded-lg lg:grid-cols-2 -gap-4">
							<li className="flex flex-col w-full col-span-3 px-5 py-5 space-y-2 bg-transparent rounded-lg">
								<p className="text-gray-900">E-Mail</p>
								<input
									className="w-full px-5 py-3 text-sm text-gray-600 placeholder-gray-300 bg-transparent border border-gray-300 rounded-md text-md focus:outline-none"
									placeholder="My awesome paste!"
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
									placeholder="Take a look at this paste"
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
								<label className="inline-flex items-center mt-3">
									<input
										type="checkbox"
										className="form-checkbox h-5 w-5 text-gray-600"
										onClick={() => setIsChecked(!isChecked)}
										defaultChecked={isChecked}
									/>
									<span className="ml-2 text-gray-700">
										I have read and accept the{" "}
										<Link href="/tos">
											<span className="text-pink-400 cursor-pointer">terms of use</span>
										</Link>
										.
									</span>
								</label>
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
									"Sign Up"
								)}
							</button>
						</ul>
					</form>
				</div>
			</div>
		</>
	);
}
