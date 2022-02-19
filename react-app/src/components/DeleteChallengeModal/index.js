import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink } from 'react-router-dom';
import DeleteChallengeForm from './DeleteChallengeForm';

function DeleteChallengeFormModal() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <NavLink
                onClick={() => setShowModal(true)}
                to="#"
                className=''>
                <i className="fa-solid fa-trash"></i>
            </NavLink>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteChallengeForm setShowModal={setShowModal} />
                </Modal>
            )}
        </>
    );
}

export default DeleteChallengeFormModal;
