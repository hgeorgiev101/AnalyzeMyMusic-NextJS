import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/static/analyzemymusic-logo.png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;500;700&display=swap"
            rel="stylesheet"
          ></link>
          <meta charSet="utf-8" />
          <meta
            name="description"
            content="Analysis of your listening history within the Spotify App using the Spotify API. Custom playlist creation is also supported."
          />
          <meta name="og:type" property="og:type" content="website" />
          <meta
            name="og:title"
            property="og:title"
            content="Analyze My Music"
          />
          <meta
            name="og:description"
            property="og:description"
            content="Analysis of your listening history within the Spotify App using the Spotify API. Custom playlist creation is also supported."
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
