const { Router } = require('express');
// const {Prueba} = require('../db'); 
const axios = require('axios'); 
const { transporter } = require('../config/mailer');
const { getBodyEmail } = require('../controller/pruebaController');
// const { Op } = require('sequelize');
require('dotenv').config();
const router = Router();

//  http://localhost:3001/api/prueba/

// router.get( '/' , async(req, res)=>{
//     const {code} = req.query;
//     try {
//         if (code) {
//             let prueba = await Prueba.findByPk(code);
//             res.status(200).json(prueba);
//         } else {
//             let pruebas = await Prueba.findAll();
//             res.status(200).json(pruebas);
//         }
//     } catch (error) {
//         res.json(error.toString());
//     }
// });

// router.get( '/examen' , async(req, res)=>{
//     const {id} = req.query;
//     const condition = {where: {"examenMedicoId":id}}
//     try {
//         if (id) {
//             let prueba = await Prueba.findAll(condition);
//             res.status(200).json(prueba);
//         } else {
//             res.json(error.toString());
//         }
//     } catch (error) {
//         res.json(error.toString());
//     }
// });

router.post( '/' , async(req, res,next)=>{ 
    const { name, lastname,email,phone,distrito,address,cart,date,referencia, fecha_seleccionada, hora_seleccionada} = req.body;
    const bodyEmail = getBodyEmail(cart);
    try {
        if (name && lastname && email && phone && distrito && address && date) {
            await transporter.sendMail({
                from: '"ProntoMedix" <prontomedix@gmail.com>', // sender address
                to: `${email}, prontomedix@gmail.com`, // list of receivers
                subject: "Pedido de Análisis Clínico 🔬🩸🧪", // 
                html: `
                    <b> Hola ${name} ${lastname}</b>
                    <div><b>Celular:</b> ${phone}</div>
                    <div><b>Distrito:</b> ${distrito}</div>
                    <div><b>Fecha de cita:</b> ${fecha_seleccionada}</div>
                    <div><b>Hora de cita:</b> ${hora_seleccionada}</div>
                    <div><b>Dirección:</b> ${address}</div>
                    <div><b>Referencia:</b> ${referencia}</div>
                    <div><b>Pedido de análisis clínico:</b> ${bodyEmail}</div>
                    <div>
                        <input style="margin-top: 10px" type="checkbox" name="checkbox" checked>
                        <label>Autorizo el envió de los resultados de los análisis a mi correo electrónico y vía WhatsApp.</label>
                    </div>
                    <div style="margin-top: 15px">En minutos le estaremos enviando los datos del personal que le visitara para la toma de muestra en la fecha y hora que indico. Gracias por preferir Prontomedix!</div>
                `
            });
            console.log('pedido hecho');
        }else{
            throw new Error('Falta ingresar algún dato');
        }
    } catch (error) {
        next(error);
    }
});
router.post( '/suscribe' , async(req, res,next)=>{ 
    const { email} = req.body;
    try {
        if (email) {
            await transporter.sendMail({
                from: '"ProntoMedix" <prontomedix@gmail.com>', // sender address
                to: `${email}, prontomedix@gmail.com`,
                subject: "Gracias por suscribirte 📨", // 
                html: `
                    <div>Gracias por sumarte a nuestra comunidad donde tendrás información valiosa sobre bienestar, salud y más .</div>
                `
            });
            console.log('mensaje enviado');
        }else{
            throw new Error('Falta ingresar algún dato');
        }
    } catch (error) {
        next(error);
    }
});
router.post( '/work' , async(req, res,next)=>{ 
    const { name, lastname,email,phone,distrito,carrera} = req.body;
    try {
        if (name && lastname && email && phone && distrito && carrera) {
            await transporter.sendMail({
                from: '"ProntoMedix" <prontomedix@gmail.com>', // sender address
                to: `${email}, prontomedix@gmail.com`, // list of receivers
                subject: "Solicitud de afiliación a prontomedix🔬", // 
                html: `
                    <b> Hola ${name} </b>

                    <div>Te has inscrito al formulario de ProntoMedix con los siguientes datos:</div>
                    <div><b>Nombre Completo:</b> ${name} ${lastname}</div>
                    <div><b>Email:</b> ${email}</div>
                    <div><b>Celular:</b> ${phone}</div>
                    <div><b>Distrito:</b> ${distrito}</div>
                    <div><b>Carrera:</b> ${carrera}</div>

                    <div style="margin-top: 15px">Gracias  por enviar tu solicitud de afiliarte a nuestro equipo de salud , en breve te estaremos contactando para conocernos en una entrevista y podamos contarte el detalle de ser parte de Prontomedix.</div>
                `
            });
            console.log('pedido hecho');
        }else{
            throw new Error('Falta ingresar algún dato');
        }
    } catch (error) {
        next(error);
    }
});

module.exports = router;