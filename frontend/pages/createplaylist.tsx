import { FC, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getGenreSeeds,
  searchTracks,
  getRecommendations,
  getUserInfo,
  savePlaylistToSpotify,
} from "../Axios/fetches";
import Header from "../components/Header/Header";
import PlaylistTrackInfo from "../components/PlaylistTrackInfo";
import Select from "react-select";
import SpotifyPlayer from "react-spotify-web-playback";
import { GApageView, checkTokenOrRedirect } from "../common";
import { useRouter } from "next/router";
import { trackInfo, userInfo } from "../interfaces";

interface genres {
  value: string;
  label: string;
}

const Createplaylist: FC = () => {
  const router = useRouter();

  const [artistSearchString, setArtistSearchString] = useState<string>("");
  const [trackInfo, setTrackInfo] = useState<undefined | trackInfo[]>(
    undefined
  );
  const [genreSeeds, setGenreSeeds] = useState<undefined | genres[]>(undefined);
  const [selectedGenres, setSelectedGenres] = useState<any>([]);
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [selectedSong, setSelectedSong] = useState<string>("");
  const [selectedSongInList, setSelectedSongInList] = useState<string>("");
  const [acousticness, setAcousticness] = useState<string>("0.5");
  const [danceability, setDanceability] = useState<string>("0.5");
  const [energy, setEnergy] = useState<string>("0.5");
  const [instrumentalness, setInstrumentalness] = useState<string>("0.5");
  const [liveness, setLiveness] = useState<string>("0.5");
  const [popularity, setPopularity] = useState<string>("50");
  const [speechiness, setSpeechiness] = useState<string>("0.5");
  const [playlistRecommendations, setPlaylistRecommendations] = useState<
    undefined | trackInfo[]
  >(undefined);
  const [playlistName, setPlaylistName] = useState<string>("");
  const [userInfo, setUserInfo] = useState<undefined | userInfo>(undefined);
  const [token, setToken] = useState<any>(undefined);
  const [spotifyPlayerURI, setSpotifyPlayerURI] = useState<string>("");
  const [selectSongInPlaylist, setSongInPlaylist] = useState<string>("");
  const [popUpMenu, setPopUpMenu] = useState<undefined | string>(undefined);
  const [stage, setStage] = useState<number>(1);

  const selectArtistAndSong = (artistID: string, songID: string): void => {
    setSelectedArtist(artistID);
    setSelectedSong(songID);
    setSelectedSongInList(songID);
  };

  const selectAndPlaySongInPlaylist = (uri: string, songID: string) => {
    setSpotifyPlayerURI(uri);
    setSongInPlaylist(songID);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    switch (event.target.name) {
      case "artistSearch":
        setArtistSearchString(event.target.value);
        searchTracks(setTrackInfo, artistSearchString);
        break;
      case "acousticness":
        setAcousticness(event.target.value);
        break;
      case "danceability":
        setDanceability(event.target.value);
        break;
      case "energy":
        setEnergy(event.target.value);
        break;
      case "instrumentalness":
        setInstrumentalness(event.target.value);
        break;
      case "liveness":
        setLiveness(event.target.value);
        break;
      case "popularity":
        setPopularity(event.target.value);
        break;
      case "speechiness":
        setSpeechiness(event.target.value);
        break;
      case "playlistName":
        setPlaylistName(event.target.value);
        break;
      default:
        console.log("default");
    }
  };

  const createPlaylist = (): void => {
    if (selectedSong && selectedArtist && selectedGenres) {
      getRecommendations(
        setPlaylistRecommendations,
        selectedSong,
        selectedArtist,
        selectedGenres,
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        popularity,
        speechiness
      );
      setSongInPlaylist("");
    } else if (!selectedSong || !selectedArtist) {
      setPopUpMenu("Please select a song first!");
    }
  };

  const createPlaylistForBigScreen = (): void => {
    if (selectedSong && selectedArtist && selectedGenres) {
      getRecommendations(
        setPlaylistRecommendations,
        selectedSong,
        selectedArtist,
        selectedGenres,
        acousticness,
        danceability,
        energy,
        instrumentalness,
        liveness,
        popularity,
        speechiness
      );
      setSongInPlaylist("");
      setStage(2);
    } else if (!selectedSong || !selectedArtist) {
      setPopUpMenu("Please select a song first!");
    }
  };

  const savePlaylist = (): void => {
    if (playlistName && userInfo && playlistRecommendations) {
      const tracksURIs: string[] = [];
      playlistRecommendations.forEach((track: trackInfo) =>
        tracksURIs.push(track.uri)
      );
      savePlaylistToSpotify(
        playlistName,
        userInfo.id,
        tracksURIs,
        setPopUpMenu
      );
    } else if (!playlistName) {
      setPopUpMenu("Please enter a playlist name first!");
    }
  };

  useEffect(() => {
    GApageView(window.location.pathname);
    setToken(sessionStorage.getItem("analyze-music-token"));
    checkTokenOrRedirect(router);
    getGenreSeeds(setGenreSeeds);
    getUserInfo(setUserInfo);
  }, []);

  return (
    <div className="h-screen w-screen overflow-x-hidden">
      <Header />
      <div className="h-auto lg:h-5/6 px-1 lg:px-4 w-full flex flex-col sm:hidden">
        <div className="h-3/5 w-full flex flex-col lg:flex-row">
          <div className="h-96 w-full flex flex-col lg:block lg:flex-none lg:w-1/2 my-6 overflow-y-auto">
            <label className="font-roboto w-full lg:w-38 flex flex-col items-center lg:block">
              Search for a track:{" "}
              <input
                type="text"
                name="artistSearch"
                className="shadow-lg font-roboto h-10 lg:h-8 w-11/12 lg:w-1/2 my-4 lg:my-0 border-2 rounded-md p-2"
                value={artistSearchString}
                onChange={handleChange}
              />
            </label>
            {trackInfo ? (
              <p className="font-roboto my-4 text-center lg:text-left">
                Select one of the following tracks:
              </p>
            ) : null}
            {trackInfo ? (
              trackInfo.map((track: trackInfo) => (
                <PlaylistTrackInfo
                  key={uuidv4()}
                  trackName={track.name}
                  artistName={track.artists[0].name}
                  url={track.album.images[0].url}
                  songID={track.id}
                  trackPlaylistSelect={selectArtistAndSong}
                  artistID={track.artists[0].id}
                  selectedInSearch={selectedSongInList}
                  externalTrackUri={track.external_urls.spotify}
                  externalArtistUri={track.artists[0].external_urls.spotify}
                  externalAlbumUri={track.album.external_urls.spotify}
                  albumName={track.album.name}
                />
              ))
            ) : (
              <div className="h-4/5 w-full lg:w-1/2 my-6 lg:my-0 flex justify-center items-center font-roboto">
                <div>Please search for a track first...</div>
              </div>
            )}
          </div>
          <div className="h-full w-full lg:w-1/2 my-2 flex flex-col items-center font-roboto">
            <div className="h-2/5 lg:h-1/5 w-full flex flex-col lg:flex-row items-center">
              {genreSeeds ? (
                <Select
                  defaultValue={selectedGenres}
                  onChange={setSelectedGenres}
                  isMulti
                  name="colors"
                  options={genreSeeds}
                  className="basic-multi-select w-11/12 lg:w-3/5 m-2 shadow-lg"
                  classNamePrefix="select"
                  placeholder="Select genre(s)..."
                />
              ) : null}
              <button
                className="h-14 w-36 lg:w-24 px-0 lg:px-8  py-0 lg:py-4 mx-6 my-2 lg:my-0 hover:py-8 rounded-xl hover:rounded-3xl text-white hover:text-black bg-gray-400 hover:bg-indigo-400 transition-all duration-200 ease-linear flex justify-center items-center font-roboto"
                onClick={() => createPlaylist()}
              >
                Create Playlist
              </button>
            </div>
            <div className="h-4/5 w-full my-4 lg:my-0 flex flex-col justify-evenly">
              <label className="w-11/12 mx-2 my-3 lg:my-0 lg:mx-0 lg:w-3/5 flex items-center justify-between">
                Acousticness
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={acousticness}
                  name="acousticness"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Danceability
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={danceability}
                  name="danceability"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Energy
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={energy}
                  name="energy"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Instrumentalness
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={instrumentalness}
                  name="instrumentalness"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Liveness
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={liveness}
                  name="liveness"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Popularity
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={popularity}
                  name="popularity"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Speechiness
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={speechiness}
                  name="speechiness"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
            </div>
          </div>
        </div>
        <div className="h-1/2 w-full flex flex-col lg:flex-row">
          <div className="h-full w-full lg:w-2/5 flex flex-col justify-center font-roboto">
            {playlistRecommendations ? (
              <label className="mx-2 lg:mx-0 text-center lg:text-left">
                Playlist Name:{" "}
                <input
                  type="text"
                  name="playlistName"
                  className="shadow-lg font-roboto h-10 w-11/12 m-3 lg:m-0 lg:h-8 lg:w-96 border-2 rounded-md p-2"
                  value={playlistName}
                  onChange={handleChange}
                />
              </label>
            ) : null}
            {playlistRecommendations ? (
              <button
                className="h-14 w-24 px-8 py-4 my-6 rounded-xl hover:rounded-3xl text-white hover:text-black bg-gray-400 hover:bg-indigo-400 transition-all duration-200 ease-linear flex justify-center items-center font-roboto self-center"
                onClick={() => savePlaylist()}
              >
                Save
              </button>
            ) : null}
            {playlistRecommendations ? (
              <div className="w-full block lg:hidden text-center">
                Select a Playlist track to play it
                <SpotifyPlayer
                  token={token as string}
                  uris={spotifyPlayerURI}
                  showSaveIcon={true}
                />
              </div>
            ) : null}
          </div>
          <div className="h-full w-full flex lg:hidden flex-col overflow-x-hidden overflow-y-auto no-scrollbar">
            {playlistRecommendations ? (
              <p className="font-roboto my-2 text-center">
                Suggested Playlist:
              </p>
            ) : null}
            {playlistRecommendations
              ? playlistRecommendations.map((track: trackInfo) => (
                  <PlaylistTrackInfo
                    key={uuidv4()}
                    trackName={track.name}
                    artistName={track.artists[0].name}
                    url={track.album.images[0].url}
                    songID={track.id}
                    trackPlaylistSelect={selectAndPlaySongInPlaylist}
                    artistID={track.artists[0].id}
                    uri={track.uri}
                    spotify={true}
                    selectedInPlaylist={selectSongInPlaylist}
                    externalTrackUri={track.external_urls.spotify}
                    externalArtistUri={track.artists[0].external_urls.spotify}
                    externalAlbumUri={track.album.external_urls.spotify}
                    albumName={track.album.name}
                  />
                ))
              : null}
          </div>
        </div>
      </div>
      {popUpMenu ? (
        <div
          className="h-screen w-screen fixed top-0 left-0 bg-black bg-opacity-50 flex justify-center items-center cursor-pointer z-50"
          onClick={() => setPopUpMenu(undefined)}
        >
          <div className="p-6 w-60 rounded-xl bg-indigo-600 text-white flex justify-center items-center text-center flex-wrap z-50">
            {popUpMenu}
          </div>
        </div>
      ) : null}
      {stage === 1 ? (
        <div className="h-5/6 px-4 w-full hidden sm:flex font-roboto overflow-y-hidden">
          <div className="h-full w-1/2 hidden sm:flex flex-col my-4 overflow-y-auto no-scrollbar">
            <label className="w-full lg:w-38 flex flex-col items-center lg:block">
              Search for a track:{" "}
              <input
                type="text"
                name="artistSearch"
                className="shadow-lg font-roboto h-10 lg:h-8 w-11/12 lg:w-1/2 my-4 lg:my-0 border-2 rounded-md p-2"
                value={artistSearchString}
                onChange={handleChange}
              />
            </label>
            {trackInfo ? (
              <p className="font-roboto my-4 text-center lg:text-left">
                Select one of the following tracks:
              </p>
            ) : null}
            {trackInfo ? (
              trackInfo.map((track: trackInfo) => (
                <PlaylistTrackInfo
                  key={uuidv4()}
                  trackName={track.name}
                  artistName={track.artists[0].name}
                  url={track.album.images[0].url}
                  songID={track.id}
                  trackPlaylistSelect={selectArtistAndSong}
                  artistID={track.artists[0].id}
                  selectedInSearch={selectedSongInList}
                  externalTrackUri={track.external_urls.spotify}
                  externalArtistUri={track.artists[0].external_urls.spotify}
                  externalAlbumUri={track.album.external_urls.spotify}
                  albumName={track.album.name}
                />
              ))
            ) : (
              <div className="h-4/5 w-full lg:w-1/2 my-6 lg:my-0 flex justify-center items-center font-roboto">
                <div>Please search for a track first...</div>
              </div>
            )}
          </div>
          <div className="h-full w-1/2 my-1 flex flex-col items-center">
            {genreSeeds ? (
              <Select
                defaultValue={selectedGenres}
                onChange={setSelectedGenres}
                isMulti
                name="colors"
                options={genreSeeds}
                className="basic-multi-select w-2/3 m-3 shadow-lg"
                classNamePrefix="select"
                placeholder="Select genre(s)..."
              />
            ) : null}
            <div className="h-4/6 w-full flex flex-col justify-evenly items-center">
              <label className="w-11/12 mx-2 my-3 lg:my-0 lg:mx-0 lg:w-3/5 flex items-center justify-between">
                Acousticness
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={acousticness}
                  name="acousticness"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Danceability
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={danceability}
                  name="danceability"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Energy
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={energy}
                  name="energy"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Instrumentalness
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={instrumentalness}
                  name="instrumentalness"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Liveness
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={liveness}
                  name="liveness"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Popularity
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="10"
                  value={popularity}
                  name="popularity"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
              <label className="w-11/12 mx-2 lg:mx-0 my-3 lg:my-0 lg:w-3/5 flex items-center justify-between">
                Speechiness
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={speechiness}
                  name="speechiness"
                  onChange={handleChange}
                  className="w-1/2"
                />
              </label>
            </div>
            <div className="flex">
              <button
                className="h-14 w-24 px-8 py-4 mx-6 my-2 lg:my-0 rounded-xl text-white hover:text-black bg-gray-400 hover:bg-indigo-400 transform transition-all duration-200 ease-linear flex justify-center items-center font-roboto hover:scale-110"
                onClick={() => createPlaylistForBigScreen()}
              >
                Create Playlist
              </button>
            </div>
          </div>
        </div>
      ) : null}
      {stage === 2 ? (
        <div className="h-5/6 px-4 w-full hidden sm:flex font-roboto overflow-y-hidden">
          <div className="h-full w-1/2 hidden sm:flex flex-col my-4">
            {playlistRecommendations ? (
              <p className="my-2">Suggested Playlist:</p>
            ) : null}
            <div className="overflow-x-hidden overflow-y-auto no-scrollbar h-auto">
              {playlistRecommendations
                ? playlistRecommendations.map((track: trackInfo) => (
                    <PlaylistTrackInfo
                      key={uuidv4()}
                      trackName={track.name}
                      artistName={track.artists[0].name}
                      url={track.album.images[0].url}
                      songID={track.id}
                      trackPlaylistSelect={selectAndPlaySongInPlaylist}
                      artistID={track.artists[0].id}
                      uri={track.uri}
                      spotify={true}
                      selectedInPlaylist={selectSongInPlaylist}
                      externalTrackUri={track.external_urls.spotify}
                      externalArtistUri={track.artists[0].external_urls.spotify}
                      externalAlbumUri={track.album.external_urls.spotify}
                      albumName={track.album.name}
                    />
                  ))
                : null}
            </div>
          </div>
          <div className="h-full w-1/2 my-1 flex flex-col items-center justify-center font-roboto">
            {playlistRecommendations ? (
              <label className="text-center lg:text-left">
                Playlist Name:{" "}
                <input
                  type="text"
                  name="playlistName"
                  className="shadow-lg h-8 w-96 border-2 rounded-md p-2"
                  value={playlistName}
                  onChange={handleChange}
                />
              </label>
            ) : null}
            <div className="my-5">Select a Playlist track to play it</div>
            {token && spotifyPlayerURI && stage === 2 ? (
              <div className="w-3/4 my-2">
                <SpotifyPlayer
                  token={token as string}
                  uris={spotifyPlayerURI}
                  showSaveIcon={true}
                />
              </div>
            ) : null}
            <div className="my-2 flex">
              {playlistRecommendations ? (
                <button
                  className="h-14 w-24 px-8 py-4 mx-6 my-2 lg:my-0 rounded-xl text-white hover:text-black bg-gray-400 hover:bg-indigo-400 transform transition-all duration-200 ease-linear flex justify-center items-center font-roboto hover:scale-110"
                  onClick={() => setStage(1)}
                >
                  Go Back
                </button>
              ) : null}
              {playlistRecommendations ? (
                <button
                  className="h-14 w-24 px-8 py-4 mx-6 my-2 lg:my-0 rounded-xl text-white hover:text-black bg-gray-400 hover:bg-indigo-400 transform transition-all duration-200 ease-linear flex justify-center items-center font-roboto hover:scale-110"
                  onClick={() => savePlaylist()}
                >
                  Save
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Createplaylist;
