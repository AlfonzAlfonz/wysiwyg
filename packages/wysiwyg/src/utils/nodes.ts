import { GenericNode, WithChildren } from "..";

export const mapNodes = (
  node: GenericNode,
  predicate: (n: GenericNode) => GenericNode
): GenericNode =>
  (node as any).nodes
    ? ({
        ...predicate(node),
        nodes: (predicate(node) as WithChildren).nodes.map(n =>
          mapNodes(n, predicate)
        )
      } as any)
    : predicate(node);

export const filterNodes = (
  node: GenericNode,
  predicate: (n: GenericNode) => boolean
): GenericNode[] => {
  const children = (node as WithChildren).nodes
    ? (node as WithChildren).nodes.reduce(
        (acc, val) => [...acc, ...filterNodes(val, predicate)],
        [] as GenericNode[]
      )
    : [];
  return predicate(node) ? [node, ...children] : children;
};

export const getNodes = (nodes: GenericNode[]): Record<string, GenericNode> =>
  nodes.reduce(
    (acc, val) =>
      (val as WithChildren).nodes
        ? { ...acc, [val.key!]: val, ...getNodes((val as WithChildren).nodes) }
        : { ...acc, [val.key!]: val },
    {}
  );
