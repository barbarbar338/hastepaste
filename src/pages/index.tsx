import * as React from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

import Home from "../components/Home";

const IndexPage: React.FC & NextPage = () => (
	<>
		<NextSeo title="Home" description="" />
		<Home />
	</>
);

export default IndexPage;
