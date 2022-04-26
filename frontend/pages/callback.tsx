import React, { FC } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Callback: FC = () => {
  const router = useRouter();

  const client_id: undefined | string = process.env.REACT_APP_CLIENT_ID;
  const client_secret: undefined | string = process.env.REACT_APP_CLIENT_SECRET;

  const getToken = (): void => {
    const redirect_uri: string | undefined = process.env.REACT_APP_REDIRECT_URI;
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    const code = params.code;

    const url = "https://accounts.spotify.com/api/token";

    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          new Buffer(client_id + ":" + client_secret).toString("base64"),
      },
    };

    const body = new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirect_uri as string,
    });

    axios
      .post(url, body, config)
      .then((response) => {
        sessionStorage.setItem(
          "analyze-music-token",
          response.data.access_token
        );
        router.push("/home");
      })
      .catch((error) => console.log(error));
  };

  useEffect(getToken, []);

  return <div></div>;
};

export default Callback;
