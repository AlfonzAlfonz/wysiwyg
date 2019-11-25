import * as React from "react";

import { TextNode } from "../..";
import Mark from "./Mark";

interface Props {
  node: TextNode;
}

const Text: React.FC<Props> = ({ node }) => {
  return (
    <span data-key={node.key}>
      {node.text.map(m => (
        <Mark key={m.key} mark={m} node={node} />
      ))}
    </span>
  );
};

export default Text;
