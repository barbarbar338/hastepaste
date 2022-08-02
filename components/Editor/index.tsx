import { FC } from "react";
import { EditorState } from "draft-js";
import dynamic from "next/dynamic";

interface EditorProps {
	[key: string]: unknown;
}

const DraftEditor = dynamic<EditorProps>(
	() => {
		return new Promise((resolve) => {
			import("react-draft-wysiwyg").then((mod) => resolve(mod.Editor));
		});
	},
	{ ssr: false },
);

export interface IEditorProps {
	editorState: EditorState;
	setEditorState: (editorState: EditorState) => void;
}

export const Editor: FC<IEditorProps> = ({ editorState, setEditorState }) => {
	return (
		<div className="pt-5">
			<DraftEditor
				editorState={editorState}
				editorClassName="border rounded"
				onEditorStateChange={setEditorState}
			/>
		</div>
	);
};
