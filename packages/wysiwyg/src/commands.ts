import {
  BlockNode,
  EditorCore,
  GenericNode,
  InlineValue,
  TextNode,
  Value,
  ValueDocument,
  WithChildren
} from ".";
import { mountNodes } from "./utils/mount";
import { filterNodes, mapNodes } from "./utils/nodes";
import { insertMarkToTextNode } from "./utils/text";

export interface EditorCommands {
  getParentNode: (key: string) => WithChildren;
  getFirstTextNode: (node: GenericNode) => TextNode | undefined;
  insertBlock: (key: string, block: BlockNode, offset?: number) => unknown;
  setNodeText: (key: string, text: string) => unknown;
  setMarkText: (key: string, mark: string, text: string) => unknown;
  mapDocumentNodes: (predicate: (n: GenericNode) => GenericNode) => unknown;
  insertMarkToSelection: (marks: string[]) => unknown;
}

const commands = <T extends Value | InlineValue>({
  value,
  nodes,
  setValue,
  setSelection,
  getSelectedNodes
}: EditorCore<T>): EditorCommands => {
  const getParentNode = (key: string) =>
    nodes[key.replace(/-\d*$/, "")] as WithChildren;

  const getFirstTextNode = (node: GenericNode) =>
    filterNodes(node, n => n.object === "text")[0] as TextNode;

  const setDocument = (document: ValueDocument | TextNode) =>
    value.object === "value"
      ? setValue({
          ...value,
          document
        })
      : setValue({
          ...value,
          content: document
        });

  const mapDocumentNodes = (predicate: (n: GenericNode) => GenericNode) =>
    setDocument(
      mapNodes(
        value.object === "value"
          ? (value as Value).document
          : (value as InlineValue).content,
        predicate
      ) as ValueDocument
    );

  const setNodeText = (key: string, text: string) =>
    mapDocumentNodes(n =>
      n.object === "text" && n.key === key
        ? {
            ...n,
            text: [{ string: text, marks: [] }]
          }
        : n
    );

  const setMarkText = (key: string, mark: string, text: string) =>
    mapDocumentNodes(n =>
      n.object === "text" && n.key === key
        ? {
            ...n,
            text: n.text.map(m => (m.key === mark ? { ...m, string: text } : m))
          }
        : n
    );

  const insertBlock = (
    parentKey: string,
    block: BlockNode,
    offset?: number
  ) => {
    const parent = nodes[parentKey] as WithChildren;
    const key =
      parentKey +
      "-" +
      (parent.nodes
        .map(x => parseInt(x.key!.split("-").pop()!, 10))
        .sort((ka, kb) => kb - ka)[0] +
        1);
    const b = {
      ...block,
      key,
      nodes: block.nodes.map((n, i) => mountNodes(n, key + "-" + i.toString()))
    };
    const text = getFirstTextNode(b);
    mapDocumentNodes(n =>
      (n.object === "block" || n.object === "document") && n.key === parentKey
        ? {
            ...n,
            nodes: !offset
              ? [...n.nodes, b as any]
              : [
                  ...n.nodes.slice(0, offset),
                  b as any,
                  ...n.nodes.slice(offset)
                ]
          }
        : n
    );
    setSelection([text.key!, "0", 0]);
  };

  const insertMarkToSelection = (marks: string[]) => {
    const s = getSelectedNodes();
    mapDocumentNodes(n => {
      const selected = s.find(ss => ss.key === n.key);

      return selected
        ? insertMarkToTextNode(n as TextNode, selected, marks)
        : n;
    });
  };

  return {
    getParentNode,
    getFirstTextNode,
    mapDocumentNodes,
    setNodeText,
    setMarkText,
    insertBlock,
    insertMarkToSelection
  };
};

export default commands;
