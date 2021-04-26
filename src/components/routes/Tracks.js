import { app } from "../../firebase_storage";
import { useState } from "react";

function Tracks() {
  const [value, setValue] = useState("");
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  const makeFolder = (e) => {
    setValue(e.target.value);
  };

  const onChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child(`${value}/` + file.name);
    fileRef.put(file).on(
      "state_changed",
      (snapshot) => {
        let percentage =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await fileRef.getDownloadURL();
        setUrl(url);
        console.log(url)
      }
    );
  };

  return (
    <div className="tracks">
      <h1>Tracks</h1>
      <input type="text" onChange={makeFolder} />
      <input type="file" onChange={onChange} />
      <progress value={progress} max="100"></progress>
      <audio controls>
        <source src={url} type="audio/ogg"></source>
      </audio>
    </div>
  );
}

export default Tracks;
