import * as React from "react";
import { Editable, useEditable, Value } from "wysiwyg";

import { PageStyle } from "../styles";
import renderBlock from "./render/renderBlock";
import renderMark from "./render/renderMark";

const Editor: React.FC = () => {
  const { value, editorProps } = useEditable(basicValue);

  return (
    <PageStyle>
      <div>
        <div className="toolbar">
          <span>
            <b>B</b>
          </span>{" "}
          <span>
            <i>I</i>
          </span>
        </div>
        <Editable
          {...editorProps}
          renderBlock={renderBlock}
          renderMark={renderMark}
        />
      </div>
      <pre>{JSON.stringify(value, null, "  ")}</pre>
    </PageStyle>
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
              { string: "lorem ipsum dolor sit amet", marks: [] },
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
          src: "http://placekitten.com/200/300"
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
