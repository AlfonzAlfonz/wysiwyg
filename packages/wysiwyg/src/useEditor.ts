import * as React from "react";

import { BlockNode, GenericNode, Selection, Value, WithChildren } from ".";

export interface Editor {
  value: Value;
  nodes: Record<string, GenericNode>;
  setTextRef: (key: string) => React.RefObject<HTMLElement>;
  getParentNode: (key: string) => WithChildren;
  insertBlock: (key: string, block: BlockNode, offset?: number) => unknown;
  setNodeText: (key: string, text: string) => unknown;
  setMarkText: (key: string, mark: string, text: string) => unknown;
  setValue: (v: Value) => unknown;
  setSelection: (selection: Selection) => unknown;

  render: {
    block: (node: BlockNode) => React.FC;
    mark: (type: string) => React.FC;
  };
}

export const editorContext = React.createContext<Editor>(null!);

const useEditor = () => {
  const editor = React.useContext(editorContext);
  return editor;
};

export default useEditor;
