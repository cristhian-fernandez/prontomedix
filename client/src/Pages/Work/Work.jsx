import React, { useState } from 'react';
import styles from  './Work.module.css';
import tecnologo from './../../img/tecnologo.webp'
import messaging from './../../img/messaging.webp'
import navigate from './../../img/navigate.webp'
import { Link } from 'react-router-dom';
function Work() {
    const carreras = getCarreras ();
    const [input, setInput] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        distrito: "",
        carrera: "0"
    });
    const [error, setError] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        distrito: "",
        carrera: ""
    });
    const onInputChange = (e) => {
        e.preventDefault();
        setInput(
            {...input, [e.target.name]:e.target.value}
        );
        setError(
            validateInput({...input, [e.target.name]:e.target.value})
        );
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if(Object.entries(error).length === 0){
            let text = '';
            text += `Hola! Prontomedic soy *${input.name} ${input.lastname}*, quiero trabajar con ustedes, estos son mis datos: `;
            text += `. *Email:* ${input.email}`;
            text += `. *Celular:* ${input.phone}`;
            text += `. *Carrera:* ${input.carrera}`;
            text += `. *Distrito:* ${input.distrito}`;
            text += `. Muchas gracias! `;
            const encodeText = encodeURI(text);
            const urlWhatsapp = `https://api.whatsapp.com/send?phone=+51913452643&text=${encodeText}`;
            const newMessage = {
                name: input.name,
                lastname: input.lastname,
                email: input.email,
                phone: input.phone,
                hora_seleccionada: input.horario,
                distrito: input.distrito,
                address: input.address,
                referencia: input.referencia,
            }
            console.log('newMessage',newMessage);
            // dispatch(createCart(newOrder));
            setInput({
                name: "",
                lastname: "",
                email: "",
                phone: "",
                distrito: "",
                horario: "0"
            });
            alert('Tus datos se enviarán al WhatsApp y al correo inmediatamente.');
            window.open(urlWhatsapp);
        }else{
            if(input.name === '') return alert('Ingrese su nombre');
            if(error.name) return alert(error.name);
            if(error.lastname) return alert(error.lastname);
            if(error.phone) return alert(error.phone);
            if(error.email) return alert(error.email);
            if(error.distrito) return alert(error.distrito);
            if(error.carrera) return alert(error.carrera);
        }
    }

    return (
        <div className={styles.work}>
            <h2>Trabaja con nosotros</h2>
            <p>Si eres Técnico en laboratorio, enfermería, o licenciado en tecnología médica puedes ser parte de nuestra red de tomadores de muestra, necesitas tener experiencia probada de mínimo 2 años en extracción de muestras para análisis de laboratorio.</p>
            <img src={tecnologo} alt="tecnologo" />
            <p>Los beneficios que tendrás por afiliarte a nuestra red es que podrás aprovechar tus tiempos fuera de tu trabajo generando ingresos adicionales o si lo deseas puedas laborar a tiempo completo y poder tener ingresos arriba del promedio en el rubro.</p>
            <p>Como tomador de muestra tienes el 100 % de los ingresos por el servicio de toma de muestras, nosotros nos encargamos de tomar el requerimiento del paciente en nuestro sistema y en minutos con tu horario previamente establecido, poder asignarte la visita con todos los datos para que cumplas con el servicio.</p>
            <img src={messaging} alt="messaging" />
            <p>Estamos buscando tomadores que residan o laboren en los siguientes distritos:  Surco, San Borja, La molina, Miraflores, San Isidro, Lince, Jesús María, Pueblo Libre, San Miguel, Magdalena, Breña y Cercado de lima.</p>
            <p>Los pacientes aginados estarán a minutos de sus lugares de residencia o trabajo para un rápido servicio.</p>
            <img src={navigate} alt="navigate" />
            <p>Si te interesa tener una entrevista para más detalles y puedas participar en nuestro proceso de selección envía el siguiente formulario y estaremos conversando inmediatamente</p>

            
            <form onSubmit={onSubmit}>
                <h3>Trabaja con nosotros</h3>
                <div className={styles.form_input}>
                    <input 
                        type="text" 
                        name='name'
                        value={input.name}
                        placeholder='Ingresar nombre' 
                        onChange={onInputChange} className={error.name && styles.danger}/>
                    <p className={styles.danger}>{error.name}</p>
                </div>
                <div className={styles.form_input}>
                    <input 
                        type="text" 
                        name='lastname'
                        value={input.lastname}
                        placeholder='Ingresar apellido' 
                        onChange={onInputChange} className={error.lastname && styles.danger}/>
                    <p className={styles.danger}>{error.lastname}</p>
                </div>
                <div className={styles.form_input}>
                    <input 
                        type="email" 
                        name='email'
                        value={input.email}
                        placeholder='Ingresar email' 
                        onChange={onInputChange} className={error.email && styles.danger}/>
                    <p className={styles.danger}>{error.email}</p>
                </div>
                <div className={styles.form_input}>
                    <input 
                        type="text" 
                        name='phone'
                        value={input.phone}
                        placeholder='Ingresar número celular / Whatshap' 
                        onChange={onInputChange} className={error.phone && styles.danger}/>
                    <p className={styles.danger}>{error.phone}</p>
                </div>

                <div className={styles.form_input}>
                    <select
                        type="select" 
                        name='carrera'
                        value={input.carrera} 
                        onChange={onInputChange}>
                            <option value={'0'} >Seleccione su carrera</option>
                            {
                                carreras.map((carrera) => {
                                    return carrera.length>0 ?  <option value={carrera} key={carrera}>{carrera}</option> : ''
                                })
                            }
                    </select>
                    <p className={styles.danger}>{error.carrera}</p>
                </div>
                <div className={styles.form_input}>
                    
                    <input 
                        type="text" 
                        name='distrito'
                        value={input.distrito}
                        placeholder='Ingresar distrito' 
                        onChange={onInputChange} className={error.distrito && styles.danger}/>
                    <p className={styles.danger}>{error.distrito}</p>
                </div>
                <button type="submit" className={styles.btn_send}>Enviar</button>
            </form>
            <span className={styles.btn_home}><Link to='/'>Volver al inicio</Link></span>
        </div>
        
    );
}

export function validateInput (input){
    let error = {}
    if(input.name.length === 0){
      error.name = '* Nombre es requerido';
    }
    if(input.lastname.length ===0){
      error.lastname = '* Apellido es requerido';
    }
    if(!input.email){
      error.email = '* Email es requerido';
    }else if(!/\S+@\S+\.\S+/.test(input.email)){
      error.email = '* Email es inválido, ejm: prueba@gmail.com';
    }
    if(!input.phone){
        error.phone = '* Celular es requerido';
    }else if(!/^[0-9]{9}/.test(input.phone)){
        error.phone = '* Celular es inválido';
    }
    if(input.distrito.length ===0){
      error.distrito = '* Distrito es requerido';
    }
    if(input.carrera === '0'){
      error.carrera = '* Seleccione una carrera';
    }

    return error;
}
export function getCarreras (){
    const carreras = [
        'Tec. Laboratorio','Tec. Enfermería','Tecnólogo Médico'];
    return carreras;
}

export default Work;