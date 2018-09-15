export default (state = null, action) => {
    switch (action.type){
        case 'inputTexts':
            return action.value;
        default:
            return state;
    }
}
