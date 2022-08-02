import { NextApiRequest, NextApiResponse } from "next";
import NextAuth, { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import DiscordProvider from "next-auth/providers/discord";
import EmailProvider from "next-auth/providers/email";
import constants from "@libs/constants";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "@libs/mongodb";

const options: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: constants.GITHUB_ID,
			clientSecret: constants.GITHUB_SECRET,
		}),
		DiscordProvider({
			clientId: constants.DISCORD_ID,
			clientSecret: constants.DISCORD_SECRET,
		}),
		EmailProvider({
			from: constants.EMAIL_FROM,
			server: constants.EMAIL_SERVER,
		}),
	],
	secret: constants.SECRET,
	jwt: {
		secret: constants.SECRET,
	},
	adapter: MongoDBAdapter(clientPromise),
};

export default (req: NextApiRequest, res: NextApiResponse) =>
	NextAuth(req, res, options);
