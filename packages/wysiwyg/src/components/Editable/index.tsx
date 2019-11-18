import * as React from "react";

import { BlockNode } from "../../";
import { Editor, editorContext } from "../../useEditor";
import Block from "./Block";
import { onKeyDown } from "./onKeyDown";
import defaultRenderBlock from "./render/defaultRenderBlock";
import defaultRenderMark from "./render/defaultRenderMark";

interface Props {
  readonly?: boolean;
  renderBlock?: (node: BlockNode, next: () => React.FC) => React.FC;
  renderMark?: (mark: string, next: () => React.FC) => React.FC;
}

const Editable: React.FC<Omit<Editor, "render"> & Props> = props => {
  const { renderBlock, renderMark, readonly = false, ...editor } = props;
  return (
    <editorContext.Provider
      value={{
        ...editor,
        render: {
          block: (node: BlockNode) =>
            renderBlock
              ? renderBlock(node, defaultRenderBlock)
              : defaultRenderBlock(),
          mark: (mark: string) =>
            renderMark
              ? renderMark(mark, defaultRenderMark)
              : defaultRenderMark()
        }
      }}
    >
      <div
        contentEditable={!readonly}
        onKeyDown={onKeyDown(props)}
        suppressContentEditableWarning={true}
      >
        {editor.value.document.nodes.map(n => (
          <Block node={n} key={n.key} />
        ))}
      </div>
    </editorContext.Provider>
  );
};

export default Editable;
