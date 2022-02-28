import React from "react";
import { Link } from "react-router-dom";

function About(props) {
  return (
    <div className="about__container">
      <div className="about__description">
        <p>
          John Paesano is a BAFTA-winning, Emmy nominated composer, producer,
          conductor, and arranger for film, television, video games and records.
          John studied under Professor Sally Dow Miller of Conservatoire de
          Paris, and continued his studies at Berklee College of Music focusing
          on composition.
        </p>
        <p>
          On his path to creating film scores of his own, he worked for some of
          the industry’s most prestigious composers, including Jerry Goldsmith
          and John Williams. Some of Paesano’s notable credits include 20th
          Century Fox Maze Runner Trilogy, Marvel’s Daredevil, Defenders and
          PlayStation highly acclaimed Spider-Man.
        </p>
        <p>
          He won a World Soundtrack Award for his score to the well-received
          young adult adaptation of The Maze Runner, before going on to complete
          the trilogy, creating equally impressive scores for The Scorch Trials
          and The Death Cure. He also received seven Best Score nominations for
          PlayStation’s Spider-Man and won an Annie Award for Best Music for his
          work on DreamWorks’ animated series Dragons: Riders of Berk, based on
          the Academy Award winning film How To Train Your Dragon.
        </p>
        <p>
          His recent feature, series, and game credits include John Logan’s
          (Gladiator, Aviator) Penny Dreadful: City Of Angels, Michael Alymereda
          Tesla (Ethan Hawke), and Yuval Adlers WWII thriller, The Secrets We
          Keep (Niomi Rapace). He recently recorded the music for Marvel’s
          forthcoming Avengers Campus at Disneyland and his next release is
          PlayStation 5 flagship Miles Morales game, with production and
          remixing by Boi-1da while finishing up season one of Invincible, the
          upcoming adult animated superhero drama series, based on the comic
          book character of the same name by Robert Kirkman (Walking Dead) set
          to premiere on Amazon Prime Video in 2021
        </p>
      </div>

      <ul>
        <li>
          <Link to="https://open.spotify.com/artist/3MhnTc9AODdRGMrtntEqIz">
            Spotify
          </Link>
        </li>
        <li>
          <Link to="https://www.imdb.com/name/nm1373352/">Imdb</Link>
        </li>
      </ul>
    </div>
  );
}

export default About;
