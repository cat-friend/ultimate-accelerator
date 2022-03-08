import { useState } from "react";
import { Modal } from "../../../context/Modal";
import DeleteMessageForm from "./DeleteMessageForm";
import { NavLink } from 'react-router-dom'

function DeleteMessageModal({ clanId, message }) {
    const [showModal, setShowModal] = useState(false);
    return (<>
        <NavLink onClick={() => setShowModal(true)} to="#">
            Delete
        </NavLink>
        {
            showModal &&
            (<Modal onClose={() => setShowModal(false)}>
                <DeleteMessageForm setShowModal={setShowModal} clanId={clanId} message={message} />
            </Modal>)
        }
    </>)
}

export default DeleteMessageModal;
