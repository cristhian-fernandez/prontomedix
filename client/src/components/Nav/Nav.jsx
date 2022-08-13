import React from 'react';
import { Link} from 'react-router-dom';
import styles from  './Nav.module.css';
import logo from '../../img/logo_prontomedicx.png';
import { useSelector } from 'react-redux';

function Nav() {

    const cart = useSelector((state) => state.cart);
    return ( 
        
        <div className={styles.nav}>
            <nav className="navbar bg-light fixed-top">
                <div className="container-fluid">
                    <picture>
                        <Link to='/'><img src={logo} alt="logo_prontomedicx" /></Link>
                    </picture>
                    <div className={styles.nav_right}>
                        <a href="#cart">Canasta</a>
                        <span className={styles.favorites}>
                            <a href="#cart"><i className="fa-solid fa-cart-shopping"></i></a>
                        </span>
                        <span className={styles.count_favorites}>{cart.length}</span>

                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                            <div className="offcanvas-header">
                                <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href='/' >Inicio</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/quienesomos">¿Quienes Somos?</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/trabajaconnosotros">Trabaja con nosotros</a>
                                </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

        </div>
        
    );
}

export default Nav;