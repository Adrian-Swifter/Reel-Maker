import React from "react";
import Button from "../components/Button";

function Login({
  login,
  setLoginEmail,
  setLoginPassword,
  user,
  loginEmail,
  loginPassword,
}) {
  return (
    <div className="login container">
      {user ? (
        <h1>Home</h1>
      ) : (
        <>
          <h1>Login</h1>

          <form onSubmit={(e) => login(e)}>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              onChange={(e) => setLoginEmail(e.target.value)}
              value={loginEmail}
            />
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              onChange={(e) => setLoginPassword(e.target.value)}
              value={loginPassword}
            />

            <Button buttonName="Login" buttonIcon="login" />
          </form>
        </>
      )}
    </div>
  );
}

export default Login;
