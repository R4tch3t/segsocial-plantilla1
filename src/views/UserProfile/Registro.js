import React from "react";
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

export default function Registro() {
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
          window.history.pushState(null, 'Accesar', '#/inicio/acceso')
          window.history.go()
          
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

  const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  

  const selectFile = async () => {    
    const file = document.querySelector('#file-input').files[0]
    const result = await toBase64(file).catch(e => e);
    if (result instanceof Error) {
      console.log('Error: ', result.message);
      return;
    }
    state.avatar64 = `'${result}'`
    document.getElementById('avatar').src=result
  };

  const obtenerEdad = (str) => {
    const currentD = new Date()
    const y = currentD.getFullYear().toString().substring(2, 4)
    const fechaN = str.substring(4, 10);
    var a = parseInt(fechaN.substring(0, 2));
    a = a > parseInt(y) ? parseInt(`19${a}`) : parseInt(`20${a}`);
    const m = parseInt(fechaN.substring(2, 4));
    const d = parseInt(fechaN.substring(4, 6));
    return (currentD.getMonth() < m ||
      currentD.getMonth() == m && currentD.getDate() < d) ? currentD.getFullYear() - a - 1 : currentD.getFullYear() - a;
  }

const validarDatos = () => {
  const CVE_ID = document.getElementById('idUsuario')
  const nombre = document.getElementById('nombre')
  const correo = document.getElementById('correo')
  const splitA = correo.value.toLowerCase().split("@")
  const edad = document.getElementById('edad')
  const pass = document.getElementById('pass')
  const passC = document.getElementById('passC')
  
  if (CVE_ID.value === '') {
      showNotification("tr")
      CVE_ID.focus()
      return false
  }

  if (nombre.value === '' || nombre.value === ' ') {
    showNotification("tr")
    nombre.focus()
    return false
  }

  if (correo.value === '') {
    showNotification("tr")
    correo.focus()
    return false
  }

  if (splitA.length <= 1) {
      showNotification("trC")
      correo.focus()
      return false
  }

  const splitB = splitA[1].split(".")

  if(splitB[1] !== "com"){
    showNotification("trC")
    correo.focus()
    return false
  }

  if (edad.value===''||isNaN(edad.value)) {
    showNotification("tr")
    edad.focus()
    return false
  }

  if (pass.value==='') {
    showNotification("tr")
    pass.focus()
    return false
  }

  if (passC.value==='') {
    showNotification("tr")
    passC.focus()
    return false
  }

  if (passC.value !== pass.value) {
    showNotification("trP")
    pass.focus()
    return false
  }

  registrar()
}

const getinfoReg = async () => {
  try {
    const sendUri = 'http://localhost:3010/'
    //const sendUri = "http://192.168.1.74:3010/";
    //const sendUri = "http://35.222.167.128:3010/";
    const CVE_ID = document.getElementById('idUsuario').value
    console.log(CVE_ID)
    const bodyJSON = {
      CVE_ID: CVE_ID
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
      if (r[0] !== undefined) {
        const nombre = document.getElementById('nombre')
        const edad = document.getElementById('edad')
        nombre.value = r[0].n;
        edad.defaultValue = obtenerEdad(r[0].c);
        edad.value = edad.defaultValue;
        

      }
    })
  } catch (e) {
    console.log(e)
  }
}

const registrar = async () => {
  try {
    // console.log(this.nombre)
    //  console.log(this.nombre.current.value)

    //const sendUri = "http://35.222.167.128:3011/";
     const sendUri = 'http://localhost:3011/'
    //const sendUri = "http://192.168.1.74:3011/";
    
    const CVE_ID = document.getElementById('idUsuario').value
    const nombre = document.getElementById('nombre').value
    const correo = document.getElementById('correo').value
    const edad = document.getElementById('edad').value
    const pass = document.getElementById('pass').value

    const bodyJSON = {
      idUsuario: CVE_ID,
      nombre: nombre,
      correo: correo,
      edad: edad,
      avatar64: state.avatar64,
      pass: pass,
      idRol: 0
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
      if (r[0] !== undefined && r[0].correo === correo) {
        showNotification("trA")        
      } else if (r.error.name === 'error01') {
        showNotification("trE1")
      } else if (r.error.name === 'error02') {
        showNotification("trE2")
      }
    })


  } catch (e) {
    console.log(`Error: ${e}`)
  }
};
  return (
    <div>
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
          message='Error, las contraseñas no coinciden'
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
          message='Empleado registrado con éxito'
          open={trA}
          closeNotification={() => setTRA(false)}
          close
        />
        <GridItem xs={8} sm={8} md={2}>         
        </GridItem> 
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Registrar empleado</h4>
              <p className={classes.cardCategoryWhite}>Completar su perfil</p>
            </CardHeader>
            <CardBody>
              <CardAvatar profile>
                <input id="file-input" type="file" onChange={selectFile}  name="avatar" style={{display: 'none'}} />
                <a  style={{cursor: 'pointer'}} onClick={()=>{document.getElementById('file-input').click()}} >
                  <img id='avatar' src={avatar} alt="Foto de perfil" />
                </a>
              </CardAvatar>
              <GridContainer>
                <GridItem xs={4} sm={4} md={2}/> 
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    
                    labelText="N° de empleado"
                    id="idUsuario"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'number',
                      onClick: getinfoReg,
                      onChange: getinfoReg
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Nombre"
                    id="nombre"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      defaultValue: ' ',
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={4} sm={4} md={2}/>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Correo"
                    id="correo"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Edad"
                    id="edad"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps = {{
                      type: 'number',
                      defaultValue: ' '
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={4} sm={4} md={2}/>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Contraseña"
                    id="pass"
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
            <CardFooter >
              <Button id = 'regB'
                color="success"  
                style={{
                  display: 'flex',
                  flex: 1, 
                  alignItems: 'center'
                }}
                onClick = {validarDatos}
                >
                Registrar
              </Button>
            </CardFooter>
          </Card>
        </GridItem>
        
      </GridContainer>
    </div>
  );
}
