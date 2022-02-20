import React, { useState } from "react";
import Button from "../components/Button";

const Modal = ({
  onChange,
  progress,
  makeFolder,
  modalStyle,
  handleTrackUpload,
  handleTrackTags,
}) => {
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
        <span className="mdc-text-field__ripple">Click below to type...</span>

        <input
          className="mdc-text-field__input"
          type="text"
          placeholder="Enter folder name"
          aria-labelledby="my-label-id"
          onChange={makeFolder}
        />
      </label>

      <div>
        <input className="file-input" type="file" onChange={onChange} />
        <progress value={progress} max="100"></progress>
      </div>
      <div>
        <input className="tag-input" type="text" onChange={handleTrackTags} />
      </div>
      <button
        className="mdc-button mdc-button--raised"
        onClick={handleTrackUpload}
      >
        <span className="mdc-button__ripple"></span>
        <i className="material-icons mdc-button__icon" aria-hidden="true">
          upload
        </i>
        <span className="mdc-button__label">Upload</span>
      </button>
    </div>
  );
};

export default Modal;
