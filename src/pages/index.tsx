import * as React from "react";
import { NextPage } from "next";
import { NextSeo } from "next-seo";

import Layout from "@components/Layout";
import Home from "@components/Home";

const IndexPage: React.FC & NextPage = () => (
	<>
		<NextSeo title="Home" description="" />
		<Home />
	</>
);

export default Layout(IndexPage);
