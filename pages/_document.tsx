import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class CustomDocument extends Document {
	render(): JSX.Element {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<Script
						async
						src="https://www.googletagmanager.com/gtag/js?id=G-PSDKSXHVKS"
					/>
					<Script
						id="google-analytics"
						dangerouslySetInnerHTML={{
							__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag("js", new Date());

								gtag("config", "G-PSDKSXHVKS");
							`,
						}}
					/>
					<Script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
