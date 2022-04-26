import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header/Header";
import TrackInfo from "../components/TrackInfo/TrackInfo";
import { getTopTracksBasic } from "../Axios/fetches";
import { useRouter } from "next/router";
import { topTrackInterface } from "../interfaces";
import { checkTokenOrRedirect } from "../common";

const TopTracks: FC = () => {
  const [topTracks, setTopTracks] = useState<undefined | topTrackInterface[]>(
    undefined
  );
  const router = useRouter();

  useEffect(() => {
    checkTokenOrRedirect(router);
    getTopTracksBasic(setTopTracks);
  }, []);
  return (
    <div className="no-scrollbar no-srollbar no-scrollbar::-webkit-scrollbar">
      <Header />
      {}
      <div className="text-center text-xl font-roboto my-6">Top Tracks</div>
      <div className="flex flex-wrap justify-evenly">
        {topTracks
          ? topTracks.map((topTracksItem: topTrackInterface, index: number) => (
              <TrackInfo
                key={uuidv4()}
                trackName={topTracksItem.name}
                artistName={topTracksItem.artists[0].name}
                artistID={topTracksItem.artists[0].id}
                url={topTracksItem.album.images[0].url}
                songID={topTracksItem.id}
                position={index}
                album={topTracksItem.album.name}
                hrefTrack={topTracksItem.external_urls.spotify}
                hrefAlbum={topTracksItem.album.external_urls.spotify}
                hrefArtist={
                  topTracksItem.album.artists[0].external_urls.spotify
                }
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default TopTracks;
