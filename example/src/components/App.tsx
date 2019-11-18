import * as React from "react";

import Editor from "./Editor";
import { GlobalStyle } from "./styles";

const App: React.FC = () => {
  return (
    <div>
      <GlobalStyle />
      <h1>Wysiwig</h1>
      <Editor />
    </div>
  );
};

export default App;
