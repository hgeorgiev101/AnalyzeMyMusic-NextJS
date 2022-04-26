import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import { useEffect } from "react";
import { initGA } from "../common";
import { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    initGA();
  }, []);
  return (
    <>
      <Head>
        <title>Analyze My Music</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
