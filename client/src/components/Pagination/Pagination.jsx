import React, { useEffect, useState } from 'react';
import styles from './Pagination.module.css';

function Pagination({countPage, page, setPage}) {
    
    const [input, setInput] = useState(1);
    const prevPage = () => {
        setInput(parseInt(input) - 1);
        setPage(parseInt(page) - 1);
    }

    const nextPage = () => {
        setInput(parseInt(input) + 1);
        setPage(parseInt(page) + 1);
    }

    const onChange = (e) => {
        console.log(e.target.value);
        setInput(e.target.value)
    }
    const onKeyDown = (e) => {
        if (e.keyCode === 13) { 
            if (parseInt(e.target.value)<1 || parseInt(e.target.value) > countPage || isNaN(parseInt(e.target.value))) {
                setPage(1);
                setInput(1);
            }else{
                setPage(parseInt(e.target.value));
            }
        }
    }

    useEffect(() => {
        setPage(1);
        setInput(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [countPage]);

    return (
        <div className={styles.pagination}>
            <button className={styles.pagination_arrow} onClick={prevPage} disabled={page === 1 || page < 1 }>❮</button>
            <input type="text" name="page" 
            value={input} 
            disabled
            className={styles.pagination_input} autoComplete="off" 
            onKeyDown={onKeyDown}
            onChange={onChange}/> de <span className={styles.pagination_dogs}>{countPage}</span>
            <button className={`${styles.pagination_arrow} ${styles.pagination_arrow__right}`} onClick={nextPage} disabled={page === countPage || page > countPage }>❯</button>
        </div>
    );
}

export default Pagination;