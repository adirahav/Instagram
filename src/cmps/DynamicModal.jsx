import { useDispatch, useSelector } from "react-redux"
import { GET_DYNAMIC_MODAL_DATA } from "../store/reducers/app.reducer"
import { useEffect, useRef } from "react"

export function DynamicModal() {
    const modalData = useSelector((storeState) => storeState.appModule.modalData)
    const dispatch = useDispatch()
    const modalRef = useRef()

    useEffect(() => {

        if (modalData) {
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside)
            }, 0)
        }

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }

    }, [modalData])

    if (!modalData) return <></>

    const Cmp = modalData?.cmp

    function onCloseModal() {
        modalData.props.onCloseModal()
        dispatch({ type: GET_DYNAMIC_MODAL_DATA, modalData: null })
    }

    function handleClickOutside(ev) {
        if (modalRef.current && !modalRef.current.contains(ev.target)) {
            onCloseModal()
        }
    }
    
    const modalType = `dynamic-modal ${modalData.props.type}`

    return (
        <div ref={modalRef} className={modalType}>
            {Cmp && <Cmp {...modalData.props} />}
            {/*<CloseIcon.default />*/}
        </div>
    )
}