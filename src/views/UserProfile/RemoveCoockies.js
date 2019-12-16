import cookie from "react-cookies";
export default () => {
    cookie.remove("idUsuario", { path: "/" });
    cookie.remove("nombre", { path: "/" });
    cookie.remove("correo", { path: "/" });
    cookie.remove("edad", { path: "/" });
    cookie.remove("idRol", { path: "/" });
    cookie.remove("pass", { path: "/" });
  
}