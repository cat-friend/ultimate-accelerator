import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditClanForm from './EditClanForm';

function EditClanModal({clan}) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="button-div">
                <button type="button" onClick={() => setShowModal(true)}>
                    EDIT
                </button>
            </div>
            {
                showModal &&
                (<Modal onClose={() => setShowModal(false)}>
                    <EditClanForm setShowModal={setShowModal} clan={clan} />
                </Modal>)
            }
        </>
    );
}

export default EditClanModal;
