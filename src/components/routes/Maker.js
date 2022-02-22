import { useState } from "react";
import Tracks from "../routes/Tracks";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minWidth: "500px",
  },
};

Modal.setAppElement("#root");

function Maker() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="maker">
      <h1>Maker</h1>
      <button onClick={openModal}>Add Tracks</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Maker Modal"
      >
        <Tracks />
      </Modal>
    </div>
  );
}

export default Maker;
