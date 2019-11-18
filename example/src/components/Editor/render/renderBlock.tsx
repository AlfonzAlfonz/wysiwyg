import * as React from "react";
import { typeSwitch, BlockNode, Void } from "wysiwyg";

const renderBlock = (node: BlockNode, next: () => React.FC): React.FC =>
  typeSwitch({
    paragraph: ({ children }) => <p>{children}</p>,
    image: () => (
      <Void>
        <img src={(node.data as any).src} alt="" />
      </Void>
    )
  })(node.type) || next();

export default renderBlock;
