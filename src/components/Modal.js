import React, { useState } from "react";
import Button from "../components/Button";

const UploadModal = ({
  onChange,
  progress,
  makeFolder,
  modalStyle,
  handleTrackUpload,
  handleTrackTags,
  tags,
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
        onClick={handleVisibility}
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
        <input
          className="tag-input"
          type="text"
          onChange={handleTrackTags}
          placeholder="Enter track tags"
          value={tags}
        />
      </div>
      <Button
        buttonName="Upload"
        buttonIcon="file_upload"
        onClick={handleTrackUpload}
      />
    </div>
  );
};

export default UploadModal;
