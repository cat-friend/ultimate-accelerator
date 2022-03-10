import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import InboxMessages from './InboxMessages';

function InboxModal({userId}) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="button-div">
                <button type="button" onClick={() => setShowModal(true)}>
                <i className="fa-regular fa-envelope"></i>
                </button>
            </div>
            {
                showModal &&
                (<Modal onClose={() => setShowModal(false)}>
                    <InboxMessages setShowModal={setShowModal} userId={userId} />
                </Modal>)
            }
        </>
    );
}

export default InboxModal;
