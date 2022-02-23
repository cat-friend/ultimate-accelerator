import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import AddChallengeForm from './AddChallengeForm';

function AddChallengeFormModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className='add'>Add Card</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <AddChallengeForm payload={setShowModal}/>
        </Modal>
      )}
    </>
  );
}

export default AddChallengeFormModal;
