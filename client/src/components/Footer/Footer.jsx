import React, { Component } from 'react';
import styles from './Footer.module.css';

class Footer extends Component {
    render() { 
        return (
            <div className={styles.footer}>
                <span className={styles.copyright}>
                    Copyright © 2023 | Prontomedix.com
                </span>

                <div className={styles.social}>
                    <a href="https://www.facebook.com/prontomedix" target='_blank' rel='noreferrer'>
                        <span className={styles.linkedin}><i className="fa-brands fa-facebook"></i></span>
                    </a>
                    <a href="https://instagram.com/prontomedix" target='_blank' rel='noreferrer'>
                        <span className={styles.linkedin}><i className="fa-brands fa-instagram"></i></span>
                    </a>
                    <a href="https://www.linkedin.com/company/prontomedix" target='_blank' rel='noreferrer'>
                        <span className={styles.linkedin}><i className="fa-brands fa-linkedin"></i></span>
                    </a>
                    <a href="." target='_blank' rel='noreferrer'>
                        <span className={styles.linkedin}><i className="fa-brands fa-tiktok"></i></span>
                    </a>
                </div>
            </div>
        );
    }
}
 
export default Footer;
