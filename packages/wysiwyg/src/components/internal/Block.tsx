import * as React from "react";

import { BlockNode, TextNode } from "../..";
import useEditor from "../../useEditor";
import Text from "./Text";

interface Props {
  node: BlockNode;
}

const remove = <T extends {}, TProp extends keyof T>(
  obj: T,
  prop: TProp
): Omit<T, TProp> => {
  const copy = { ...obj };
  delete obj[prop];
  return copy;
};

const Block: React.FC<Props> = ({ node }) => {
  const { render } = useEditor();
  const C = React.useMemo(() => render.block(node), [node.type]);
  return (
    <C>
      {node.nodes.map(
        (n, i) =>
          ({
            block: <Block node={n as BlockNode} key={n.key} />,
            inline: "",
            text: <Text node={n as TextNode} key={n.key} />
          }[n.object])
      )}
    </C>
  );
};

export default Block;
