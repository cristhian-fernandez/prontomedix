import styles from  './Whatsapp.module.css';

function Whatsapp() {
    const onClick = ()=>{
        let text = '';
            text += `Hola! Prontomedix, quiero hacerles algunas consulta`;
            text += `. Muchas gracias! `;
            const encodeText = encodeURI(text);
            const urlWhatsapp = `https://api.whatsapp.com/send?phone=+51973485394&text=${encodeText}`;
            window.open(urlWhatsapp);
    }
    return (
        <div className={styles.whatsapp}>
            
            <button onClick={onClick}><i className="fa-brands fa-whatsapp"></i></button>
        </div>
    );
}

export default Whatsapp;