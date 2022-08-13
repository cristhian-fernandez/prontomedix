import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTests } from '../../redux/actions/actions';
import Tests from "../../components/Tests/Tests";
import Pagination from '../../components/Pagination/Pagination';
import styles from  './Home.module.css';
import SearchBar from '../../components/SearchBar/searchBar';
import Cart from '../../components/Cart/Cart';

import agendar from '../../img/agendar.png';
import datos_personales from '../../img/datos_personales.png';
import muestras from '../../img/muestras.png';
import resultados from '../../img/resultados.png';
import Whatsapp from '../../components/Whatsapp/Whatshap';

function Home() {
    const tests = useSelector((state) => state.tests);
    const search = useSelector((state) => state.search);
    const [page, setPage] = useState(1);
    const byPage = 6;
    
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllTests());
    }, [dispatch]);

    let countPage = Math.ceil(tests.length / byPage);

    let testByPageMin = (page - 1)*byPage;
    let testByPageMax = (page - 1)*byPage + byPage;
    const testsByPage = tests.slice(testByPageMin,testByPageMax);

    return (
        <div className={styles.home}>
            <div className={styles.body}>
                <h1 className={styles.tittle}>Agenda tu análisis clínico de laboratorio a domicilio en segundos</h1>
                <h2 className={styles.description}>Evita perder tiempo en las colas, tramites, no corras riesgos de contagios y contaminacion en clinicas, laboratorios y aglomeraciones</h2>
                <div className={`${styles.seccion_center} ${styles.bottom_30} ${styles.top_30}`}>
                    <a className={styles.btn_cotiza} href="#agrega">Cotiza y agenda ya</a>
                </div>
                <h2 className={styles.subtittle}>¿Cómo Funciona ?</h2>
                <div className={styles.seccion}>
                    <div className={styles.seccion_works}>
                        <p>Elige tus pruebas,agéndalo, llena tus datos y dirección.</p>
                        <img src={agendar} alt="agendar" />
                    </div>
                    <div className={styles.seccion_works}>
                        <p>En minutos recibe la foto y datos personales del personal tomador de muestra que te visitará.</p>
                        <img className={styles.seccion_works_img} src={datos_personales} alt="agendar" />
                    </div>
                    <div className={styles.seccion_works}>
                        <p>En la hora indicada , te tomaremos la muestra en minutos.</p>
                        <img className={styles.seccion_works_img} src={muestras} alt="agendar" />
                    </div>
                    <div className={styles.seccion_works}>
                        <p>Recibe tus resultados ese mismo día vía correo y whatsapp.</p>
                        <img className={`${styles.seccion_works_img} ${styles.seccion_works_result}`} src={resultados} alt="agendar" />
                        <div id='agrega'></div>
                    </div>
                </div>
            </div>
            
            <div className={styles.seccion_center}>
                <p className={`${styles.seccion_texto} ${styles.seccion_text_search}`}>Busca y agrega los análisis que deseas cotizar y agendar, si estas de acuerdo llena los datos y envía el pedido:</p>
            </div>
            <div className={styles.center}>
                <SearchBar />
            </div>
            
            <Tests tests={testsByPage} search={search}/>
            <div className={styles.center}>
                <Pagination page={page} setPage={setPage} countPage={countPage}  />
            </div>
            <Cart />

            <div className={`${styles.seccion_orderMedica} ${styles.bottom_30}`}>
                <p className={`${styles.seccion_texto} ${styles.inline} ${styles.btn_receta}`}>¿ No encuentras tu análisis? y tienes orden médica (opcional): </p>
                <a className={styles.btn_ordenMedica} href="https://api.whatsapp.com/send?phone=+51913452643&text=Buenas%20Prontomedix,%20quiero%20adjuntar%20mi%20receta%20m%C3%A9dica." target='_blank' rel="noreferrer" >Agéndalo Aquí</a>
                
            </div>
            <div className={styles.text_agendar}>
                <p>
                    ¿Necesitas ayuda para agendar?
                </p>
                <p>
                    Llámanos al <a href='tel:+51913452643' className={styles.phone}> <i className='fa-solid fa-phone'></i>+51913452643</a>
                </p>   
                <p>
                    O escríbenos al Whatsapp 
                    <Whatsapp />
                </p>
            
            </div>
            
        </div>
    );
}

export default Home;