import * as React from "react";
import NextApp from "next/app";
import { DefaultSeo } from "next-seo";

import "../styles/tailwind.css";
import "../styles/styles.css";

class App extends NextApp {
	render(): JSX.Element {
		const { Component, pageProps } = this.props;

		return (
			<>
				<DefaultSeo titleTemplate="%s" />
				<Component {...pageProps} />
			</>
		);
	}
}

export default App;
