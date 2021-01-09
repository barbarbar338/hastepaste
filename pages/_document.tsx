import Document, { Html, Head, Main, NextScript } from "next/document";
import Favicon from "@assets/icons/default-defaultnobg2048.png";
import TwitterImage from "@assets/icons/default-default2048.png";
import Banner from "@assets/banners/default-wavewhite1024x512.png";

class CustomDocument extends Document {
	render(): JSX.Element {
		return (
			<Html>
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
					<meta name="og:image" content={Banner} />
					<meta name="twitter:image" content={TwitterImage} />
					<link rel="icon" href={Favicon} />
					<link rel="canonical" href="https://hastepaste.xyz/" />
					<script async src="https://www.googletagmanager.com/gtag/js?id=G-PSDKSXHVKS"></script>
					<script 
						dangerouslySetInnerHTML={{
							__html: `
								window.dataLayer = window.dataLayer || [];
								function gtag(){dataLayer.push(arguments);}
								gtag("js", new Date());

								gtag("config", "G-PSDKSXHVKS");
							`
						}}
					/>
				</Head>
				<body>
					<Main />
					<script src="https://cdn.polyfill.io/v2/polyfill.min.js" />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default CustomDocument;
