export const GET_DYNAMIC_MODAL_DATA = 'GET_DYNAMIC_MODAL_DATA'

const initialState = {
    modalData: null
}

export function appReducer(state = initialState, action = {}) {
    
    switch (action.type) {
        case GET_DYNAMIC_MODAL_DATA:
            return {
                ...state,
                modalData: action.modalData
            }

        /*******************************************************/

        default:
            return state
    }
}