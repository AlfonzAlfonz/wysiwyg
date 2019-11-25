import { MarkRefs, Nodes, TextNode } from "..";

export type Point = [string, string, number];

export interface Selection {
  anchor: Point;
  focus?: Point;
}

export interface SelectedNode {
  key: string;
  start: [string, number];
  end: [string, number];
}

export const getSelectedNodes = (
  { current }: MarkRefs,
  nodes: Nodes
) => (): SelectedNode[] => {
  const s = window.getSelection()!;
  const r = s.getRangeAt(0);

  const [startKey, startMark, startOffset] = getPoint(
    r.startContainer,
    r.startOffset
  );
  const [endKey, endMark, endOffset] = getPoint(r.endContainer, r.endOffset);

  return Object.keys(current)
    .map(k => {
      const markKeys = Object.keys(current[k]).filter(kk =>
        r.intersectsNode(current[k][kk].current!)
      );
      const marks = (nodes[k] as TextNode).text
        .filter(m => markKeys.includes(m.key!))
        .map(m => m.key!);
      return marks.length
        ? {
            key: k,
            start: [
              marks[0],
              startKey === k && startMark === marks[0] ? startOffset : 0
            ],
            end: [
              marks[marks.length - 1],
              endKey === k && endMark === marks[marks.length - 1]
                ? endOffset
                : current[k][marks[marks.length - 1]].current!.textContent!
                    .length
            ]
          }
        : undefined;
    })
    .filter(x => x) as SelectedNode[];
};

const getPoint = (node: Node, offset: number) =>
  [
    node.parentElement!.getAttribute("data-key")!,
    node.parentElement!.getAttribute("data-mark")!,
    offset
  ] as Point;

export const getMarkOffset = (node: TextNode, mark: string) =>
  node.text.reduce(
    ({ found, offset }, val) =>
      val.key === mark || found
        ? { found: true, offset }
        : { found: false, offset: offset + val.string.length },
    { found: false, offset: 0 }
  ).offset;

export const getMarkByOffset = (node: TextNode, o: number) => {
  const after = node.text.filter(m => getMarkOffset(node, m.key!) <= o);
  return after[after.length - 1];
};
