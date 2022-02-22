import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteClanForm from './DeleteClanForm';

function DeleteClanModal({clan}) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="button-div">
                <button type="button" onClick={() => setShowModal(true)}>
                    DELETE
                </button>
            </div>
            {
                showModal &&
                (<Modal onClose={() => setShowModal(false)}>
                    <DeleteClanForm setShowModal={setShowModal} clan={clan} />
                </Modal>)
            }
        </>
    );
}

export default DeleteClanModal;
