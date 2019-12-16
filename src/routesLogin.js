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
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
// core components/views for Admin layout
import Acceso from "views/UserProfile/Acceso.js";
import Registro from "views/UserProfile/Registro.js";
import NotificationsPage from "views/Notifications/Notifications.js";

const dashboardRoutes = [
  {
    path: "/acceso",
    name: "Iniciar sesión",
    rtlName: "لوحة القيادة",
    icon: Person,
    component: Acceso,
    layout: "/inicio"
  },
  {
    path: "/registrarse",
    name: "Registrarse",
    rtlName: "قائمة الجدول",
    icon: "content_paste",
    component: Registro,
    layout: "/inicio"
  }
];

export default dashboardRoutes;
