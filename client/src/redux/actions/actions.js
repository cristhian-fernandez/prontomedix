
import {
    GET_ALL_TESTS,
    SEARCH_TESTS,
    SEARCH_TESTS_EXAMEN,
    ADD_TO_CART,
    REMOVE_TO_CART,
    ADD_ONE_FROM_CART,
    REMOVE_ONE_FROM_CART,
    CREATE_CART,
    CLEAR_CART,
    EMAIL_SUSCRIBE
} from "../constants/constants";
import apiPruebas from './../../api/apiPruebas.json'

import axios from "axios";

// const urlTest = 'http://localhost:3001/api/tests';
const urlTest = 'https://bdprontomedix.herokuapp.com/api/tests';

// export const getAllTests = () => {
    
//     return async (dispatch) => {
//         axios.get(urlTest)
//         .then(responde => {
            
//             dispatch({
//                 type : GET_ALL_TESTS,
//                 payload : responde.data
//             })
//         })
//         .catch( e => console.log(e)); 
//     }
// }

export const getAllTests = () => {
    return async (dispatch) => {
      try {
        const response = apiPruebas;
        dispatch({
          type: GET_ALL_TESTS,
          payload: response.data.pruebas,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };


export const searchTests = (search) => {
    return {
        type : SEARCH_TESTS,
        payload : search
    }
}

export const searchTestsExamen = (search) => {
    return {
        type : SEARCH_TESTS_EXAMEN,
        payload : search
    }
}

export const addToCart = (test) => {
    return {
        type: ADD_TO_CART,
        payload : test
    }
}

export const removeToCart = (id) => {
    return {
        type: REMOVE_TO_CART,
        payload : id
    }
}

export const addOneFromCart = (id) => {
    return {
        type: ADD_ONE_FROM_CART,
        payload : id
    }
}
export const removeOneFromCart = (id) => {
    return {
        type: REMOVE_ONE_FROM_CART,
        payload : id
    }
}

export const createCart = (values) => {
    return async (dispatch) => {
        axios.post(urlTest, values)
        .then(responde => {
            dispatch({
                type : CREATE_CART,
                payload : responde.data
            })
        })
        .catch( e => console.log(e));
    }
}

export const suscribe = (values) => {
    return async (dispatch) => {
        axios.post(urlTest+'/suscribe', values)
        .then(responde => {
            dispatch({
                type : EMAIL_SUSCRIBE,
                payload : responde.data
            })
        })
        .catch( e => console.log(e));
    }
}
export const work = (values) => {
    return async () => {
        axios.post(urlTest+'/work', values)
        .catch( e => console.log(e)); 
    }
}

export const clearCart = () => {
    return {
        type: CLEAR_CART
    }
}