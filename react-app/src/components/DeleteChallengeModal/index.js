import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink } from 'react-router-dom';
import DeleteChallengeForm from './DeleteChallengeForm';

function DeleteChallengeModal({ challenge }) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>

                <button type="button" id="trash" onClick={() => setShowModal(true)}><i className="fa-solid fa-ban"></i></button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteChallengeForm setShowModal={setShowModal} challenge={challenge}/>
                </Modal>
            )}
        </>
    );
}

export default DeleteChallengeModal;
