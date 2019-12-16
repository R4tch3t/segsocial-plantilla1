import React from "react";
import cookie from "react-cookies";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import AddAlert from "@material-ui/icons/AddAlert";
import ArrowUpward from "@material-ui/icons/ArrowUpward"
import WN from "@material-ui/icons/Warning"
import E from "@material-ui/icons/Error"
import CheckCircle from "@material-ui/icons/CheckCircle"
import Snackbar from "components/Snackbar/Snackbar.js";


const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function Acceso() {
  
  const [tr, setTR] = React.useState(false);
  const [trC, setTRC] = React.useState(false);
  const [trP, setTRP] = React.useState(false);
  const [trA, setTRA] = React.useState(false);
  const [trE1, setTRE1] = React.useState(false);
  const [trE2, setTRE2] = React.useState(false);
  const classes = useStyles();
  const showNotification = place => {
    switch (place) {
      case "tr":
        if (!tr) {
          setTR(true);
          setTimeout(function () {
            setTR(false);
          }, 6000);
        }
        break;
      case "trC":
      if (!trC) {
        setTRC(true);
        setTimeout(function () {
          setTRC(false);
        }, 6000);
      }
      break;
      case "trP":
      if (!trP) {
        setTRP(true);
        setTimeout(function () {
          setTRP(false);
        }, 6000);
      }
      break;
      case "trA":
      if (!trP) {
        setTRA(true);
        setTimeout(function () {
          setTRA(false);
          document.location.href = '.'
          
        }, 3000);
      }
      break;
      case "trE1":
      if (!trE1) {
        setTRE1(true);
        setTimeout(function () {
          setTRE1(false);
        }, 6000);
      }
      break;
      case "trE2":
      if (!trE2) {
        setTRE2(true);
        setTimeout(function () {
          setTRE2(false);
        }, 6000);
      }
      break;
      default:
        break;
    }
  };
  
  const saveCookies = (idUsuario, nombre, correo, edad, idRol, pass) => {
        cookie.save("idUsuario", idUsuario, { path: "/" });
        cookie.save("nombre", nombre, { path: "/" });
        cookie.save("correo", correo, { path: "/" });
        cookie.save("edad", edad, { path: "/" });
        cookie.save("idRol", idRol, { path: "/" });
        cookie.save("pass", pass, { path: "/" });
  }

  const validarDatos = () => {
    const CVE_ID = document.getElementById('idUsuario')
    const pass = document.getElementById('pass')
    if (CVE_ID.value === '') {
      showNotification("tr")
      CVE_ID.focus()
      return false
    }

    if (pass.value === '') {
      showNotification("tr")
      pass.focus()
      return false
    }
    comprobarU(CVE_ID.value, pass.value)
  }

const accesoKey = (e) =>{
  if (e.which === 13) {
    validarDatos();
  }
}

 const comprobarU = async (idUsuario, pass) => {
   try {
     
     //const sendUri = "http://35.222.167.128:3012/";
     //const sendUri = "http://192.168.1.74:3012/";
     const sendUri = "http://localhost:3012/";
     

     const bodyJSON = {
       idUsuario: idUsuario,
       pass: pass
     };
     const response = await fetch(sendUri, {
       method: "POST",
       headers: {
         Accept: "application/json",
         "Content-Type": "application/json"
       },
       body: JSON.stringify(bodyJSON)
     });
     const responseJson = await response.json().then(r => {
       if (
         r[0] !== undefined &&
         (`${r[0].idUsuario}` === `${idUsuario}`)
       ) {
         saveCookies(idUsuario, r[0].nombre, r[0].correo, r[0].edad, r[0].idRol, pass)
         if (r[0].idRol === 0) {
           window.history.pushState(null, 'Usuario', '#/usuario/creditos')
           window.history.go()
         } else if (r[0].idRol === 1) {
           window.history.pushState(null,'Administrador','#/admin/creditos')
           window.history.go() 
         }
       } else if (r.error.name === "error01") {
         showNotification("trE1")
       } else if (r.error.name === "error02") {
         showNotification("trE2")
       }
     });
   } catch (e) {
     console.log(`Error: ${e}`);
   }
 };

  return (
    <div>
      <GridContainer>
        <Snackbar
          place="tr"
          color="warning"
          icon={WN}
          message="Advertencia, rellenar todos los campos"
          open={tr}
          closeNotification={() => setTR(false)}
          close
        />
        <Snackbar
          place="tr"
          color="warning"
          icon={WN}
          message="Advertencia, correo inválido"
          open={trC}
          closeNotification={() => setTRC(false)}
          close
        />
        <Snackbar
          place="tr"
          color="danger"
          icon={E}
          message="Error, las contraseñas no coinciden"
          open={trP}
          closeNotification={() => setTRP(false)}
          close
        />
        <Snackbar
          place="tr"
          color="danger"
          icon={E}
          message="Error, la contraseña es incorrecta"
          open={trE1}
          closeNotification={() => setTRE1(false)}
          close
        />
        <Snackbar
          place="tr"
          color="danger"
          icon={E}
          message="Error, el N° de empleado no existe"
          open={trE2}
          closeNotification={() => setTRE2(false)}
          close
        />
        <Snackbar
          place="tr"
          color="success"
          icon={CheckCircle}
          message="Empleado registrado con éxito"
          open={trA}
          closeNotification={() => setTRA(false)}
          close
        />
        <GridItem xs={8} sm={8} md={4}></GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card>
            <CardHeader color="success">
              <h4 className={classes.cardTitleWhite}>Acceder al sistema</h4>
              <p className={classes.cardCategoryWhite}>
                Favor de ingresar su número de empleado y contraseña
              </p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={4} sm={4} md={3} />
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="N° de empleado"
                    id="idUsuario"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "number",
                      onKeyUp: accesoKey
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={4} sm={4} md={3} />
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Contraseña"
                    id="pass"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      type: "password",
                      onKeyUp: accesoKey
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button
                id="regB"
                color="success"
                style={{
                  display: "flex",
                  flex: 1,
                  alignItems: "center"
                }}
                onClick={validarDatos}
              >
                Entrar
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
