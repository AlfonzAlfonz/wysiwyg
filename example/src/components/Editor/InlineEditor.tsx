import * as React from "react";
import { InlineEditable, InlineValue, useInlineEditable } from "wysiwyg";

import { EditorStyle } from "../styles";
import renderMark from "./render/renderMark";

const InlineEditor: React.FC = () => {
  const { value, editorProps, insertMarkToSelection } = useInlineEditable(
    basicValue
  );

  return (
    <EditorStyle>
      <div>
        <div className="toolbar">
          <span>
            <b
              onClick={e => {
                e.preventDefault();
                insertMarkToSelection(["bold"]);
              }}
            >
              B
            </b>
          </span>{" "}
          <span>
            <i
              onClick={e => {
                e.preventDefault();
                insertMarkToSelection(["italic"]);
              }}
            >
              I
            </i>
          </span>
        </div>
        <InlineEditable {...editorProps} renderMark={renderMark} />
      </div>
      <pre>{JSON.stringify(value, null, "  ")}</pre>
    </EditorStyle>
  );
};

export const basicValue: InlineValue = {
  object: "inlinevalue",
  content: {
    object: "text",
    text: [
      { string: "lorem ipsum dolor sit amet ", marks: [] },
      { string: "bold", marks: ["bold"] }
    ]
  }
};

export default InlineEditor;
