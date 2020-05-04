import * as React from "react";
import * as ReactDOM from 'react-dom';

import { TextEditor } from './TextEditor';

function App() {
  return (
    <div >
      <TextEditor text="Lorem Impsum Dollar 10" />
    </div>
  );
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);