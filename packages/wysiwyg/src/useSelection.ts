import { useEffect, useState } from "react";

import { MarkRefs, Nodes } from ".";
import {
  getSelectedNodes,
  Point,
  SelectedNode,
  Selection
} from "./utils/selection";

const useSelection = (
  markRefs: MarkRefs,
  nodes: Nodes
): [() => SelectedNode[], (a: Point, f?: Point) => unknown] => {
  const [selection, setSelection1] = useState<Selection>();
  const setSelection = (anchor: Point, focus?: Point) =>
    setSelection1({ anchor, focus });
  useEffect(() => {
    if (selection) {
      const s = window.getSelection();
      const {
        anchor: [key, mark, offset]
      } = selection;
      s!.collapse(markRefs.current[key][mark].current, offset);
    }
  }, [selection]);

  return [getSelectedNodes(markRefs, nodes), setSelection];
};

export default useSelection;
