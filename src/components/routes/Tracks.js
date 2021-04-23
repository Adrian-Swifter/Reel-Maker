import { app } from "../../firebase_storage";

function Tracks() {
  const onChange = (e) => {
    const file = e.target.files[0];
    const storageRef = app.storage().ref();
    const fileRef = storageRef.child("whatevs/" + file.name);
    fileRef.put(file).then(() => {
      console.log("File uploaded");
    });
  };

  return (
    <div className="tracks">
      <h1>Tracks</h1>
      <input type="text" />
      <input type="file" onChange={onChange} />
    </div>
  );
}

export default Tracks;
