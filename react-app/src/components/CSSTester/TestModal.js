import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import { NavLink } from 'react-router-dom';
import DeleteChallengeForm from '../DeleteChallengeModal/DeleteChallengeForm';

function TestModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>{console.log("inside modal return")}
            <button
                onClick={(e) => {
                    setShowModal(true);
                    console.log("showModal", showModal)
                }}
                to=""
                className=''>DELETE
                {/* <i className="fa-solid fa-trash"></i> */}
            </button>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteChallengeForm />
                    {/* <DeleteChallengeForm setShowModal={setShowModal} challenge={challenge} /> */}
                </Modal>
            )}
        </>
    );
}

export default TestModal;
