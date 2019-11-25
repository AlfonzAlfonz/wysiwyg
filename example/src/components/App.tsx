import * as React from "react";

import Editor from "./Editor";
import { GlobalStyle, PageStyle } from "./styles";
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import InlineEditor from "./Editor/InlineEditor";

const App: React.FC = () => {
  return (
    <PageStyle>
      <GlobalStyle />
      <h1>Wysiwig</h1>
      <HashRouter>
        <div className="menu">
          <Link to="/">Full editor</Link>
          <Link to="/inline">Inline editor</Link>
        </div>
        <Switch>
          <Route exact path="/">
            <Editor />
          </Route>
          <Route path="/inline">
            <InlineEditor />
          </Route>
        </Switch>
      </HashRouter>
    </PageStyle>
  );
};

export default App;
