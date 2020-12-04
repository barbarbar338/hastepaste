import NextApp from "next/app";
import { DefaultSeo } from "next-seo";
import CookieConsent from "react-cookie-consent";
import { ToastContainer } from "react-toastify";

import Navbar from "@components/Navbar";
import Layout from "@components/Layout/index";

import "react-toastify/dist/ReactToastify.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "@styles/tailwind.css";
import "@styles/styles.css";

class App extends NextApp {
	render(): JSX.Element {
		const { Component, pageProps } = this.props;
		return (
			<>
				<DefaultSeo titleTemplate="%s - HastePaste" />
				<Layout>
					<div className="w-full bg-pink-500">
						<div className="flex flex-wrap w-full">
							<Navbar />
						</div>
					</div>
					<Component {...pageProps} />
				</Layout>
				<CookieConsent
					location="bottom"
					buttonText="Close"
					cookieName="cookie_alert_disable"
					style={{
						background: "#f56a79",
					}}
					buttonStyle={{
						background: "white",
						borderRadius: "10px",
					}}
					expires={150}
				>
					This website uses cookies to enhance the user experience.
				</CookieConsent>
				<ToastContainer
					position="bottom-right"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					draggable
					pauseOnHover
				/>
			</>
		);
	}
}

export default App;
