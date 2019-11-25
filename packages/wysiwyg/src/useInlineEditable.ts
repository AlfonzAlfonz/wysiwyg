import { useMemo, useState } from "react";

import { EditorCore, GenericNode, InlineEditor, InlineValue } from ".";
import commands from "./commands";
import useMarkRefs from "./useMarkRefs";
import useSelection from "./useSelection";
import { mountInlineValue } from "./utils/mount";

export const useInlineEditable = (
  initialValue: InlineValue
): InlineEditor & { editorProps: InlineEditor } => {
  const [value, setValue] = useState(mountInlineValue(initialValue));

  const nodes = useMemo<Record<string, GenericNode>>(
    () => ({ 0: value.content }),
    [value]
  );

  const { markRefs, setMarkRef } = useMarkRefs();

  const [getSelectedNodes, setSelection] = useSelection(markRefs, nodes);

  const core: EditorCore<InlineValue> = {
    value,
    setValue,
    nodes,
    markRefs,
    setMarkRef,
    getSelectedNodes,
    setSelection,
    inline: true
  };

  const r = {
    ...core,
    ...commands(core)
  };
  return { ...r, editorProps: { ...r } };
};
