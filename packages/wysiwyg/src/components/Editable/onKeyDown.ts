import { Editor } from "../../useEditor";

const ENTER = 13;

export const onKeyDown = (editor: Omit<Editor, "render">) => (
  e: React.KeyboardEvent<HTMLElement>
) => {
  const { setMarkText, nodes } = editor;
  console.log(e.keyCode);

  const s = window.getSelection()!;
  const el = s.anchorNode!.parentElement!;
  const key = el.attributes.getNamedItem("data-key")!.value;
  if (e.keyCode === ENTER) {
    onEnter(editor)(e, key);
  } else {
    setTimeout(() => {
      setMarkText(
        key,
        el.attributes.getNamedItem("data-mark")!.value,
        el.textContent!
      );
    });
  }
};

export const onEnter = ({ getParentNode, insertBlock }: Omit<Editor, "render">) => (
  e: React.KeyboardEvent<HTMLElement>,
  key: string
) => {
  e.preventDefault();
  const block = getParentNode(key);
  const parent = getParentNode(block.key!);
  insertBlock(
    parent.key!,
    {
      object: "block",
      type: "paragraph",
      data: {},
      nodes: [
        {
          object: "text",
          text: [{ string: "", marks: [] }]
        }
      ]
    },
    parent.nodes.indexOf(block) + 1
  );
};
