import React from "react";
import Button from "../components/Button";

const Modal = ({ onChange, progress, makeFolder }) => {
  return (
    <div className="modal">
      <Button buttonName="New Folder" buttonIcon="create_new_folder" />
      <label className="mdc-text-field mdc-text-field--filled">
        <span classname="mdc-text-field__ripple"></span>

        <input
          className="mdc-text-field__input"
          type="text"
          aria-labelledby="my-label-id"
          onChange={makeFolder}
        />
        <span className="mdc-line-ripple"></span>
      </label>

      <div>
        <input className="file-input" type="file" onChange={onChange} />
        <progress value={progress} max="100"></progress>
      </div>
    </div>
  );
};

export default Modal;
