import * as React from "react";

import { InlineEditor } from ".";

interface Render {
  mark: (type: string) => React.FC;
}

export const inlineEditorContext = React.createContext<
  InlineEditor & { render: Render }
>(null!);

const useInlineEditor = () => {
  const editor = React.useContext(inlineEditorContext);
  return editor;
};

export default useInlineEditor;
