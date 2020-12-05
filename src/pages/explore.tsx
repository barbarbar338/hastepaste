import FileHeader from "@components/FileHeader/index";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { NextSeo } from "next-seo";
import { NextPage, NextPageContext } from "next";
import CONFIG from "src/config";

export interface IFilePage {
	error?: boolean;
	pasteData?: {
		paste: string;
		owner?: string;
		title: string;
		createdAt: number;
		fork_id?: string;
		is_reported?: boolean;
		description?: string;
	};
}

const FilePage: NextPage<IFilePage> = ({ error, pasteData }) => {
	return (
		<>
			<NextSeo title="Explore Paste" />
			<div>
				<FileHeader
					name={error ? "Paste not found..." : pasteData.title}
					description={
						error
							? "We searched quite a lot for the paste you were looking for but couldn't find it"
							: pasteData.description || "My awesome file!"
					}
					canFork={pasteData && pasteData.is_reported ? false : !error}
				/>
				<div className="container max-w-screen-xl px-2 mx-auto lg:px-0">
					<div className="px-5 py-5 -mt-5 text-sm text-black bg-white rounded-lg shadow ">
						<SyntaxHighlighter
							style={tomorrowNight}
							showLineNumbers={true}
							wrapLongLines={true}
						>
							{pasteData && pasteData.is_reported
								? "This paste is reported and unavailable for now"
								: error
								? "There must have been some very cool and meaningful things written here... Anyways, why don't try something else?"
								: pasteData.paste}
						</SyntaxHighlighter>
					</div>
				</div>
			</div>
		</>
	);
};

FilePage.getInitialProps = async ({
	query: { id },
}: NextPageContext): Promise<IFilePage> => {
	if (!id) return { error: true };
	const res = await fetch(
		`${CONFIG.API_URL}/paste?id=${encodeURIComponent(
			typeof id === "string" ? id : id[0],
		)}`,
	);
	if (!res.ok) return { error: true };
	const { data } = await res.json();
	return { pasteData: data };
};

export default FilePage;
