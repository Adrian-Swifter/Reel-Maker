import { useState, useEffect } from "react";
import { app } from "../firebase/firebase_storage";

const useFirestore = (collection) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const unsub = app
      .firestore()
      .collection(collection)
      .onSnapshot((snap) => {
        let songsArr = [];
        snap.forEach((song) => {
          songsArr.push({ ...song.data(), id: song.id });
        });
        setSongs(songsArr);
      });

    return () => unsub();
  }, [collection]);

  return { songs };
};

export default useFirestore;
