import * as React from "react";

import { TextNode } from "../..";
import useEditor from "../../useEditor";
import Mark from "./Mark";

interface Props {
  node: TextNode;
}

const Text: React.FC<Props> = ({ node }) => {
  const { setTextRef } = useEditor();
  const [text] = React.useState(node.text);
  return (
    <span data-key={node.key} ref={setTextRef(node.key!)}>
      {text.map(m => (
        <Mark key={m.key} mark={m} node={node} />
      ))}
    </span>
  );
};

export default Text;
