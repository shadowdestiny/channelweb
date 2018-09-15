export default (state = null, action) => {
    switch (action.type){
        case 'ADD_STATE':
            return action.value;
        default:
            return state;
    }
}
