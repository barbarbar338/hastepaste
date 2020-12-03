import FileHeader from "../components/FileHeader/index";
import SyntaxHighlighter from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { NextSeo } from "next-seo";

export default function FilePage() {
	return (
		<>
			<NextSeo title="Explore Paste" />
			<div>
				<FileHeader
					name="example file"
					description="Lorem ipsum dolor sit amet bla bla bla."
				/>
				<div className="container max-w-screen-xl px-2 mx-auto lg:px-0">
					<div className="px-5 py-5 -mt-5 text-sm text-black bg-white rounded-lg shadow ">
						<SyntaxHighlighter
							style={tomorrowNight}
							showLineNumbers={true}
							wrapLongLines={true}
						>{`
function createStyleObject(classNames, style) {
	return classNames.reduce((styleObject, className) => {
		return {...styleObject, ...style[className]};
	}, {});
}

function createClassNameString(classNames) {
	return classNames.join(' ');
}

// this comment is here to demonstrate an extraskjdhaksjhdkjashdkjahskdahskdjhasdkjashdkasjdhkasjdhkasjdhkasjhdkajshdkajshdkasjhdkajshdkajshdkasjhdkajshdkajsdhkajshdkajshdaskjdhaksd

function createChildren(style, useInlineStyles) {
	let childrenCount = 0;
	return children => {
		childrenCount += 1;
		return children.map((child, i) => createElement({
			node: child,
			style,
			useInlineStyles,
			key: '31'
		}));
	}
}

function createElement({ node, style, useInlineStyles, key }) {
	const { properties, type, tagName, value } = node;
	if (type === "text") {
		return value;
	} else if (tagName) {
		const TagName = tagName;
		const childrenCreator = createChildren(style, useInlineStyles);
		const props = (
			useInlineStyles
			? { style: createStyleObject(properties.className, style) }
			: { className: createClassNameString(properties.className) }
		);
		const children = childrenCreator(node.children);
		return <TagName key={key} {...props}>{children}</TagName>;
	}
}
						`}</SyntaxHighlighter>
					</div>
				</div>
			</div>
		</>
	);
}
