import * as React from "react";

const defaultRenderMark = (): React.FC => ({ children }) => (
  <span>{children}</span>
);

export default defaultRenderMark;
