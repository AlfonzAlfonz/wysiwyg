import { RefObject } from "react";

import { EditorCommands } from "./commands";
import { Point, SelectedNode } from "./utils/selection";

export { useEditable } from "./useEditable";
export { useInlineEditable } from "./useInlineEditable";

export { default as Editable } from "./components/Editable";
export { default as InlineEditable } from "./components/InlineEditable";
export { default as Void } from "./components/Void";

export { typeSwitch, MarkProps } from "./components/internal/render";

export type NodeKey = string;
export type MarkKey = string;

export interface Value {
  object: "value";
  document: ValueDocument;
}

export interface InlineValue {
  object: "inlinevalue";
  content: TextNode;
}

export interface BlockNode<
  TType extends string = string,
  TData extends {} = {}
> {
  object: "block";
  key?: NodeKey;
  type: TType;
  data: TData;
  nodes: Array<BlockNode | InlineNode | TextNode>;
}

export interface ValueDocument<TData extends {} = {}> {
  object: "document";
  key?: NodeKey;
  data: TData;
  nodes: BlockNode[];
}

export interface InlineNode<
  TType extends string = string,
  TData extends {} = {}
> {
  object: "inline";
  key?: NodeKey;
  type: TType;
  data: TData;
  nodes: Array<TextNode | InlineNode>;
}

export interface TextNode {
  object: "text";
  key?: NodeKey;
  text: MarkNode[];
}

export interface MarkNode {
  key?: MarkKey;
  string: string;
  marks: string[];
}

export type GenericNode = WithChildren | TextNode;

export type WithChildren = (
  | BlockNode<string>
  | ValueDocument
  | InlineNode<string>
) & {
  nodes: GenericNode[];
};

export type MarkRefs = React.MutableRefObject<
  Record<string, Record<string, RefObject<HTMLElement>>>
>;
export type Nodes = Record<string, GenericNode>;

export interface EditorCore<T extends Value | InlineValue> {
  value: T;
  setValue: (v: T) => unknown;
  nodes: Nodes;
  markRefs: MarkRefs;
  setMarkRef: (key: string, mark: string) => RefObject<HTMLElement>;
  selection?: Selection;
  getSelectedNodes: () => SelectedNode[];
  setSelection: (anchor: Point, focus?: Point) => unknown;
  inline: boolean;
}

export type Editor = EditorCore<Value> & EditorCommands;
export type InlineEditor = EditorCore<InlineValue> & EditorCommands;
