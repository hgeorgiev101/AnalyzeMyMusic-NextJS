import { FC } from "react";

interface TrackInfoProps {
  trackName: string;
  artistName: string;
  url: string;
  songID: string;
  trackPlaylistSelect: Function;
  artistID: string;
  uri?: string;
  spotify?: boolean;
  selectedInSearch?: string;
  externalTrackUri: string;
  externalArtistUri: string;
  externalAlbumUri: string;
  albumName: string;
  selectedInPlaylist?: string;
}

const PlaylistTrackInfo: FC<TrackInfoProps> = (props) => {
  return (
    <div
      className={`w-11/12 h-24 mx-2 my-5 px-2 flex items-center font-roboto cursor-pointer ${
        props.selectedInSearch === props.songID
          ? `bg-indigo-200 rounded-xl`
          : `bg-transparent`
      }
      ${
        props.selectedInPlaylist === props.songID
          ? `bg-indigo-200 rounded-xl`
          : `bg-transparent`
      }`}
      onClick={
        props.spotify
          ? () => props.trackPlaylistSelect(props.uri, props.songID)
          : () => props.trackPlaylistSelect(props.artistID, props.songID)
      }
    >
      {" "}
      <a
        href={props.externalTrackUri}
        target="_blank"
        className="flex-shrink-0"
      >
        <img
          className="h-16 w-16 cursor-pointer"
          src={props.url}
          alt="Song artwork"
        />
      </a>
      <div className="flex flex-col justify-center mx-2 cursor-pointer">
        <div>Track: {props.trackName}</div>
        <div>Artist: {props.artistName}</div>
        <div>Album: {props.albumName}</div>
      </div>
      <div className="flex-shrink-0 h-full ml-auto flex flex-col items-center justify-evenly">
        <a href={props.externalTrackUri} target="_blank">
          <img
            src="../static/spotify-icon.png"
            className="w-6 h-6 cursor-pointer object-contain"
          ></img>
        </a>
        <a href={props.externalArtistUri} target="_blank">
          <img
            src="../static/spotify-icon.png"
            className="w-6 h-6 cursor-pointer object-contain"
          ></img>
        </a>
        <a href={props.externalAlbumUri} target="_blank">
          <img
            src="../static/spotify-icon.png"
            className="w-6 h-6 cursor-pointer object-contain"
          ></img>
        </a>
      </div>
    </div>
  );
};

export default PlaylistTrackInfo;
