import React from "react";
import cookie from "react-cookies";
import MenuItem from "@material-ui/core/MenuItem";
export default class Quincenas extends React.Component {
    state = {
        root: null,
        userType: null,
        classes: null
    }

    constructor(props){
        super(props)
        //const root = new Array()
        //const m = this.newM(`--------------------CARGANDO--------------------`, '0')
       // root.push(m)
        this.state={
            root: null,
            userType: props.userType,
            classes: props.classes
        }
        this.obtenerU()
    }
        
     newM = (str, key) => {
        const {classes} = this.props
        return(
        <MenuItem key={key}
            className={classes.dropdownItem}
            onClick={this.setAdmin()}
        >
             {str} 
            
        </MenuItem>
        
        )
    }

    setAdmin = () => (event) => {
        cookie.remove("idRol", { path: "/" });
        cookie.save("idRol", 1, { path: "/" });
        window.history.pushState(null,'Administrador','#/admin/creditos')
        window.history.go()
    }

    obtenerU=async()=>{
    try {
     const idUsuario = cookie.load('idUsuario')
     const pass = cookie.load('pass')
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
         if (r[0].idRol === 1) {
             const root = new Array()
             const m = this.newM(`Administrador`, '1')
             root.push(m)
             this.setState({root: root})
         }
       }
     });
   } catch (e) {
     console.log(`Error: ${e}`);
   }
}

    render(){
        
        const {root} = this.state
        return root
    }
}