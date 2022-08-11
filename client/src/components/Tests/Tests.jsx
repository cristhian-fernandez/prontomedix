import TestCard from "../TestCard/TestCard";
import loading from '../../img/loading.gif';
import styles from  './Tests.module.css';

function Tests(props) {
    const arrayCart = [];
    if (props.tests.length !== 0) {
        return (
            
            <div>
                {
                    props.tests && props.tests.map(test => {
                        return (
                            <TestCard 
                                key = {test.id}
                                id = {test.id}
                                nombre = {test.nombre_prueba}
                                precio = {test.precio}
                                tests = {props.tests}
                                descripcion = {test.descripcion}
                                arrayCart = {arrayCart}
                            />
                        );
                    })
                }
            </div>
        );
    } else{
        if (props.tests.length === 0 && props.search) {
            return(
                <div className={styles.center}>
                    <h2>Pruebe con otra búsqueda ...</h2>
                </div> 
            )
        } else {
            return(
                <div className={styles.center}>
                    <img src={loading} alt="pruebas" />
                </div> 
            )
        }
    }
}

export default Tests;