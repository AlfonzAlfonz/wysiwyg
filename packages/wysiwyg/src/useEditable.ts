import { RefObject, useMemo, useState } from "react";

import { Editor, EditorCore, GenericNode, Value } from ".";
import commands from "./commands";
import useMarkRefs from "./useMarkRefs";
import useSelection from "./useSelection";
import { mountValue } from "./utils/mount";
import { getNodes } from "./utils/nodes";

export const useEditable = (
  initialValue: Value
): Editor & { editorProps: Editor } => {
  const [value, setValue] = useState(mountValue(initialValue));

  const nodes = useMemo<Record<string, GenericNode>>(
    () => ({ 0: value.document, ...getNodes(value.document.nodes) }),
    [value]
  );

  const { markRefs, setMarkRef } = useMarkRefs();

  const [getSelectedNodes, setSelection] = useSelection(markRefs, nodes);

  const core: EditorCore<Value> = {
    value,
    setValue,
    nodes,
    markRefs,
    setMarkRef,
    getSelectedNodes,
    setSelection,
    inline: false
  };

  const r = {
    ...core,
    ...commands(core)
  };
  return { ...r, editorProps: { ...r } };
};
