import { FC } from "react";
import { useRouter } from "next/router";
import spotifyIcon from "../../static/spotify-icon.png";
import Image from "next/image";

interface ArtistInfoProps {
  artistName: string;
  url: string;
  artistID: string;
  position?: number;
  artistURL: string;
}

const ArtistInfo: FC<ArtistInfoProps> = (props) => {
  const router = useRouter();

  const handleArtistClick = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    router.push(`/artist/${props.artistID}`);
  };

  return (
    <div className="w-1/3 h-1/3 lg:w-60 lg:h-80 m-3 cursor-pointer font-roboto">
      <img src={props.url} alt="artist pic" onClick={handleArtistClick} />
      <div className="">Artist Name:</div>
      <div className="flex items-center">
        <div onClick={handleArtistClick} className="">
          {props.artistName}{" "}
        </div>
        <a href={props.artistURL} className="flex-shrink-0 ml-auto">
          <Image
            className="cursor-pointer transform object-scale-down scale-50 "
            src={spotifyIcon}
            alt="spotify-icon"
          />
        </a>
      </div>

      {/* <div className="lg:hidden text-center">{props.artistName}</div> */}
    </div>
  );
};

export default ArtistInfo;
