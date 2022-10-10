import { useDispatch, useSelector } from "react-redux";
import { addOneFromCart, removeOneFromCart, removeToCart } from "../../redux/actions/actions";
import Form from "../Form/Form";
import styles from './Cart.module.css';

function Cart() {
    const cart = useSelector((state) => state.cart);
    const monto_agregado = 40;
    let subtotal = 0;
    const dispatch = useDispatch();
    const onClickPlus = (id) => {
        dispatch(addOneFromCart(id));
    }
    const onClickMinus = (id) => {
        dispatch(removeOneFromCart(id));  
    }

    const onClickDelete = (id) => {
        dispatch(removeToCart(id));  
    }

    return (
        <div id="cart">
            <h2 className={styles.tittleCart}>Análisis agregados al carrito</h2>
            {
                cart.map(test => {
                    return (<div key={test.id}>
                        <div className={styles.testCard}>
                            <div className={styles.testCard_item}>
                                <span className={styles.delete} onClick={()=> {onClickDelete(test.id)}}><i className="fa-solid fa-trash"></i></span>
                                <div>
                                    <h2>{test.nombre_prueba}</h2>
                                    {
                                        test.descripcion !== null ? <p>Incluye: ({test.descripcion})</p> : ''
                                    }
                                    <p>S/ {test.precio} Soles</p>
                                </div>
                            </div>

                            <div className={styles.testCard_item}>
                                <button className={styles.plus} onClick={()=> {onClickPlus(test.id)}} ><i className="fa-solid fa-plus"></i></button>
                                <span className={styles.count}>{test.cantidad}</span>
                                <button className={styles.minus} onClick={()=> {onClickMinus(test.id)}} ><i className="fa-solid fa-minus"></i></button>
                            </div>
                        </div>
                        <span className={styles.none}>{subtotal = subtotal + test.precio*test.cantidad}</span>
                    </div>)
                })
            }
            <div className={styles.bodyResumeCart}>
                <div className={styles.resumeCart}>
                    <h1 className={styles.tittleResume}>Resumen de tu compra</h1>
                    <div className={styles.subtittleResume}><h2> Subtotal: </h2><span>S/.{subtotal}.00</span></div>
                    <div className={styles.subtittleResume}><h2> Toma de Muestra:</h2><span>S/.{monto_agregado}.00</span></div>
                    <div className={styles.totalResume}><h2> Monto a pagar:</h2><span>S/.{subtotal + monto_agregado}.00</span></div>
                </div>
                <Form pagoTotal={subtotal + monto_agregado}/>
            </div>
        </div>
    );
}

export default Cart;