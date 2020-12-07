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
import styles from "@styles/modules/signup.module.scss";

export default function Signup(): JSX.Element {
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [, setCookie] = useCookies();
	const { user, loading: userLoading } = useFetchUser(false);
	const router = useRouter();

	useEffect(() => {
		if (user) router.push("/profile");
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
		setLoading(false);
		if (body.message === "This mail is already registered")
			return toast.error("❌ This e-mail is already in use.");
		setCookie("access_token", body.data.access_token);
		router.push("/profile");
	};

	return (
		<Layout user={user} loading={userLoading}>
			<NextSeo title="Sign Up" />
			<div className={styles.hero}>
				<div>
					<h1>Sign Up</h1>
					<p>Join the magical world of HastePaste!</p>
				</div>
			</div>
			<div className={styles.content}>
				<form onSubmit={handleForm}>
					<ul>
						<li>
							<p>E-Mail</p>
							<input
								className={styles.smInput}
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
								className={styles.smInput}
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
							<label className={styles.checkbox}>
								<input
									type="checkbox"
									onClick={() => setIsChecked(!isChecked)}
									defaultChecked={isChecked}
								/>
								<span>
									I have read and accept the
									<Link href="/tos">
										<span className={styles.link}>terms of use</span>
									</Link>
									.
								</span>
							</label>
							<span className={styles.required}>* Required.</span>
						</li>
						<button>{loading ? <BarLoader /> : "Sign Up"}</button>
						<li className="items-center">
							<span className={styles.lower}>
								Already have an account?{" "}
								<Link href="/login">
									<span>Login</span>
								</Link>
							</span>
						</li>
					</ul>
				</form>
			</div>
		</Layout>
	);
}
