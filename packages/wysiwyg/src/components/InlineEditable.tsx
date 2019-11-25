import * as React from "react";

import { InlineEditor } from "..";
import { inlineEditorContext } from "../useInlineEditor";
import { onKeyDown } from "./internal/onKeyDown";
import defaultRenderMark from "./internal/render/defaultRenderMark";
import Text from "./internal/Text";

interface Props {
  readonly?: boolean;
  renderMark?: (mark: string, next: () => React.FC) => React.FC;
}

const InlineEditable: React.FC<InlineEditor & Props> = props => {
  const { renderMark, readonly = false, ...editor } = props;
  return (
    <inlineEditorContext.Provider
      value={{
        ...editor,
        render: {
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
        <Text node={editor.value.content} />
      </div>
    </inlineEditorContext.Provider>
  );
};

export default InlineEditable;
