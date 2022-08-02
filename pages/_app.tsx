import NextApp from "next/app";
import { DefaultSeo } from "next-seo";
import CookieConsent from "react-cookie-consent";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import Favicon from "@assets/icons/default-defaultnobg2048.png";
import TwitterImage from "@assets/icons/default-default2048.png";
import Banner from "@assets/banners/default-wavewhite1024x512.png";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "react-toastify/dist/ReactToastify.css";
import "ldbutton/index.min.css";
import "tippy.js/dist/tippy.css";
import "@styles/satoshi.css";
import "@styles/tailwind.css";
import "@styles/index.scss";

class App extends NextApp {
	render(): JSX.Element {
		const { Component, pageProps } = this.props;
		return (
			<>
				<Head>
					<meta charSet="utf-8" />
					<meta name="HandheldFriendly" content="true" />
					<meta name="robots" content="INDEX, FOLLOW" />
					<meta name="copyright" content="Barış DEMİRCİ | HastePaste" />
					<meta name="theme-color" content="#ff414d" />
					<meta name="author" content="Barış DEMİRCİ, demirci.baris38@gmail.com" />
					<meta
						name="description"
						content="Quickly share a snippet of your code, note or paragraph with your friends!"
					/>
					<meta name="og:title" content="HastePaste" />
					<meta name="og:site_name" content="HastePaste" title="title" />
					<meta name="og:url" content="https://hastepaste.xyz" />
					<meta
						name="keywords"
						content="haste, paste, code, share, snippet, note, bin"
					/>
					<meta name="og:image" content={Banner.src} />
					<meta name="twitter:image" content={TwitterImage.src} />
					<link rel="icon" href={Favicon.src} />
					<link rel="canonical" href="https://hastepaste.xyz/" />
				</Head>
				<SessionProvider session={pageProps.session}>
					<NextNProgress color="#8d53b5" />
					<DefaultSeo titleTemplate="%s - HastePaste" />
					<Component {...pageProps} />
					<CookieConsent
						location="bottom"
						buttonText="Close"
						cookieName="cookie_alert_disable"
						style={{
							background: "#d09af5",
							color: "black",
						}}
						buttonStyle={{
							background: "white",
							borderRadius: "10px",
						}}
						expires={150}
					>
						This website uses cookies to enhance the user experience.
					</CookieConsent>
					<ToastContainer position="bottom-right" />
				</SessionProvider>
			</>
		);
	}
}

export default App;
