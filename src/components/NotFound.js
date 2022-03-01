import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const unset = setTimeout(() => {
      setLoaded(true);
    }, 2500);
    return () => {
      clearTimeout(unset);
    };
  });
  return (
    <div className="not-found">
      <h1>{loaded ? "404 - Not Found!" : "Loading..."}</h1>
      <Link to="/login">Go Home</Link>
    </div>
  );
};
export default NotFound;
