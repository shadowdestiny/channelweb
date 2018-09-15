import {combineReducers} from 'redux';
import detailsInspection from './detailsReduser';
import detailsSinester from './detailsSinesterReduser';
import detailsEvent from './detailsReduserEvent';
import detailsPolicy from './detailsPolicy';
import stateComponentReducer from './stateComponentResucer';
export default combineReducers({
    detailsInspection: () => detailsInspection(),
    detailsSinester: () => detailsSinester(),
    detailsEvent: detailsEvent,
    detailsPolicyReducer: detailsPolicy,
    stateComponentReducer
});