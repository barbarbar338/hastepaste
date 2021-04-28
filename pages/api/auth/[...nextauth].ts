import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import Providers from "next-auth/providers";
import constants from "@libs/constants";

const options: NextAuthOptions = {
	providers: [
		Providers.GitHub({
			clientId: constants.GITHUB_ID,
			clientSecret: constants.GITHUB_SECRET,
		}),
		Providers.Discord({
			clientId: constants.DISCORD_ID,
			clientSecret: constants.DISCORD_SECRET,
		}),
		Providers.Email({
			from: constants.EMAIL_FROM,
			server: constants.EMAIL_SERVER,
		}),
	],
	secret: constants.SECRET,
	jwt: {
		secret: constants.SECRET,
	},
	database: constants.MONGODB_URI,
};

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);
