import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import Favicon from "@brand-kit/icons/default-defaultnobg2048.png";
import TwitterImage from "@brand-kit/icons/default-default2048.png";
import Banner from "@brand-kit/banners/default-wavewhite1024x512.png";

class CustomDocument extends Document {
	render(): JSX.Element {
		return (
			<Html>
				<Head>
					<link rel="icon" href={Favicon} />
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
