let INITIAL_STATE= {
    todo: '',
    todos: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state, todo: action.payload
            }
        case 'RENDER_TODOS':
            return {
                ...state, todos: action.payload
            }
            
        default:
            return state
    }
}