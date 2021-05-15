import Tracks from "../routes/Tracks";

function Maker({ reelSongs }) {
  console.log(reelSongs);
  return (
    <div className="maker">
      <h1>Maker</h1>
      <Tracks />
    </div>
  );
}

export default Maker;
