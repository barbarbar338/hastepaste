import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { InitOptions } from "next-auth";
import Providers from "next-auth/providers";
import constants from "@libs/constants";

const options: InitOptions = {
	providers: [
		Providers.GitHub({
			clientId: constants.GITHUB_ID,
			clientSecret: constants.GITHUB_SECRET,
		}),
		Providers.Discord({
			clientId: constants.DISCORD_ID,
			clientSecret: constants.DISCORD_SECRET
		})
	],
	secret: constants.SECRET,
	jwt: {
		secret: constants.SECRET,
	},
};

export default (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
	NextAuth(req, res, options);
