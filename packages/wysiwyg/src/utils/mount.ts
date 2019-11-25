import {
  GenericNode,
  InlineValue,
  MarkNode,
  TextNode,
  Value,
  WithChildren
} from "..";

export const mountValue = (value: Value): Value => ({
  ...value,
  document: mountNodes(value.document, "0")
});

export const mountInlineValue = (value: InlineValue): InlineValue => ({
  ...value,
  content: { ...mountText(value.content), key: "0" }
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

export const mountText = (node: TextNode): TextNode => ({
  ...node,
  text: node.text.map((t, i) => ({ ...t, key: t.key ? t.key : i.toString() }))
});

export const remountText = (node: TextNode) => {
  const last = parseInt(
    node.text
      .map(n => n.key)
      .sort((a, b) => (a ? (b ? b.localeCompare(a) : 1) : -1))[0] || "0",
    10
  );
  return {
    ...node,
    text: node.text.reduce(
      (acc, val) =>
        val.key
          ? ([acc[0], [...acc[1], val]] as any)
          : [
              acc[0] + 1,
              [
                ...acc[1],
                {
                  ...val,
                  key: (last + acc[0]).toString()
                }
              ]
            ],
      [1, []] as [number, MarkNode[]]
    )[1]
  };
};
