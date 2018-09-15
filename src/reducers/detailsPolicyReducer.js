export default (state = null, action) => {
    switch (action.type){
        case 'ADD':
            return action.value;
        default:
            return state;
    }
}
