import { FC } from "react";
import { useRouter } from "next/router";
import spotifyIcon from "../../static/spotify-icon.png";
import Image from "next/image";

interface TrackInfoProps {
  trackName: string;
  artistName: string;
  url: string;
  songID: string;
  artistID: string;
  position: number;
  album: string;
  hrefTrack: string;
  hrefAlbum: string;
  hrefArtist: string;
}

const TrackInfo: FC<TrackInfoProps> = (props) => {
  const router = useRouter();

  const handleSongClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push(`/song/${props.songID}`);
  };

  const handleArtistClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    router.push(`/artist/${props.artistID}`);
  };

  return (
    <div className="w-1/3 h-1/3 lg:w-1/6 lg:h-1/6 m-3 cursor-pointer">
      <img src={props.url} alt="" onClick={handleSongClick} />
      <div className="hidden font-roboto text-gray-700 lg:flex cursor-pointer items-center">
        <div onClick={handleSongClick}>{` ${props.trackName}`} </div>

        <a href={props.hrefTrack} className="flex-shrink-0 ml-auto">
          <Image
            className="cursor-pointer transform object-scale-down scale-50 "
            src={spotifyIcon}
            alt="spotify-icon"
          />
        </a>
      </div>
      <div className="hidden  font-roboto text-gray-500 lg:flex cursor-pointer items-center">
        <div>{props.album}</div>
        <a href={props.hrefAlbum} className="flex-shrink-0 ml-auto">
          <Image
            className="cursor-pointer transform object-scale-down scale-50 "
            src={spotifyIcon}
            alt="spotify-icon"
          />
        </a>
      </div>
      <div className="hidden  font-roboto text-blue-500 lg:flex cursor-pointer items-center">
        <div onClick={handleArtistClick}>{props.artistName}</div>
        <a href={props.hrefArtist} className="flex-shrink-0 ml-auto">
          <Image
            className="cursor-pointer transform object-scale-down scale-50 "
            src={spotifyIcon}
            alt="spotify-icon"
          />
        </a>
      </div>

      <div className="flex  text-sm font-roboto text-gray-700 lg:hidden cursor-pointer items-center">
        <div onClick={handleSongClick}>{props.trackName}</div>
        <a href={props.hrefTrack} className="flex-shrink-0 ml-auto">
          <Image
            className="cursor-pointer transform object-scale-down scale-50 "
            src={spotifyIcon}
            alt="spotify-icon"
          />
        </a>
      </div>
      <div className="flex  font-roboto text-gray-500 lg:hidden cursor-pointer items-center">
        <div onClick={handleArtistClick}>{props.album}</div>
        <a href={props.hrefAlbum} className="flex-shrink-0 ml-auto">
          <Image
            className="cursor-pointer transform object-scale-down scale-50 "
            src={spotifyIcon}
            alt="spotify-icon"
          />
        </a>
      </div>
      <div className="flex  text-sm font-roboto text-blue-500 lg:hidden cursor-pointer items-center">
        <div onClick={handleArtistClick}>{props.artistName}</div>
        <a href={props.hrefArtist} className="flex-shrink-0 ml-auto">
          <Image
            className="cursor-pointer transform object-scale-down scale-50 "
            src={spotifyIcon}
            alt="spotify-icon"
          />
        </a>
      </div>
    </div>
  );
};

export default TrackInfo;
