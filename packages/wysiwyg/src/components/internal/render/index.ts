import * as React from "react";

export interface MarkProps {
  props: { "data-key": string; "data-mark": string };
}

export const typeSwitch = <T>(nodes: Record<string, React.FC<T>>) => (
  type: string
): React.FC<T> | undefined => nodes[type];
