import { useState } from "react";
import { Link } from "react-router-dom";
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
    minWidth: "700px",
  },
};

Modal.setAppElement("#root");

function Maker({ user }) {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="maker container">
      {user ? (
        <>
          <h1>Maker</h1>
          <button onClick={openModal}>Add Tracks</button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Maker Modal"
          >
            <Tracks user={user} />
          </Modal>
        </>
      ) : (
        <div>
          Please log in to see this page <Link to="/">Login</Link>
        </div>
      )}
    </div>
  );
}

export default Maker;
