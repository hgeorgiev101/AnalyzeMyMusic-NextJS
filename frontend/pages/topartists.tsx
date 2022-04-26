import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Header from "../components/Header/Header";
import { getTopArtistsBasic } from "../Axios/fetches";
import ArtistInfo from "../components/ArtistInfo";
import { topArtistInterface } from "../interfaces";
import { checkTokenOrRedirect } from "../common";
import { useRouter } from "next/router";

const TopArtists: FC = () => {
  const [topArtists, setTopArtists] = useState<
    undefined | topArtistInterface[]
  >(undefined);
  const router = useRouter();

  useEffect(() => {
    checkTokenOrRedirect(router);
    getTopArtistsBasic(setTopArtists);
  }, []);

  console.log(topArtists);

  return (
    <div>
      <Header />
      {}
      <div className="text-center text-xl my-6 font-roboto">Top Artists</div>
      <div className="flex flex-wrap justify-evenly">
        {topArtists
          ? topArtists.map((artist: topArtistInterface, index: number) => (
              <ArtistInfo
                key={uuidv4()}
                position={index}
                artistName={artist.name}
                url={artist.images[0].url}
                artistID={artist.id}
                artistURL={artist.external_urls.spotify}
              />
            ))
          : null}
      </div>
    </div>
  );
};

export default TopArtists;
