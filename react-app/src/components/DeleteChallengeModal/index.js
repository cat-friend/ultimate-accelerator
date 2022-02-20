import React, { useEffect, useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink } from 'react-router-dom';
import DeleteChallengeForm from './DeleteChallengeForm';

function DeleteChallengeModal({ challenge }) {
    const [showModal, setShowModal] = useState(false);
    useEffect(() => {
        return () => setShowModal(false)
    }, [setShowModal])
    return (
        <>{console.log("inside delete modal return")}
            <NavLink
                onClick={(e) => {
                    e.preventDefault();
                    setShowModal(true);
                }}
                to=""
                className=''>
                <i className="fa-solid fa-trash"></i>
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
