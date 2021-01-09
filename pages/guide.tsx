import { LocaleParser } from "@libs/localeParser";
import Layout from "@components/Layout";
import { useRouter } from "next/dist/client/router";
import styles from "@styles/modules/guide.module.scss";

export default function GuidePage(): JSX.Element {
	const router = useRouter();
	const parser = new LocaleParser(router.locale);
	return (
		<Layout title={parser.get("guide_short") as string}>
			<h1 className={styles.title}>{parser.get("guide_long")}</h1>
			<p className={styles.desc}>
				{parser.get("guide_desc", {
					edit: new Date("07-12-2020 15:30:00").toLocaleString(),
				})}
			</p>
			<div className={styles.wrapper}>
				<ul>
					<li>
						<h3>Legal disclaimer</h3>
						<p>
							Our only goal is for people to share their content with their friends
							safely and quickly. To keep our website safe for everyone, we regularly
							check the shared content and make necessary adjustments.
						</p>
						<p>
							Although we try to monitor shared content, we are not responsible for any
							content that is shared. What we want our users to do when they encounter
							such content is to report the content using the button on the page. When
							something like this happens, your content can be removed forever and your
							account can be disabled forever.
						</p>
					</li>
					<li>
						<h3>What you can do with a paste</h3>
						<ul className={styles.discList}>
							<li>You can share a code.</li>
							<li>You can share a note.</li>
							<li>You can list things you shouldn't forget.</li>
							<li>You can create a shopping list.</li>
							<li>You can share a quote.</li>
							<li>And you can share almost anything you can think of.</li>
						</ul>
					</li>
					<li>
						<h3>What you can't do with a paste</h3>
						<p>
							If we encounter content shared for the purposes stated below, the content
							will be removed from our system forever and the owner of the content will
							be banned forever.
						</p>
						<ul className={styles.discList}>
							<li>
								<strong>Don't post content that contains illegal activity.</strong> Your
								content should not directly or indirectly promote any illegal activity.
								Don't help users create and spread malicious activities.
							</li>
							<li>
								<strong>Don't post inappropriate content.</strong> Don't post content
								that promotes a point of view or activity that we do not tolerate,
								including but not limited to racism, harassment, pornography, suicide,
								self-harm, swearing, or hatred of certain communities.
							</li>
							<li>
								<strong>Don't ask for money.</strong> Our site and the content shared on
								our site are completely free and will always remain free.
							</li>
							<li>
								<strong>Don't spam Paste.</strong> Don't spam pastes whose content
								consists of random words or letters.
							</li>
							<li>
								<strong>Don't share personal information.</strong> Don't share your
								personal information, such as your name, address, telephone number or
								credit card information, or someone else's information. Don't share
								other people's secrets. Don't use our services to embarrass or humiliate
								another person.
							</li>
							<li>
								<strong>Don't spam Paste.</strong> Don't spam pastes whose content
								consists of random words or letters.
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</Layout>
	);
}
