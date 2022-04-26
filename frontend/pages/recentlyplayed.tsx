import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header/Header";
import TrackInfo from "../components/TrackInfo/TrackInfo";
import { getRecentlyPlayed } from "../Axios/fetches";
import { GApageView } from "../common";
import { checkTokenOrRedirect } from "../common";
import { trackInfo } from "../interfaces";
import { useRouter } from "next/router";

interface recentlyPlayedItemInterface {
  track: trackInfo;
  context: any;
  played_at: string;
}

const RecentlyPlayed: FC = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState<
    undefined | recentlyPlayedItemInterface[]
  >(undefined);
  const router = useRouter();

  useEffect(() => {
    GApageView(window.location.pathname);
    checkTokenOrRedirect(router);
    getRecentlyPlayed(setRecentlyPlayed);
  }, []);
  console.log(recentlyPlayed);
  return (
    <div>
      <Header />
      {}
      <div className="text-center text-xl font-roboto my-6">
        Recently Played Tracks
      </div>
      <div className="flex flex-wrap justify-evenly">
        {recentlyPlayed
          ? recentlyPlayed.map(
              (
                recentlyPlayedItem: recentlyPlayedItemInterface,
                index: number
              ) => (
                <TrackInfo
                  key={uuidv4()}
                  trackName={recentlyPlayedItem.track.name}
                  artistName={recentlyPlayedItem.track.artists[0].name}
                  artistID={recentlyPlayedItem.track.artists[0].id}
                  url={recentlyPlayedItem.track.album.images[0].url}
                  songID={recentlyPlayedItem.track.id}
                  position={index}
                  album={recentlyPlayedItem.track.album.name}
                  hrefTrack={recentlyPlayedItem.track.external_urls.spotify}
                  hrefAlbum={
                    recentlyPlayedItem.track.album.external_urls.spotify
                  }
                  hrefArtist={
                    recentlyPlayedItem.track.album.artists[0].external_urls
                      .spotify
                  }
                />
              )
            )
          : null}
      </div>
    </div>
  );
};

export default RecentlyPlayed;
