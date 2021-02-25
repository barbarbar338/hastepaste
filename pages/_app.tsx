import NextApp from "next/app";
import { DefaultSeo } from "next-seo";
import CookieConsent from "react-cookie-consent";
import { ToastContainer } from "react-toastify";
import { Provider } from "next-auth/client";

import "react-toastify/dist/ReactToastify.css";
import "ldbutton/dist/ldbtn.min.css";
import "prismjs/themes/prism-solarizedlight.css";
import "tippy.js/dist/tippy.css";
import "@styles/tailwind.css";
import "@styles/index.scss";

class App extends NextApp {
	render(): JSX.Element {
		const { Component, pageProps } = this.props;
		return (
			<Provider session={pageProps.session}>
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
			</Provider>
		);
	}
}

export default App;
