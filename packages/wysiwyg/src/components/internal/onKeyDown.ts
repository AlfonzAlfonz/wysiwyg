import { Editor, InlineEditor, InlineValue } from "../..";
import { mapNodes } from "../../utils/nodes";

const ENTER = 13;

export const onKeyDown = (editor: Editor | InlineEditor) => (
  e: React.KeyboardEvent<HTMLElement>
) => {
  const { setMarkText, value } = editor;

  const s = window.getSelection()!;
  const el = s.anchorNode!.parentElement!;
  const key = el.attributes.getNamedItem("data-key")!.value;

  if (e.keyCode === ENTER) {
    onEnter(editor)(e, key);
  } else {
    if (s.isCollapsed) {
      setTimeout(() => {
        setMarkText(
          key,
          el.attributes.getNamedItem("data-mark")!.value,
          el.textContent!
        );
      });
    } else {
      e.preventDefault();
    }
  }
};

export const onEnter = ({
  getParentNode,
  insertBlock,
  inline
}: Editor | InlineEditor) => (
  e: React.KeyboardEvent<HTMLElement>,
  key: string
) => {
  e.preventDefault();
  if (!inline) {
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
  }
};
