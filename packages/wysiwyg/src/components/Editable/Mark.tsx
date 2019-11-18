import * as React from "react";

import { MarkNode, TextNode } from "../../";
import useEditor from "../../useEditor";

interface Props {
  node: TextNode;
  mark: MarkNode;
}

const Mark: React.FC<Props> = ({ mark, node }) => {
  const { render } = useEditor();
  const C = React.useMemo(() => {
    if (mark.marks.length === 0) {
      return render.mark(undefined!);
    }
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
        <span data-key={node.key!} data-mark={mark.key!}>
          {children}
        </span>
      )) as React.FC
    );
  }, [mark.marks]);

  return <C>{mark.string}</C>;
};

export default Mark;
