import { MarkNode, TextNode } from "..";
import { remountText } from "./mount";
import { SelectedNode } from "./selection";

export const insertMarkToTextNode = (
  node: TextNode,
  selectedNode: SelectedNode,
  marks: string[]
) => insertMark(node, selectedNode, marks);

const canSubtract = (
  node: TextNode,
  { start: [startKey, startOffset], end: [endKey, endOffset] }: SelectedNode,
  marks: string[]
): boolean =>
  node.text.reduce(
    ([inside, every], val) => {
      return every
        ? val.key === startKey && val.key === endKey
          ? [false, includesMarks(val, marks) && every]
          : val.key === startKey
          ? [
              true,
              startOffset === val.string.length
                ? every
                : includesMarks(val, marks) && every
            ]
          : val.key === endKey
          ? [true, endOffset === 0 ? every : includesMarks(val, marks) && every]
          : inside
          ? [true, includesMarks(val, marks) && every]
          : [false, every]
        : [inside, false];
    },
    [false, true]
  )[1];

const includesMarks = (mark: MarkNode, marks: string[]) =>
  marks.every(m => mark.marks.includes(m));

const insertMark = (
  node: TextNode,
  selectedNode: SelectedNode,
  marks: string[]
) => {
  const s = canSubtract(node, selectedNode, marks);
  console.log(s);
  return remountText({
    ...node,
    text: node.text
      .reduce(
        (acc, val) =>
          val.key === selectedNode.start[0] && val.key === selectedNode.end[0]
            ? ([
                false,
                [...acc[1], ...editMark(val, selectedNode, marks, s)]
              ] as [boolean, MarkNode[]])
            : val.key === selectedNode.start[0]
            ? ([
                true,
                [...acc[1], ...editMark(val, selectedNode, marks, s)]
              ] as [boolean, MarkNode[]])
            : val.key === selectedNode.end[0]
            ? ([
                false,
                [...acc[1], ...editMark(val, selectedNode, marks, s)]
              ] as [boolean, MarkNode[]])
            : acc[0]
            ? ([
                true,
                [...acc[1], ...editMark(val, selectedNode, marks, s)]
              ] as [boolean, MarkNode[]])
            : ([false, [...acc[1], val]] as [boolean, MarkNode[]]),
        [false, []] as [boolean, MarkNode[]]
      )[1]
      .reduce((acc, val) => {
        const prev = acc[acc.length - 1] as MarkNode | undefined;
        return prev
          ? val.string === ""
            ? acc
            : prev.marks.every((p, i) => p === val.marks[i]) &&
              val.marks.every((p, i) => p === prev.marks[i])
            ? [
                ...acc.slice(0, acc.length - 1),
                {
                  ...prev,
                  marks: [...new Set([...prev.marks, ...val.marks])],
                  string: prev.string + val.string
                }
              ]
            : [...acc, val]
          : [...acc, val];
      }, [] as MarkNode[])
  });
};

const editMark = (
  val: MarkNode,
  selectedNode: SelectedNode,
  marks: string[],
  subtract: boolean
) =>
  val.key === selectedNode.start[0] && val.key === selectedNode.end[0]
    ? [
        {
          ...val,
          string: val.string.slice(0, selectedNode.start[1])
        },
        {
          ...val,
          key: undefined,
          string: val.string.slice(selectedNode.start[1], selectedNode.end[1]),
          marks: mergeMarks(val, marks, subtract)
        },
        {
          ...val,
          key: undefined,
          string: val.string.slice(selectedNode.end[1])
        }
      ]
    : val.key === selectedNode.start[0]
    ? [
        {
          ...val,
          string: val.string.slice(0, selectedNode.start[1])
        },
        {
          ...val,
          key: undefined,
          string: val.string.slice(selectedNode.start[1]),
          marks: mergeMarks(val, marks, subtract)
        }
      ]
    : val.key === selectedNode.end[0]
    ? [
        {
          ...val,
          key: undefined,
          string: val.string.slice(0, selectedNode.end[1]),
          marks: mergeMarks(val, marks, subtract)
        },
        {
          ...val,
          string: val.string.slice(selectedNode.end[1])
        }
      ]
    : [{ ...val, marks: mergeMarks(val, marks, subtract) }];

const mergeMarks = (mark: MarkNode, marks: string[], subtract: boolean) =>
  !subtract
    ? [...new Set([...mark.marks, ...marks])]
    : mark.marks.filter(m => !marks.includes(m));
