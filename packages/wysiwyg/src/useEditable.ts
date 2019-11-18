import {
  createRef,
  RefObject,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";

import { GenericNode, Selection, Value } from ".";
import commands, { EditorCommands } from "./commands";
import { mountValue } from "./utils/mount";
import { getNodes } from "./utils/nodes";

export interface EditorCore {
  value: Value;
  setValue: (v: Value) => unknown;
  nodes: Record<string, GenericNode>;
  textRefs: React.MutableRefObject<Record<string, RefObject<HTMLElement>>>;
  setTextRef: (key: string) => RefObject<HTMLElement>;
  selection?: Selection;
  setSelection: (s: Selection) => unknown;
}

export type Editor = EditorCore & EditorCommands;

export const useEditable = (
  initialValue: Value
): Editor & { editorProps: Editor } => {
  const [value, setValue] = useState(mountValue(initialValue));
  const [selection, setSelection] = useState<Selection>();

  const nodes = useMemo<Record<string, GenericNode>>(
    () => ({ 0: value.document, ...getNodes(value.document.nodes) }),
    [value]
  );

  const textRefs = useRef<Record<string, RefObject<HTMLElement>>>({});
  const setTextRef = (key: string) => {
    !textRefs.current[key] && (textRefs.current[key] = createRef());
    return textRefs.current[key];
  };

  useEffect(() => {
    if (selection) {
      const s = window.getSelection();
      const { anchor } = selection;
      s!.collapse(textRefs.current[anchor.key].current, anchor.offset);
    }
  }, [selection]);

  const core = {
    value,
    setValue,
    nodes,
    textRefs,
    setTextRef,
    selection,
    setSelection
  };

  const r = {
    ...core,
    ...commands(core)
  };
  return { ...r, editorProps: { ...r } };
};
