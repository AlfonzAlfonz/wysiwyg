import * as React from "react";
import { Editable, useEditable, Value } from "wysiwyg";

import { PageStyle, EditorStyle } from "../styles";
import renderBlock from "./render/renderBlock";
import renderMark from "./render/renderMark";

const Editor: React.FC = () => {
  const { value, editorProps, insertMarkToSelection } = useEditable(basicValue);

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
        <Editable
          {...editorProps}
          renderBlock={renderBlock}
          renderMark={renderMark}
        />
      </div>
      <pre>{JSON.stringify(value, null, "  ")}</pre>
    </EditorStyle>
  );
};

export const basicValue: Value = {
  object: "value",
  document: {
    object: "document",
    data: {},
    nodes: [
      {
        object: "block",
        type: "paragraph",
        data: {},
        nodes: [
          {
            object: "text",
            text: [
              { string: "lorem ipsum dolor sit amet ", marks: [] },
              { string: "bold", marks: ["bold"] }
            ]
          }
        ]
      },
      {
        object: "block",
        type: "paragraph",
        data: {},
        nodes: [
          {
            object: "text",
            text: [{ string: "lorem ipsum dolor sit amet", marks: [] }]
          }
        ]
      },
      {
        object: "block",
        type: "image",
        data: {
          src: "http://placekitten.com/420/690"
        },
        nodes: []
      },

      {
        object: "block",
        type: "paragraph",
        data: {},
        nodes: [
          {
            object: "text",
            text: [{ string: "lorem ipsum dolor sit amet", marks: [] }]
          }
        ]
      }
    ]
  }
};

export default Editor;
