import DashboardStats from "@components/DashboardStats";
import { LocaleParser } from "@libs/localeParser";
import Layout from "@components/Layout";
import { useRouter } from "next/router";
import DashboardItem from "@components/DashboardItem";
import styles from "@styles/modules/dashboard.module.scss";
import { NextPage } from "next";
import { getSession } from "next-auth/react";
import { supabase } from "@libs/initSupabase";
import { motion, Variants } from "framer-motion";

const container: Variants = {
	hidden: {
		opacity: 1,
		scale: 0,
	},
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.2,
		},
	},
};

const item: Variants = {
	hidden: {
		x: 20,
		opacity: 0,
	},
	visible: {
		x: 0,
		opacity: 1,
	},
};

export interface IDashboardPage {
	pastes: {
		fork?: string;
		title: string;
		description?: string;
		reported?: boolean;
		id: string;
	}[];
}

const DashboardPage: NextPage<IDashboardPage> = ({ pastes }) => {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	return (
		<Layout title={parser.get("dashboard") as string}>
			<motion.div variants={container} initial="hidden" animate="visible">
				<motion.h3 className={styles.header} variants={item}>
					{parser.get("dashboard")}
				</motion.h3>
				<DashboardStats
					total={pastes.length}
					fork={pastes.filter((paste) => paste.fork).length}
					paste={pastes.filter((paste) => !paste.fork).length}
				/>
				<motion.div className={styles.wrapper} variants={container}>
					<div className={styles.content}>
						<div className={styles.tableWrapper}>
							<table className={styles.table}>
								<thead>
									<tr>
										<th className={styles.thEmpty}></th>
										<th className={styles.th}>{parser.get("title")}</th>
										<th className={styles.th}>{parser.get("description")}</th>
										<th className={styles.th}>{parser.get("status")}</th>
										<th className={styles.thEmpty}></th>
									</tr>
								</thead>
								<tbody>
									{pastes.map((paste, idx) => (
										<DashboardItem key={idx} {...paste} />
									))}
								</tbody>
							</table>
						</div>
					</div>
				</motion.div>
			</motion.div>
		</Layout>
	);
};

DashboardPage.getInitialProps = async (ctx) => {
	const session = await getSession(ctx);
	if (!session) {
		ctx.res.writeHead(302, {
			Location: "/api/auth/signin",
		});
		ctx.res.end();
	}
	const { data } = await supabase
		.from("Pastes")
		.select("*")
		.eq("owner", session.user.email);

	return {
		pastes: data,
	};
};

export default DashboardPage;
