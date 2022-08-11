import React, { useState } from 'react';
import { useDispatch} from 'react-redux';
import { addToCart} from '../../redux/actions/actions';
import styles from './TestCard.module.css';

function TestCard(props) {
    const dispatch = useDispatch();
    const onClickAddCart = (e) => {
        const cartStorage = JSON.parse(window.localStorage.getItem('cart') || '[]');
        e.preventDefault();
        const test = props.tests.find(test => test.id === props.id);
        const addtest = {
            id: test.id,
            nombre_prueba: test.nombre_prueba,
            precio: test.precio,
            descripcion: test.descripcion,
            cantidad: 1
        }
        const testCart = cartStorage.find(test => test.id === props.id);

        if (!testCart) {
            dispatch(addToCart(addtest));
            props.arrayCart.push(addtest);
        }
    }
    
    const addButton = <button className={styles.add} onClick={onClickAddCart}>Agregar</button>;
    const [btnCart] = useState(addButton);
    return (        
        <div>
            {
                
                props.id ? <div >
                    <div className={styles.testCard}>
                        <div className={styles.testCard_item}>
                            <i className="fa-solid fa-circle-plus"></i>
                            <div>
                                <div className={styles.testCard_descripcion}>
                                    <h2>{props.nombre}</h2>
                                    {
                                        props.descripcion !== null ? <p>Incluye: ({props.descripcion})</p> : ''
                                    }
                                </div>
                                <p>S/ {props.precio} Soles</p>
                            </div>
                        </div>
                        <div className={styles.testCard_item}>{btnCart}</div>
                    </div>
                </div> : ''
            }
        </div>
    );
}

export default TestCard;