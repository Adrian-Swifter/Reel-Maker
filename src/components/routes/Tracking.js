import useFirestore from "../../hooks/useFirestore";

function Tracking() {
  const { songs } = useFirestore("songs");
  console.log(songs);
  return (
    <div className="tracking">
      {songs &&
        songs.map((song) => (
          <audio controls key={song.id}>
            <source src={song.url}></source>
          </audio>
        ))}
    </div>
  );
}

export default Tracking;
