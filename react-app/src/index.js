import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App';
// import {app2, app} from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import HelloMessage from './Hello';

ReactDOM.render(<HelloMessage name='John'/>, document.getElementById('root'));
registerServiceWorker();
