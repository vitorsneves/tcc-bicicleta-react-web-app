import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { CentralizedPane } from './Components/CentralizedPane'
import { TableGroup } from './Pages/TableGroup'

ReactDOM.render(
    <React.StrictMode> 
        <CentralizedPane>
            <TableGroup />
        </CentralizedPane>
    </React.StrictMode>,

     document.getElementById("root")
);
