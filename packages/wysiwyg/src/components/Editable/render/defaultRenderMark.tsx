import * as React from "react";
import { MarkProps } from "../render";

const defaultRenderMark = (): React.FC => ({ children }) => (
  <span>{children}</span>
);

export default defaultRenderMark;
