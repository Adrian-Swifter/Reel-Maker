import useFirestore from "../../hooks/useFirestore";

function Tracking() {
  const { songs } = useFirestore("songs");
  console.log(songs);
  return (
    
    <div class="main__container">
        <div class="left__section">
        {songs &&
        songs.map((song) => (
          <div class="folder">
            <div class="icon__holder">
              <i class="material-icons mdc-button__icon" aria-hidden="true"
                >folder</i
              >
            </div>
            <div class="text__and_menu">
              <div class="folder__text_container">
                <h3 class="folder__title">{song.folder}</h3>
                <div class="num__of_tracks_container">
                  <span class="num__of_tracks">361</span> tracks
                </div>
              </div>
              <div class="kebab__menu_container">
                <i class="material-icons mdc-button__icon" aria-hidden="true"
                  >more_vert</i
                >
              </div>
            </div>
          </div>
          ))}
          </div>
      <div className="songs">
      {songs &&
        songs.map((song) => (
          <audio controls key={song.id}>
            <source src={song.url}></source>
          </audio>
        ))}
      </div>
     
    </div>
  );
}

export default Tracking;
