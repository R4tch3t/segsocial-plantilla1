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

import avatar from "assets/img/faces/login.jpg";

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

export default function EditarContraseña() {
  var state = {
    avatar64: null
  }
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

const validarPass = () => {
  const pass = cookie.load('pass')
  const passChange = document.getElementById('passChange')
  const passN = document.getElementById('passN')
  const passC = document.getElementById('passC')
  if (passChange.value === '') {
    showNotification("tr")
    passChange.focus()
    return false
  }

  if (passN.value === '') {
    showNotification("tr")
    passN.focus()
    return false
  }

  if (passC.value === '') {
    showNotification("tr")
    passC.focus()
    return false
  }

  if (passChange.value !== pass) {
    showNotification("trP")
    passChange.focus()
    return false
  }

  if (passN.value !== passC.value) {
    showNotification("trP")
    passN.focus()
    return false
  }

  actualizarPass(passN.value)
}

const actualizarPass = async (pass) => {
  try {
    // console.log(this.nombre)
    //  console.log(this.nombre.current.value)

        //const sendUri = "http://35.222.167.128:3017/";
        const sendUri = 'http://localhost:3017/'
        //const sendUri = "http://192.168.1.74:3017/";
        //const pass = this.newPass.current.value
        const CVE_ID = cookie.load("idUsuario")

        const bodyJSON = {
          idUsuario: CVE_ID,
          pass: pass
        };
        const response = await fetch(sendUri, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bodyJSON)
        })
        const responseJson = await response.json().then(r => {
          //console.log(`Response1: ${r}`)
          if(r[0]!==undefined&&`${r[0].idUsuario}`===`${CVE_ID}`){
            cookie.remove("pass", { path: "/" });
            cookie.save("pass", pass, { path: "/" });
            showNotification("trA")
          } else if (r.error.name === 'error01') {
            showNotification("trE1")
          } 
        })
        

    } catch (e) {
        console.log(`Error: ${e}`)
    }
};

const changeToEdit = () => {
  const divPass = document.getElementById('divPass')
  const divContainer = document.getElementById('divContainer')
  divPass.style.display = 'none'
  divContainer.style.display = 'block'
}

  return (
    <div id='divPass' style={{display: 'none'}} >
      <GridContainer>
        <Snackbar
          place="tr"
          color="warning"
          icon={WN}
          message='Advertencia, rellenar todos los campos'
          open={tr}
          closeNotification={() => setTR(false)}
          close
        />
        <Snackbar
          place="tr"
          color="danger"
          icon={E}
          message='Error, correo inválido'
          open={trC}
          closeNotification={() => setTRC(false)}
          close
        />
        <Snackbar
          place="tr"
          color="danger"
          icon={E}
          message='Error, contraseña incorrecta'
          open={trP}
          closeNotification={() => setTRP(false)}
          close
        />
        <Snackbar
          place="tr"
          color="danger"
          icon={E}
          message='Error, el N° de empleado ya se ha registrado'
          open={trE1}
          closeNotification={() => setTRE1(false)}
          close
        />
        <Snackbar
          place="tr"
          color="danger"
          icon={E}
          message='Error, el N° de empleado no existe'
          open={trE2}
          closeNotification={() => setTRE2(false)}
          close
        />
        <Snackbar
          place="tr"
          color="success"
          icon={CheckCircle}
          message='Contraseña actualizada con éxito'
          open={trA}
          closeNotification={() => setTRA(false)}
          close
        />
        <GridItem xs={8} sm={8} md={2}>         
        </GridItem> 
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Actualizar contraseña</h4>
              <p className={classes.cardCategoryWhite}>Completar los campos</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={4} sm={4} md={4}/>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Contraseña actual"
                    id="passChange"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'password'
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={4} sm={4} md={2}/>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Nueva contraseña"
                    id="passN"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'password'
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Confirmar contraseña"
                    id="passC"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'password'
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button
                color="danger"  
                style={{
                  display: 'flex',
                  flex: 1, 
                  alignItems: 'center'
                }}
                onClick = {changeToEdit}
                >
                Atras
              </Button>
            </CardFooter>
            <CardFooter>
              <Button id = 'actPB'
                color="success"  
                style={{
                  display: 'flex',
                  flex: 1, 
                  alignItems: 'center'
                }}
                onClick = {validarPass}
                >
                Guardar cambios
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
  );
}
