import * as React from "react";
import { MarkProps, typeSwitch } from "wysiwyg";

const renderMark = (mark: string, next: () => React.FC) =>
  typeSwitch({
    bold: ({ children }) => <strong>{children}</strong>,
    italic: ({ children }) => <em>{children}</em>
  })(mark) || next();

export default renderMark;
