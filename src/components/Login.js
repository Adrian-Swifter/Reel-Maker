import React from "react";

function Login({
  login,
  setLoginEmail,
  setLoginPassword,
  user,
  loginEmail,
  loginPassword,
}) {
  return (
    <div className="container">
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
            <button>Login</button>
          </form>
        </>
      )}
    </div>
  );
}

export default Login;
