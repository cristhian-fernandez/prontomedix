const getBodyEmail = (cart) => {
    let body = '';
    let subtotal = 0;
    let toma = 35;
    cart.map(pedido => {
        subtotal += pedido.precio;
        body += `<div style='margin-left: 30px;'><b>Prueba:</b> ${pedido.nombre_prueba}</div>
                 <div style='margin-left: 30px;'><b>Precio:</b> S/ ${pedido.precio}.00</div>
                 <div style='margin-left: 30px;'><b>Cantidad:</b> ${pedido.cantidad}</div>
                 <div style='margin-left: 30px;'>---------------------------</div>
                `
    });
    body += `<div style='margin-left: 30px;'><b>Subtototal:</b> S/ ${subtotal}.00</div>`
    body += `<div style='margin-left: 30px;'><b>Toma de Muestra:</b> S/ ${toma}.00</div>`
    body += `<div style='margin-left: 30px;'><b>MONTO A PAGAR:</b> S/ ${subtotal + toma}.00</div>`
    return body;
}

module.exports = {
    getBodyEmail,
}