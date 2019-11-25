import * as React from "react";

import { BlockNode, Editor } from ".";

interface Render {
  block: (node: BlockNode) => React.FC;
  mark: (type: string) => React.FC;
}

export const editorContext = React.createContext<Editor & { render: Render }>(
  null!
);

const useEditor = () => {
  const editor = React.useContext(editorContext);
  return editor;
};

export default useEditor;
