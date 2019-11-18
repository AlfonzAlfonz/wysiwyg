export { useEditable } from "./useEditable";

export { default as Editable } from "./components/Editable";
export { default as Void } from "./components/Editable/Void";

export { typeSwitch, MarkProps } from "./components/Editable/render";

export interface Value {
  object: "value";
  document: ValueDocument;
}

export interface BlockNode<
  TType extends string = string,
  TData extends {} = {}
> {
  object: "block";
  key?: string;
  type: TType;
  data: TData;
  nodes: Array<BlockNode | InlineNode | TextNode>;
}

export interface ValueDocument<TData extends {} = {}> {
  object: "document";
  key?: string;
  data: TData;
  nodes: BlockNode[];
}

export interface InlineNode<
  TType extends string = string,
  TData extends {} = {}
> {
  object: "inline";
  key?: string;
  type: TType;
  data: TData;
  nodes: Array<TextNode | InlineNode>;
}

export interface TextNode {
  object: "text";
  key?: string;
  text: MarkNode[];
  marks?: {};
}

export interface MarkNode {
  key?: string;
  string: string;
  marks: string[];
}

interface Point {
  key: string;
  offset: number;
}

export interface Selection {
  anchor: Point;
  focus?: Point;
}

export type GenericNode = WithChildren | TextNode;

export type WithChildren = (
  | BlockNode<string>
  | ValueDocument
  | InlineNode<string>
) & {
  nodes: GenericNode[];
};
