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
import { LocaleParser } from "@libs/localeParser";

export default function Login(): JSX.Element {
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [isVerified, setIsVerified] = useState(false);

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
		if (!isVerified)
			return toast.error(`❌ ${parser.get("pages_login_form_robot_error")}`);
		if (!mail)
			return toast.error(`❌ ${parser.get("pages_login_form_mail_error")}`);
		if (!password)
			return toast.error(`❌ ${parser.get("pages_login_form_password_error")}`);
		if (password.length < 8)
			return toast.error(
				`❌ ${parser.get("pages_login_form_password_length_error")}`,
			);
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
				`❌ ${parser.get("pages_login_form_invalid_mail_or_password")}`,
			);
		setCookie("access_token", body.data.access_token, {
			maxAge: 60 * 60 * 24 * 365,
		});
		router.push("/profile");
	};

	return (
		<Layout user={user} loading={userLoading}>
			<NextSeo title={parser.get("pages_login_title") as string} />
			<div className={styles.hero}>
				<div>
					<h1>{parser.get("pages_login_title")}</h1>
					<p>{parser.get("pages_login_description")}</p>
				</div>
			</div>
			<div className={styles.content}>
				<form onSubmit={handleForm}>
					<ul>
						<li>
							<p>{parser.get("pages_login_form_fields_mail")}</p>
							<input
								placeholder="account@hastepaste.xyz"
								type="email"
								onChange={(e) => setMail(e.target.value)}
								required
							/>
							<span className={styles.required}>{parser.get("required")}</span>
						</li>
						<li>
							<p>{parser.get("pages_login_form_fields_password")}</p>
							<input
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
							<span className={styles.required}>{parser.get("required")}</span>
						</li>
						<button>
							{loading ? <BarLoader /> : parser.get("pages_login_form_button")}
						</button>
						<li className="items-center">
							<span className={styles.lower}>
								{parser.get("pages_login_sign_up_message")}{" "}
								<Link href="/signup">
									<span>{parser.get("pages_login_sign_up")}</span>
								</Link>
							</span>
						</li>
					</ul>
				</form>
			</div>
		</Layout>
	);
}
