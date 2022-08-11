import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchTests, searchTestsExamen } from '../../redux/actions/actions';
import styles from  './searchBar.module.css';

function SearchBar() {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    const onInputChange = (e) => {
        dispatch(searchTests(search));
        setSearch(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
    }

    const onClickExamen = (id) => {
        dispatch(searchTestsExamen(id));  
        const classSelected = document.getElementsByClassName('selected');
        const idSelected = document.getElementById('selected_'+id);
        for (let i = 0; i < classSelected.length; i++) {
            classSelected[i].classList.remove('selected');
        }
        idSelected.classList.add("selected");
        setSearch('');
    }

    return (
        <div>
            <form id='searchBar' onSubmit={onSubmit}>
                <div className={styles.searchBar}>
                    <input type="text" name='search' value={search} placeholder='Buscar análisis médico ...' onChange={onInputChange} className={styles.input_text}/>
                    <input type="submit" value="Buscar" className={styles.input_btn}/>
                </div>
            </form>
            <div className={styles.etiquetas}>
                <span onClick={()=> {onClickExamen(0)}} id='selected_0' >Todos</span>
                <span onClick={()=> {onClickExamen(1)}} id='selected_1' >Análisis de sangre</span>
                <span onClick={()=> {onClickExamen(2)}} id='selected_2' >Análisis de orina</span>
                <span onClick={()=> {onClickExamen(4)}} id='selected_4' >Análisis Covid 19</span>
                <span onClick={()=> {onClickExamen(3)}} id='selected_3' >Otros</span>
                <span onClick={()=> {onClickExamen(5)}} id='selected_5' >Perfiles</span>
            </div>
        </div>
    );
}

export default SearchBar;