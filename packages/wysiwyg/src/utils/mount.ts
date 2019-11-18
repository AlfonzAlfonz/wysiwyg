import { GenericNode, TextNode, Value, WithChildren } from "..";

export const mountValue = (value: Value) => ({
  ...value,
  document: mountNodes(value.document, "0")
});

export const mountNodes = <T extends GenericNode>(node: T, key: string): T =>
  (node as WithChildren).nodes
    ? {
        ...node,
        key,
        nodes: (node as WithChildren).nodes.map((n, i) =>
          mountNodes(n, key + "-" + i.toString())
        )
      }
    : node.object === "text"
    ? (mountText({
        ...node,
        key
      } as TextNode) as T)
    : {
        ...node,
        key
      };

export const mountText = (node: TextNode) => ({
  ...node,
  text: node.text.map((t, i) => ({ ...t, key: i.toString() }))
});
