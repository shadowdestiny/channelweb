import {createStore} from 'redux';
import Reducers from '../reducers/index';
/*const reducer = (state, action)=>{
    if (action.type ==="ADD") {
        return {
            ...state,
            register: state.register.concat(action.register)
        };
    }
    return state;
}*/

//export default createStore(reducer,{register:[]});
export default createStore(Reducers);