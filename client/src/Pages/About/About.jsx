import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { suscribe } from '../../redux/actions/actions';
import styles from  './About.module.css';

function About() {
    const dispatch = useDispatch();
    const [input, setInput] = useState({
        email: ""
    });
    const [error, setError] = useState({
        email: ""
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

    const subscribe = () => {
        if(Object.entries(error).length === 0){
            const emailSuscribe = {
                email: input.email
            }
            dispatch(suscribe(emailSuscribe));
            setInput({
                email: ""
            });
            alert('Gracias por suscribirte.');
        }else{
            if(error.email) return alert(error.email);
        }
    }
    return (
        <div className={styles.about}>
            <h2>¿Quiénes somos ?</h2>
            <p>Somos una plataforma online de servicios de salud que llega para solucionar en principio el requerimiento de análisis clínicos de laboratorio a domicilio, donde podrás solicitar desde tu celular en tiempo real la prueba que deseas realizarte.</p>
            <p>En la actualidad realizarse un análisis clínico requiere movilizarte a un centro médico o laboratorio gastando tiempo y recursos haciendo colas, tramites y permanecer en un ambiente con varios pacientes.</p>
            <p>Si bien es cierto existen opciones de toma de muestras a domicilio, sin embargo, no son en tiempo real ni te brindan el horario que deseas y el tiempo de respuesta no es inmediato haciendo así el agendamiento muy tedioso.</p>
            <p>Queremos que cuando pienses en solicitar un análisis clínico, pienses en Prontomedix, como lo haces con Uber cuando piensas en taxis o en rappi cuando piensas en pedir comida delivery.</p>
            <p>Solo debes ingresar a nuestra página y solo son 4 pasos: Cotizar, llena tus datos, agéndalo y envía la orden, en minutos tendrás los datos y foto en tu correo y WhatsApp del personal que te asignamos para la toma de muestra en la dirección, fecha y horario que indicaste, horas antes de la cita tendrás recordatorios.</p>
            <span className={styles.btn_home}><Link to='/'>Volver al inicio</Link></span>
            <p>Suscríbete a nuestra comunidad saludable para promociones , novedades y contenido útil</p>
            <div className={styles.suscripcion}>
                <div>
                    <input 
                        type="email" 
                        name='email'
                        value={input.email}
                        placeholder='email@ejemplo.com' 
                        onChange={onInputChange} className={error.email && styles.danger}/>
                    <p className={styles.danger}>{error.email}</p>
                </div>
                <button onClick={subscribe}>Unirse a nuestra lista de correo</button>  
            </div>
        </div>
    );
}

export default About;


export function validateInput (input){
    let error = {}
    if(!input.email){
      error.email = '* Email es requerido';
    }else if(!/\S+@\S+\.\S+/.test(input.email)){
      error.email = '* Email es inválido, ejm: prueba@gmail.com';
    }
    return error;
}