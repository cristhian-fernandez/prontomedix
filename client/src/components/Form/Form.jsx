import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, createCart } from '../../redux/actions/actions';
import styles from './Form.module.css';
import DatePicker, {registerLocale} from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import es from 'date-fns/locale/es';
registerLocale('es',es);

function Form(props) {
    const distritos = getDistritos ();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const timeNow = Date.now();
    let time = new Date(timeNow);
    let hour = time.getHours() + 3;

    let arrayHour = ["","","","","","","","7 - 8 am","8 - 9 am","9 - 10 am","10 - 11 am","11 - 12 am","12 - 1 pm","1 - 2 pm","2 - 3 pm","3 - 4 pm","4 - 5 pm","5 - 6 pm"];
    let arrayHourSunday = ["","","","","","","","7 - 8 am","8 - 9 am","9 - 10 am","10 - 11 am","11 - 12 am","12 - 1 pm"];

    let date = new Date(time.getFullYear(), time.getMonth(), time.getDate());
    const today = date.getDay();
    const arrayHourToday = today===0 ? arrayHourSunday : arrayHour;
    const arrayHourSelect = [];

    if (hour >= arrayHourToday.length) {
        for (let i = 6; i < arrayHourToday.length; i++) {
            arrayHourSelect.push(arrayHourToday[i])
        }
    } else {
        for (let i = hour; i < arrayHourToday.length; i++) {
            arrayHourSelect.push(arrayHourToday[i])
        }
    }
    const [rangeHour, setRangeHour] = useState(arrayHourSelect);

    if (hour >= arrayHourToday.length) date.setDate(date.getDate()+1);

    // const isWeekday = (date) => {
    //     const day = date.getDay();
    //     // return day !== 0 && day !== 6;
    //     return day !== 0;
    // };

    const [startDate, setStartDate] = useState(date);
    const [input, setInput] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        distrito: "0",
        horario: "0",
        address: "",
        referencia: "",
        checkbox: ""
    });
    const [checked, setChecked] = useState(true);
    const [error, setError] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        distrito: "",
        horario: "",
        address: "",
        referencia: "",
        checkbox: ""
    });

    const onChangeDate = (e) => {
        setStartDate(e);
        let dateSelect = new Date(e);
        const day = dateSelect.getDay();
        if(day===0) {
            setRangeHour(arrayHourSunday);
        }else{
            setRangeHour(arrayHour);
        }
    }
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
        const date = new Date();
        if(Object.entries(error).length === 0 && cart.length>0 && checked){
            let text = '';
            text += `Hola! Prontomedix soy *${input.name} ${input.lastname}*, quiero hacer el siguiente *Pedido de análisis clínico:* `;
            text += cart.map(element => { return element.nombre_prueba}).join(', ');
            text += `. *Email:* ${input.email}`;
            text += `. *Celular:* ${input.phone}`;
            text += `. *Distrito:* ${input.distrito}`;
            text += `. *Fecha de cita:* ${startDate.toISOString().split('T')[0]}`;
            text += `. *Hora de cita:* ${input.horario}`;
            text += `. *Pago total:* S/ ${props.pagoTotal}`;
            text += `. *Dirección:* ${input.address}`;
            if(input.referencia !=='') text += `. *Referencia:* ${input.referencia}`;
            text += `. Muchas gracias! `;
            const encodeText = encodeURI(text);
            const urlWhatsapp = `https://api.whatsapp.com/send?phone=+51973485394&text=${encodeText}`;
            const newOrder = {
                name: input.name,
                lastname: input.lastname,
                email: input.email,
                phone: input.phone,
                fecha_seleccionada: startDate.toISOString().split('T')[0],
                hora_seleccionada: input.horario,
                distrito: input.distrito,
                address: input.address,
                referencia: input.referencia,
                cart: cart,
                pagoTotal: props.pagoTotal,
                date: date.toLocaleString()
            }
            // console.log('newOrder',newOrder);
            dispatch(createCart(newOrder));
            dispatch(clearCart());
            setInput({
                name: "",
                lastname: "",
                email: "",
                phone: "",
                distrito: "0",
                horario: "0",
                address: "",
                referencia: ""
            });
            alert('Su orden de análisis se enviará al WhatsApp y al correo inmediatamente.');
            window.open(urlWhatsapp);
        }else{
            if(input.name === '') return alert('Ingrese su nombre');
            if(error.name) return alert(error.name);
            if(error.lastname) return alert(error.lastname);
            if(error.phone) return alert(error.phone);
            if(error.email) return alert(error.email);
            if(error.distrito) return alert(error.distrito);
            if(error.address) return alert(error.address);
            if(cart.length === 0) return alert ('Seleccione al menos una análisis clínico');
            if(!checked) return alert('Check en autorizar el envió de resultados')
        }
    }
    return (
        <div className={styles.form}>
            <form onSubmit={onSubmit}>
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
                        name='distrito'
                        value={input.distrito} 
                        onChange={onInputChange}>
                            <option value={'0'} >Seleccione su distrito</option>
                            {
                                distritos.map((distrito) => {
                                    return distrito.length>0 ?  <option value={distrito} key={distrito}>{distrito}</option> : ''
                                })
                            }
                    </select>
                    <p className={styles.danger}>{error.distrito}</p>
                </div>

                <div className={styles.form_input}>
                    <DatePicker selected={startDate} onChange={onChangeDate} locale = 'es' dateFormat = 'dd-MM-yyyy' minDate={date} 
                    />
                </div>
                <p></p>
                <div className={styles.form_input}>
                    <select
                        type="select" 
                        name='horario'
                        value={input.horario} 
                        onChange={onInputChange}>
                            <option value={'0'} >Elige tramo de horario de visita a domicilio</option>
                            {
                                rangeHour.map(hour => {
                                    return hour ? <option value={hour} key={hour}>{hour}</option> : ''
                                })
                            }
    
                    </select>
                    <p className={styles.danger}>{error.horario}</p>
                </div>

                <div className={styles.form_input}>
                    <input 
                        type="text" 
                        name='address'
                        value={input.address}
                        placeholder='Ingresar dirección' 
                        onChange={onInputChange} className={error.address && styles.danger}/>
                    <p className={styles.danger}>{error.address}</p>
                </div>

                <div className={styles.form_input}>
                    <textarea rows="3" placeholder='Referencias del lugar' value={input.referencia} onChange={onInputChange} type="textarea" name="referencia">
                    </textarea>
                </div>

                <div className={`${styles.form_input} ${styles.form_check}`}>
                    <input type="checkbox" name="checkbox" id="authorization" defaultChecked={checked} onChange={() => setChecked(!checked)}/>
                    <label htmlFor="authorization">Autorizo el envió de los resultados de los análisis a mi correo electrónico y vía WhatsApp.</label>
                    <p className={styles.danger}>{error.check}</p>
                </div>

                <button type="submit" className={styles.btn_order}>Enviar orden</button>
            </form>
        </div>
    );
}

