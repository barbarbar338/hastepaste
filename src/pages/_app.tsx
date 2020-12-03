import NextApp from "next/app";
import { DefaultSeo } from "next-seo";
import CookieConsent from "react-cookie-consent";

import Layout from "@components/Layout/index";
import Navbar from "@components/Navbar/index";
import Footer from "@components/Footer/index";

import "@styles/tailwind.css";
import "@styles/styles.css";

class App extends NextApp {
	render(): JSX.Element {
		const { Component, pageProps } = this.props;
		return (
			<>
				<DefaultSeo titleTemplate="%s - HastePaste" />
				<Layout>
					<div className="w-full bg-blue-500">
						<Navbar />
					</div>
					<Component {...pageProps} />
					<Footer />
				</Layout>
				<CookieConsent
					location="bottom"
					buttonText="Close"
					cookieName="cookie_alert_disable"
					style={{ 
						background: "#488df3" 
					}}
					buttonStyle={{
						background: "white",
						borderRadius: "10px"
					}}
					expires={150}
				>
					This website uses cookies to enhance the user experience.
				</CookieConsent>
			</>
		);
	}
}

export default App;
