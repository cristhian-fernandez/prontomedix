const { Router } = require('express');
const {Prueba} = require('../db'); 
const axios = require('axios'); 
const { transporter } = require('../config/mailer');
const { getBodyEmail } = require('../controller/pruebaController');
// const { Op } = require('sequelize');
require('dotenv').config();
const router = Router();

//  http://localhost:3001/api/prueba/

router.get( '/' , async(req, res)=>{
    const {code} = req.query;
    try {
        if (code) {
            let prueba = await Prueba.findByPk(code);
            res.status(200).json(prueba);
        } else {
            let pruebas = await Prueba.findAll();
            res.status(200).json(pruebas);
        }
    } catch (error) {
        res.json(error.toString());
    }
});

router.get( '/examen' , async(req, res)=>{
    const {id} = req.query;
    const condition = {where: {"examenMedicoId":id}}
    try {
        if (id) {
            let prueba = await Prueba.findAll(condition);
            res.status(200).json(prueba);
        } else {
            res.json(error.toString());
        }
    } catch (error) {
        res.json(error.toString());
    }
});

router.post( '/' , async(req, res,next)=>{ 
    const { name, lastname,email,phone,distrito,address,cart,date,referencia, fecha_seleccionada, hora_seleccionada} = req.body;
    const bodyEmail = getBodyEmail(cart);
    try {
        if (name && lastname && email && phone && distrito && address && date) {
            await transporter.sendMail({
                from: '"ProntoMedix" <startupabastoz@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Pedido de Análisis Médico 💊", // 
                html: `
                    <b> Hola ${name} </b>
                    <div><b>Celular:</b> ${phone}</div>
                    <div><b>Distrito:</b> ${distrito}</div>
                    <div><b>Fecha entrega:</b> ${fecha_seleccionada}</div>
                    <div><b>Hora entrega:</b> ${hora_seleccionada}</div>
                    <div><b>Dirección:</b> ${address}</div>
                    <div><b>Referencia:</b> ${referencia}</div>
                    <div><b>Pedido:</b> ${bodyEmail}</div>
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