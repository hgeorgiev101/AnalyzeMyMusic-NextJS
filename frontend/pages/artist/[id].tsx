import { FC, useEffect, useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../../components/Header/Header";
import { getArtistInfo, getTopTracksByArtist } from "../../Axios/fetches";
import TrackInfo from "../../components/TrackInfo/TrackInfo";
import { GApageView } from "../../common";
import { artistInfo, tracks } from "../../interfaces";
import { useRouter } from "next/router";
import { checkTokenOrRedirect } from "../../common";

const Artist: FC = () => {
  const [artistInfo, setArtistInfo] = useState<undefined | artistInfo>(
    undefined
  );
  const [topTracksByArtist, setTopTracksByArtist] = useState<
    undefined | tracks
  >(undefined);
  const [refetch, setRefetch] = useState<boolean>(false);
  const router = useRouter();
  const params: any = router.query;

  useEffect(() => {
    GApageView(window.location.pathname);
    if (router) {
      checkTokenOrRedirect(router);
      getArtistInfo(setArtistInfo, params.id, setRefetch);
      getTopTracksByArtist(setTopTracksByArtist, params.id, setRefetch);
    }
  }, [refetch, router]);

  return (
    <div>
      <Header />
      {}
      {topTracksByArtist && (
        <div className="text-center text-xl font-roboto my-6">
          Top Tracks by {topTracksByArtist.tracks[0].artists[0].name}
        </div>
      )}

      <div className="flex flex-wrap justify-evenly">
        {topTracksByArtist
          ? topTracksByArtist.tracks.map(
              (topTracksItem: any, index: number) => (
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
              )
            )
          : null}
      </div>
    </div>
  );
};

export default Artist;
