import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return '';
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
export default class Quincenas extends React.Component {
    state = {
        root: null,
        userType: null,
        classes: null
    }

    constructor(props){
        super(props)
        const root = new Array()
        const m = this.newM(`--------------------CARGANDO--------------------`, '0')
        root.push(m)
        this.state={
            root: root,
            userType: props.userType,
            classes: props.classes
        }
        this.obtenerQL()
    }
        
     newM = (str, key) => {
        const {classes} = this.props
        return(
        <MenuItem key={key}
            className={classes.dropdownItem}
            onClick={this.irA(key)}
        >
             {str} 
            
        </MenuItem>
        
        )
    }


    irA = (idQuincena) => (event) => {
        
        const {userType} = this.state
        if(userType !== null){
            const idUsuario = getParameterByName('idUsuario',window.location.href);
            if(idUsuario!==''){
                window.history.pushState(null, 'Buscar por quincena', `${userType}?idQuincena=${idQuincena}&idUsuario=${idUsuario}`)
            }else{
                window.history.pushState(null, 'Buscar por quincena', `${userType}?idQuincena=${idQuincena}`)
            }
            window.history.go()
        }
    }

    obtenerQL=async()=>{
    try {
        
       // const sendUri = "http://35.222.167.128:3015/";
        const sendUri = "http://localhost:3018/";
        //const sendUri = "http://192.168.1.74:3015/";
        const bodyJSON = {idUsuario: '?'};
        const response = await fetch(sendUri, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bodyJSON)
        });

        const responseJson = await response.json().then(r => {
            //  console.log(`Response1: ${r}`)
            if (r.quincenas !== undefined && r.quincenas.length > 0) {
              const root = new Array()
              
              r.quincenas.forEach(e => {
                const m = this.newM(e.descripcion, e.idQuincena)
                root.push(m)
              });
              this.setState({root: root})
          
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