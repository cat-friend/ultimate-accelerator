import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink } from 'react-router-dom';
import DeleteChallengeForm from './DeleteChallengeForm';

function DeleteChallengeModal({ challenge }) {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        return () => setShowModal(true)
    }, [showModal])
    return (
        <>
            <NavLink
                onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                }}
                to=""
                className=''>
                <i className="fa-solid fa-ban"></i>
            </NavLink>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteChallengeForm setShowModal={setShowModal} challenge={challenge}/>
                </Modal>
            )}
        </>
    );
}

export default DeleteChallengeModal;
