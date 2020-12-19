import { useFetchUser } from "@libs/useFetchUser";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import CONFIG from "@base/config";
import { useCookies } from "react-cookie";
import Recaptcha from "react-recaptcha";
import Link from "next/link";
import BarLoader from "@components/BarLoader";
import Layout from "@components/Layout/index";
import styles from "@styles/modules/signup.module.scss";
import { LocaleParser } from "@libs/localeParser";

export default function Signup(): JSX.Element {
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [isVerified, setIsVerified] = useState(false);
	const [isChecked, setIsChecked] = useState(false);
	const [, setCookie] = useCookies();
	const { user, loading: userLoading } = useFetchUser(false);
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	useEffect(() => {
		if (user) router.push("/profile");
	});

	const handleForm = async (e) => {
		if (loading) return;
		e.preventDefault();
		if (!isChecked)
			return toast.error(`❌ ${parser.get("pages_signup_error_tos")}`);
		if (!isVerified)
			return toast.error(`❌ ${parser.get("pages_signup_error_robot")}`);
		if (!mail) return toast.error(`❌ ${parser.get("pages_signup_error_mail")}`);
		if (!password)
			return toast.error(`❌ ${parser.get("pages_signup_error_password")}`);
		if (password.length < 8)
			return toast.error(`❌ ${parser.get("pages_signup_error_password_length")}`);
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
			return toast.error(`❌ ${parser.get("pages_signup_error_mail_in_use")}`);
		setCookie("access_token", body.data.access_token);
		router.push("/profile");
	};

	return (
		<Layout user={user} loading={userLoading}>
			<NextSeo title={parser.get("pages_signup_title") as string} />
			<div className={styles.hero}>
				<div>
					<h1>{parser.get("pages_signup_title")}</h1>
					<p>{parser.get("pages_signup_description")}</p>
				</div>
			</div>
			<div className={styles.content}>
				<form onSubmit={handleForm}>
					<ul>
						<li>
							<p>{parser.get("pages_signup_form_mail")}</p>
							<input
								className={styles.smInput}
								placeholder="account@hastepaste.xyz"
								type="email"
								onChange={(e) => setMail(e.target.value)}
								required
							/>
							<span className={styles.required}>{parser.get("required")}</span>
						</li>
						<li>
							<p>{parser.get("pages_signup_form_password")}</p>
							<input
								className={styles.smInput}
								placeholder="●●●●●●●●"
								type="password"
								onChange={(e) => setPassword(e.target.value)}
								required
							/>
							<span className={styles.required}>{parser.get("required")}</span>
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
									{parser.get("pages_signup_read_tos")}
									<Link href="/tos">
										<span className={styles.link}>{parser.get("pages_signup_tos")}</span>
									</Link>
									.
								</span>
							</label>
							<span className={styles.required}>{parser.get("required")}</span>
						</li>
						<button>
							{loading ? <BarLoader /> : parser.get("pages_signup_button")}
						</button>
						<li className="items-center">
							<span className={styles.lower}>
								{parser.get("pages_signup_has_account")}{" "}
								<Link href="/login">
									<span>{parser.get("pages_signup_button_login")}</span>
								</Link>
							</span>
						</li>
					</ul>
				</form>
			</div>
		</Layout>
	);
}
