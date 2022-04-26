import React, { FC, useEffect } from "react";
import { GApageView } from "../common/index";

const Login: FC = () => {
  var generateRandomString = function (length: number) {
    let text = "";
    let possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  let url = "https://accounts.spotify.com/authorize?";

  const state = generateRandomString(16);
  const scope =
    "user-read-private user-read-email user-top-read user-read-recently-played streaming user-read-playback-state user-modify-playback-state playlist-modify-public playlist-modify-private user-library-read user-library-modify";
  const client_id: undefined | string = process.env.REACT_APP_CLIENT_ID;
  const redirect_uri: undefined | string = process.env.REACT_APP_REDIRECT_URI;

  const j = {
    response_type: "code",
    client_id: client_id as string,
    scope: scope,
    redirect_uri: redirect_uri as string,
    state: state,
    show_dialog: "true",
  };

  url += new URLSearchParams(j).toString();

  useEffect(() => {
    GApageView(window.location.pathname);
  }, []);

  return (
    <div className="relative h-screen w-screen flex flex-col">
      <div className="relative z-30 h-1/2 w-full flex flex-col items-center justify-around font-roboto">
        <p className="text-4xl text-white text-center">
          Welcome to{" "}
          <span className="font-bold text-indigo-400">Analyze My Music!</span>
        </p>
        <p className="text-xl px-5 lg:text-xl text-white text-center">
          Get interactive beautiful insights on your music history in Spotify
        </p>
      </div>

      <div className="relative z-30 h-2/5 w-full flex flex-col justify-between items-center">
        <div>
          <a href={url}>
            <button className="mx-auto h-14 w-24 px-8 py-4 hover:w-32 rounded-xl hover:rounded-3xl text-white bg-gray-400 hover:text-black hover:bg-indigo-400 transition-all duration-200 ease-linear flex justify-center items-center font-roboto">
              Login
            </button>
          </a>
          <p className="mt-10 text-md text-center font-roboto text-white">
            Only for Premium Spotify users
          </p>
        </div>
        <p className="text-lg text-center font-roboto text-white">
          Created by{" "}
          <span className="font-bold text-indigo-400">
            <a href="https://github.com/hgeorgiev101">Hristo Georgiev</a>
          </span>{" "}
          and{" "}
          <span className="font-bold text-indigo-400">
            <a href="https://github.com/davidfurrer">David Furrer</a>
          </span>
        </p>
      </div>
      <video
        loop
        autoPlay
        muted
        playsInline
        className="-left-96 fixed z-10 w-auto min-w-full min-h-full max-w-none lg:left-0"
      >
        <source src={"/login.mp4"} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="w-screen h-screen fixed left-0 top-0 backdrop-filter backdrop-grayscale backdrop-blur-sm backdrop-contrast-400 z-20"></div>
    </div>
  );
};

export default Login;
