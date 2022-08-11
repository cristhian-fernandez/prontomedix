import {
    GET_ALL_TESTS,
    SEARCH_TESTS,
    SEARCH_TESTS_EXAMEN,
    ADD_TO_CART,
    REMOVE_TO_CART,
    ADD_ONE_FROM_CART,
    REMOVE_ONE_FROM_CART,
    CLEAR_CART
} from "../constants/constants";

const initialState = {
    tests : [],
    allTests : [],
    search : false,
    // cart : []
    cart : JSON.parse(window.localStorage.getItem('cart') || '[]'),
};

const rootReducer = (state = initialState, action) => {
    const tests = [...state.allTests];
    
    switch(action.type) {
        
        case GET_ALL_TESTS:
            return {
                ...state,
                tests : [...action.payload],
                allTests : [...action.payload]
            } 

        case SEARCH_TESTS:
            const filteredTest = tests.filter(test => {
                return String(test.nombre_prueba).toLowerCase().includes(action.payload.toLowerCase());
            });
            const search = filteredTest.length > 0 ? false : true; 
            return {
                ...state,
                tests : filteredTest,
                search : search
            }   

        case SEARCH_TESTS_EXAMEN:
            let filteredTestExamen = [];
           
            if(parseInt(action.payload) === 0) filteredTestExamen = tests
            else{
                filteredTestExamen = tests.filter(test => {
                    return parseInt(test.examenMedicoId) === parseInt(action.payload)
                });
            }
            const searchExamen = filteredTestExamen.length > 0 ? false : true; 
            return {
                ...state,
                tests : filteredTestExamen,
                search : searchExamen
            }   

        case ADD_TO_CART:
            const addValue = [...state.cart, action.payload];
            window.localStorage.setItem('cart', JSON.stringify(addValue));
            return {
                ...state,
                cart : JSON.parse(window.localStorage.getItem('cart'))
            } 
            // return {
            //     ...state,
            //     cart : [...state.cart, action.payload]
            // } 
        case REMOVE_TO_CART:
            const removeValue = state.cart.filter(test => test.id !== action.payload);
            window.localStorage.setItem('cart', JSON.stringify(removeValue));
            return {
                ...state,
                cart : JSON.parse(window.localStorage.getItem('cart'))
            } 
            // return {
            //     ...state,
            //     cart : state.cart.filter(test => test.id !== action.payload)
            // } 
        case ADD_ONE_FROM_CART:
            const addOneCart = state.cart.find(test => test.id === action.payload)
            addOneCart.cantidad = addOneCart.cantidad + 1;
            return {
                ...state,
                cart : [...state.cart]
            } 
        case REMOVE_ONE_FROM_CART:
            const removeOneCart = state.cart.find(test => test.id === action.payload)
            if(removeOneCart.cantidad > 0) removeOneCart.cantidad = removeOneCart.cantidad - 1;
            return {
                ...state,
                cart : [...state.cart]
            }
        case CLEAR_CART:
            window.localStorage.setItem('cart', JSON.stringify([]));
            return {
                ...state,
                cart : []
            }
        default: return state;
    };
};

export default rootReducer;