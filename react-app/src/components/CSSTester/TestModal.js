import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteChallengeForm from '../DeleteChallengeModal/DeleteChallengeForm';

function TestModal() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <button
                onClick={(e) => {
                    setShowModal(true);
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
