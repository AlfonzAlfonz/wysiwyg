import {
  BlockNode,
  GenericNode,
  TextNode,
  ValueDocument,
  WithChildren
} from ".";
import { EditorCore } from "./useEditable";
import { mountNodes } from "./utils/mount";
import { filterNodes, mapNodes } from "./utils/nodes";

export interface EditorCommands {
  getParentNode: (key: string) => WithChildren;
  getFirstTextNode: (node: GenericNode) => TextNode | undefined;
  insertBlock: (key: string, block: BlockNode, offset?: number) => unknown;
  setNodeText: (key: string, text: string) => unknown;
  setMarkText: (key: string, mark: string, text: string) => unknown;
  mapDocumentNodes: (predicate: (n: GenericNode) => GenericNode) => unknown;
}

const commands = ({
  value,
  nodes,
  setValue,
  setSelection
}: EditorCore): EditorCommands => {
  const getParentNode = (key: string) =>
    nodes[key.replace(/-\d*$/, "")] as WithChildren;

  const getFirstTextNode = (node: GenericNode) =>
    filterNodes(node, n => n.object === "text")[0] as TextNode;

  const setDocument = (document: ValueDocument) =>
    setValue({
      ...value,
      document
    });

  const mapDocumentNodes = (predicate: (n: GenericNode) => GenericNode) =>
    setDocument(mapNodes(value.document, predicate) as ValueDocument);

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
    setSelection({ anchor: { key: text.key!, offset: 0 } });
  };

  return {
    getParentNode,
    getFirstTextNode,
    mapDocumentNodes,
    setNodeText,
    setMarkText,
    insertBlock
  };
};

export default commands;
