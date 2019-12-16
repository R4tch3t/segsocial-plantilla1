/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Usuario from "layouts/Usuario.js";
import Inicio from "layouts/Inicio.js";
import RTL from "layouts/RTL.js";
import cookie from "react-cookies";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();
switch(cookie.load("idRol")){
  case "0":
  ReactDOM.render(
    <HashRouter history={hist}>
      <Switch>
        <Route path="/" component={Usuario} />
      </Switch>
    </HashRouter>,
    document.getElementById("root")
  )
  break;
  case "1":
  ReactDOM.render(
    <HashRouter history={hist}>
      <Switch>
        <Route path="/" component={Admin} />
      </Switch>
    </HashRouter>,
    document.getElementById("root")
  )
  break;
  default:
   ReactDOM.render(
     <HashRouter history={hist}>
       <Switch>
         <Route path="/" component={Inicio} />
       </Switch>
     </HashRouter>,
     document.getElementById("root")
   );
   break; 
}
