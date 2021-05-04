import React, { useState } from "react";
import Button from "../components/Button";

const Modal = ({ onChange, progress, makeFolder, modalStyle }) => {
  const [visibility, setVisibility] = useState(false);

  const handleVisibility = () => {
    setVisibility(!visibility);
  };
  return (
    <div className={`modal ${modalStyle ? "show" : ""}`}>
      <Button
        buttonName="New Folder"
        buttonIcon="create_new_folder"
        handleVisibility={handleVisibility}
        visibility={visibility}
      />
      <br />

      <label
        className={`mdc-text-field mdc-text-field--filled ${
          visibility ? "" : "hide"
        }`}
      >
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
      <Button buttonName="Upload" buttonIcon="publish"/>
    </div>
  );
};

export default Modal;
