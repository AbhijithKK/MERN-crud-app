import { createStore } from 'redux'


const initialState = {
    refresh: true,
    user: { login: false },
    admin: { login: false }
}


const appReducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'refresh': return { ...prevState, refresh: !prevState.refresh }
        case 'user': return { ...prevState, user: action.payload }
        case 'admin': return { ...prevState, admin: action.payload }

        default: return prevState
    }
}

const Store = createStore(appReducer)
export default Store