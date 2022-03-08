import { useState } from "react";
import { Modal } from "../../../context/Modal";
import EditMessageForm from "./EditMessageForm";
import { NavLink } from 'react-router-dom'

function EditMessageModal({ clan, message }) {
    const [showModal, setShowModal] = useState(false);
    return (<>

            <NavLink onClick={() => setShowModal(true)} to="#">
                Edit
            </NavLink>
        {
            showModal &&
            (<Modal onClose={() => setShowModal(false)}>
                <EditMessageForm setShowModal={setShowModal} clan={clan} message={message} />
            </Modal>)
        }
    </>)
}

export default EditMessageModal;
