import { useFetchUser } from "@libs/useFetchUser";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CONFIG from "src/config";
import { useCookies } from "react-cookie";
import Recaptcha from "react-recaptcha";
import Link from "next/link";
import BarLoader from "@components/BarLoader";
import Layout from "@components/Layout/index";
import styles from "@styles/modules/login.module.scss";

export default function Login(): JSX.Element {
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [isVerified, setIsVerified] = useState(false);

	const [, setCookie] = useCookies();
	const { user, loading: userLoading } = useFetchUser(false);
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
		setCookie("access_token", body.data.access_token, {
			maxAge: 60 * 60 * 24 * 365,
		});
		router.push("/profile");
	};

	return (
		<Layout user={user} loading={userLoading}>
			<NextSeo title="Login" />
			<div className={styles.hero}>
				<div>
					<h1>Login</h1>
					<p>Welcome back to HastePaste's magical world!</p>
				</div>
			</div>
			<div className={styles.content}>
				<form onSubmit={handleForm}>
					<ul>
						<li>
							<p>E-Mail</p>
							<input
								placeholder="account@hastepaste.xyz"
								type="email"
								onChange={(e) => setMail(e.target.value)}
								required
							/>
							<span className={styles.required}>* Required.</span>
						</li>
						<li>
							<p>Password</p>
							<input
								placeholder="●●●●●●●●"
								type="password"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<span className={styles.required}>* Required.</span>
						</li>
						<li>
							<Recaptcha
								sitekey={CONFIG.GRECAPTCHA_KEY}
								render="explicit"
								verifyCallback={() => setIsVerified(true)}
								expiredCallback={() => setIsVerified(false)}
							/>
							<span className={styles.required}>* Required.</span>
						</li>
						<button>{loading ? <BarLoader /> : "Login"}</button>
						<li className="items-center">
							<span className={styles.lower}>
								Don't have an account?{" "}
								<Link href="/signup">
									<span>Sign Up</span>
								</Link>
							</span>
						</li>
					</ul>
				</form>
			</div>
		</Layout>
	);
}
