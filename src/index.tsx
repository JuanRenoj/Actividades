import React from 'react';
import ReactDOM from 'react-dom/client';
import "./style/style.css"
import "./style/styleSidebar.css"
import "./style/styleHeader.css"
import "./style/styleModal.css"
import "./style/styleInputSelect.css"
import "./style/styleButtons.css"
import "./style/styleConfirm.css"
import Home from './pages/home/Home';
import "boxicons/css/boxicons.min.css"

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Home/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

