import React from 'react';
import { Link } from 'react-router-dom';
import styles from  './About.module.css';

function About() {
    return (
        <div className={styles.about}>
            <h2>¿Quiénes somos ?</h2>
            <p>Somos una plataforma online de servicios de salud que llega para solucionar en principio el requerimiento de análisis clínicos de laboratorio a domicilio, donde podrás solicitar desde tu celular en tiempo real la prueba que deseas realizarte.</p>
            <p>En la actualidad realizarse un análisis clínico requiere movilizarte a un centro médico o laboratorio gastando tiempo y recursos haciendo colas, tramites y permanecer en un ambiente con varios pacientes.</p>
            <p>Si bien es cierto existen opciones de toma de muestras a domicilio, sin embargo, no son en tiempo real ni te brindan el horario que deseas y el tiempo de respuesta no es inmediato haciendo así el agendamiento muy tedioso.</p>
            <p>Queremos que cuando pienses en solicitar un análisis clínico, pienses en Prontomedix, como lo haces con Uber cuando piensas en taxis o en rappi cuando piensas en pedir comida delivery.</p>
            <p>Solo debes ingresar a nuestra página y solo son 4 pasos: Cotizar, llena tus datos, agéndalo y envía la orden, en minutos tendrás los datos y foto en tu correo y WhatsApp del personal que te asignamos para la toma de muestra en la dirección, fecha y horario que indicaste, horas antes de la cita tendrás recordatorios.</p>
            <Link to='/'><span>Volver al inicio</span></Link>
            <p>Suscríbete a nuestra comunidad saludable para promociones , novedades y contenido útil</p>
            <div>
                <input type="text" />
                <button>Unirse a nuestra lista de correo</button>
            </div>
        </div>
    );
}

export default About;