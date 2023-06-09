import React, { useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import axios from "axios";

export default function Auth() {
  const { username, setUsername, secret, setSecret, email, setEmail } =
    useContext(Context);

  const router = useRouter();

  function onSubmit(e) {
    e.preventDefault();

    if (username.length === 0 || secret.length === 0) {
      console.log(username);
      console.log(secret);
      return;
    }

    //this is how we are creating users

    axios
      .put(
        "https://api.chatengine.io/users/",
        { username, secret, email },
        {
          headers: {
            "Private-key": `${process.env.NEXT_PUBLIC_PRIVATE_KEY}`,
          },
        }
      )
      .then((r) => router.push("/chats"));
  }

  return (
    <div className="background">
      <div className="auth-container">
        <form
          className="auth-form"
          autoComplete="off"
          onSubmit={(e) => onSubmit(e)}
        >
          <div className="auth-title">Therapist.ai</div>
          <div className="input-container">
            <input
              autoComplete="false"
              placeholder="Username"
              className="text-input"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              autoComplete="false"
              placeholder="email"
              className="text-input"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <input
              autoComplete="flase"
              type="password"
              placeholder="Password"
              className="text-input"
              onChange={(e) => setSecret(e.target.value)}
            />
          </div>
          <button type="submit" className="submit-button">
            LogIn / Resgister
          </button>
        </form>
      </div>
    </div>
  );
}
