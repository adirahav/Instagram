import { GET_DYNAMIC_MODAL_DATA } from "../reducers/app.reducer.js"
import { store } from "../store.js"

export async function onToggleModal(modalData = null) {
    try {
        store.dispatch({
            type: GET_DYNAMIC_MODAL_DATA, 
            modalData
        })
    } catch(err) {
        console.log("Had issues loading modal data")
        throw err
    }
}