export default Form;

export function validateInput (input){
    let error = {}
    if(input.name.length === 0){
      error.name = '* Nombre es requerido';
    }
    // if(!input.name){
    //   error.name = '* Nombre es requerido';
    // }else if(!/^[A-Za-z ]+$/.test(input.name)){
    //   error.name = '* Nombre es inválido, solo acepta letras';
    // }
    if(input.lastname.length ===0){
      error.lastname = '* Apellido es requerido';
    }
    // if(!input.lastname){
    //   error.lastname = '* Apellido es requerido';
    // }else if(!/^[A-Za-z ]+$/.test(input.lastname)){
    //   error.lastname = '* Apellido es inválido, solo acepta letras';
    // }
    if(!input.email){
      error.email = '* Email es requerido';
    }else if(!/\S+@\S+\.\S+/.test(input.email)){
      error.email = '* Email es inválido, ejm: prueba@gmail.com';
    }
    if(input.distrito === '0'){
      error.distrito = '* Seleccione un distrito';
    }
    if(input.horario === '0'){
      error.horario = '* Seleccione un distrito';
    }
    // if(!input.address){
    //     error.address = '* Dirección es requerida';
    // }else if(!/^[A-Za-z0-9 ]+$/.test(input.address)){
    //     error.address = '* Dirección es inválido';
    // }
    if(input.address.length ===0){
        error.address = '* Dirección es requerida';
    }
    if(!input.phone){
        error.phone = '* Celular es requerido';
    }else if(!/^[0-9]{9}/.test(input.phone)){
        error.phone = '* Celular es inválido';
    }
    return error;
}

export function getDistritos (){
    const distritos = [
        'San miguel','Santiago de Surco','Pueblo libre','Breña','Cercado','Magdalena','Jesus Maria','Miraflores','San isidro','Lince','San Borja ','La molina','Otros'];
    return distritos;
}