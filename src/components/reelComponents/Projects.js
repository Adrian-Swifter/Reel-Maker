import React from "react";
import { Link } from "react-router-dom";

function Projects(props) {
  return (
    <div className="projects__container container">
      <div className="single__project">
        <Link
          to={{ pathname: "https://johnpaesano.com/?project=invincible" }}
          target="_blank"
        >
          <img
            src="https://i0.wp.com/johnpaesano.com/wp-content/uploads/2021/06/invincible.jpg?"
            alt=""
          />
        </Link>
      </div>
      <div className="single__project">
        <Link
          to={{
            pathname:
              "https://johnpaesano.com/?project=spider-man-miles-morales",
          }}
          target="_blank"
        >
          <img
            src="https://i0.wp.com/johnpaesano.com/wp-content/uploads/2020/10/Miles_004_P.jpg"
            alt=""
          />
        </Link>
      </div>
      <div className="single__project">
        <Link
          to={{ pathname: "https://johnpaesano.com/?project=tswkost" }}
          target="_blank"
        >
          <img
            src="https://i0.wp.com/johnpaesano.com/wp-content/uploads/2020/10/TSWK_004_P.jpg"
            alt=""
          />
        </Link>
      </div>
      <div className="single__project">
        <Link
          to={{
            pathname:
              "https://johnpaesano.com/?project=penny-dreadful-city-of-angels-official-series-soundtrack",
          }}
          target="_blank"
        >
          <img
            src="https://i0.wp.com/johnpaesano.com/wp-content/uploads/2020/10/PDCOA_004_P.jpg"
            alt=""
          />
        </Link>
      </div>
      <div className="single__project">
        <Link
          to={{
            pathname:
              "https://johnpaesano.com/?project=tesla-original-motion-picture-soundtrack",
          }}
          target="_blank"
        >
          <img
            src="https://i0.wp.com/johnpaesano.com/wp-content/uploads/2020/10/Tesla_005_P.jpg"
            alt=""
          />
        </Link>
      </div>
    </div>
  );
}

export default Projects;
