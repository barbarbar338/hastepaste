import DashboardStats from "@components/DashboardStats";
import { LocaleParser } from "@libs/localeParser";
import Layout from "@components/Layout";
import { useRouter } from "next/router";
import DashboardItem from "@components/DashboardItem";
import styles from "@styles/modules/dashboard.module.scss";
import { NextPage } from "next";
import { getSession } from "next-auth/client";
import { supabase } from "@libs/initSupabase";

export interface IDashboardPage {
	pastes: {
		fork?: string,
		title: string,
		description?: string,
		reported?: boolean,
		id: string
	}[];
}

const DashboardPage: NextPage<IDashboardPage> = ({ pastes }) => {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);

	return (
		<Layout title={parser.get("dashboard") as string}>
			<h3 className={styles.header}>{parser.get("dashboard")}</h3>
			<DashboardStats
				total={pastes.length} 
				fork={pastes.filter(paste => paste.fork).length}
				paste={pastes.filter(paste => !paste.fork).length}
			/>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<div className={styles.tableWrapper}>
						<table className={styles.table}>
							<thead>
								<tr>
									<th className={styles.thEmpty}></th>
									<th className={styles.th}>
										{parser.get("title")}
									</th>
									<th className={styles.th}>
										{parser.get("description")}
									</th>
									<th className={styles.th}>
										{parser.get("status")}
									</th>
									<th className={styles.thEmpty}></th>
								</tr>
							</thead>
							<tbody>
								{
									pastes.map((paste, idx) => 
										<DashboardItem key={idx} {...paste}/>
									)
								}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</Layout>
	);
}

DashboardPage.getInitialProps = async (ctx) => {
	const session = await getSession(ctx)
	if (!session) {
		ctx.res.writeHead(302, {
			Location: "/api/auth/signin"
		})
		ctx.res.end();
	}
	const { data } = await supabase
		.from("Pastes")
		.select("*")
		.eq("owner", session.user.email)

	return {
		pastes: data
	}
}

export default DashboardPage;
