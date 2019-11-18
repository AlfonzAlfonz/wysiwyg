import * as React from "react";

const Void: React.FC = ({ children }) => (
  <div contentEditable={false}>{children}</div>
);

export default Void;
