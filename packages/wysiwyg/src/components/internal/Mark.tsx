import * as React from "react";

import { MarkNode, TextNode } from "../..";
import useEditor from "../../useEditor";
import useInlineEditor from "../../useInlineEditor";

interface Props {
  node: TextNode;
  mark: MarkNode;
}

const Mark: React.FC<Props> = ({ mark, node }) => {
  const editor = useEditor();
  const inline = useInlineEditor();
  const { render, setMarkRef, markRefs } = { ...editor, ...inline };
  const [text, setText] = React.useState(() => mark.string);

  const C = React.useMemo(() => {
    return mark.marks.reduce(
      (Acc, val) => {
        const CC = render.mark(val);
        const component: React.FC = ({ children }) => (
          <CC>
            <Acc>{children}</Acc>
          </CC>
        );
        return component;
      },
      (({ children }) => (
        <span
          data-key={node.key!}
          data-mark={mark.key!}
          ref={setMarkRef(node.key!, mark.key!)}
        >
          {children}
        </span>
      )) as React.FC
    );
  }, [mark.marks]);

  React.useEffect(() => {
    if (
      mark.string !==
      markRefs.current[node.key!][mark.key!].current!.textContent
    ) {
      setText(mark.string);
    }
  });

  return <C>{text}</C>;
};

export default Mark;
