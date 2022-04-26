import Axios from "./index";

export const getTopArtists = (
  setState?: any,
  artistsRangeSelector?: any,
  artistsLimitSelector?: any,
  setRefetch?: any,
  rerender?: any
) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get(
    `me/top/artists?time_range=${artistsRangeSelector}&limit=${artistsLimitSelector}&offset=0`,
    config
  )
    .then((response: any) => {
      if (setRefetch) {
        setState(response.data.items);
        if (rerender) {
          setRefetch(!rerender);
        } else {
          setRefetch(true);
        }
      } else {
        setState(response.data.items);
      }
    })
    .catch((error: any) => console.log(error));
};

export const getTopTracks = (
  setState?: any,
  tracksRangeSelector?: any,
  tracksLimitSelector?: any,
  setSecondRefetch?: any,
  rerender?: any
) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get(
    `me/top/tracks?time_range=${tracksRangeSelector}&limit=${tracksLimitSelector}&offset=0`,
    config
  )
    .then((response: any) => {
      if (setSecondRefetch) {
        setState(response.data.items);
        if (rerender) {
          setSecondRefetch(!rerender);
        } else {
          setSecondRefetch(true);
        }
        setSecondRefetch(true);
      } else {
        setState(response.data.items);
      }
    })
    .catch((error: any) => console.log(error));
};

export const getRecentlyPlayed = (setState: any) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get("me/player/recently-played?limit=50", config)
    .then((response: any) => setState(response.data.items))
    .catch((error: any) => console.log(error));
};

export const getTrackBaseInfo = (setState: any, trackID: string) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get(`tracks/${trackID}`, config)
    .then((response: any) => setState(response.data))
    .catch((error: any) => console.log(error));
};

export const getTrackAnalysis = (
  setState: any,
  trackID: string,
  setRefetch: any
) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get(`audio-features?ids=${trackID}`, config)
    .then((response: any) => {
      if (setRefetch) {
        setState(response.data.audio_features[0]);
        setTimeout(() => setRefetch(true), 300);
      } else {
        setState(response.data.audio_features[0]);
      }
    })
    .catch((error: any) => console.log(error));
};

export const getMultipleTracksAnalysis = (
  setState: any,
  setThirdRefetch: any,
  trackID: string
) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get(`audio-features?ids=${trackID}`, config)
    .then((response: any) => {
      if (setThirdRefetch) {
        setState(response.data.audio_features);
        setThirdRefetch(true);
      } else {
        setState(response.data.audio_features);
      }
    })
    .catch((error: any) => console.log(error));
};

export const getTopTracksBasic = (setState: any) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get("me/top/tracks?time_range=long_term&limit=50&offset=0", config)
    .then((response: any) => setState(response.data.items))
    .catch((error: any) => console.log(error));
};

export const getTopArtistsBasic = (setState: any) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get("me/top/artists?time_range=long_term&limit=50&offset=0", config)
    .then((response: any) => setState(response.data.items))
    .catch((error: any) => console.log(error));
};

export const getArtistInfo = (
  setState: any,
  artistID: string,
  setRefetch: any
) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get(`artists/${artistID}`, config)
    .then((response: any) => {
      if (setRefetch) {
        setState(response.data);
        setRefetch(true);
      } else {
        setState(response.data);
      }
    })
    .catch((error: any) => console.log(error));
};

export const getTopTracksByArtist = (
  setState: any,
  artistID: string,
  setRefetch: any
) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get(`artists/${artistID}/top-tracks?market=CH`, config)
    .then((response: any) => {
      if (setRefetch) {
        setState(response.data);
        setRefetch(true);
      } else {
        setState(response.data);
      }
    })
    .catch((error: any) => console.log(error));
};

export const searchTracks = (setState: any, artistString: string) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get(
    `search?query=${artistString}&type=track&market=CH&offset=0&limit=10`,
    config
  )
    .then((response: any) => setState(response.data.tracks.items))
    .catch((error: any) => console.log(error));
};

export const getGenreSeeds = (setState: any) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get(`recommendations/available-genre-seeds`, config)
    .then((response: any) => {
      const genresArr = response.data.genres;
      const resultArr: any[] = [];
      genresArr.forEach((genre: any) =>
        resultArr.push({ value: genre, label: genre })
      );
      setState(resultArr);
    })
    .catch((error: any) => console.log(error));
};

export const getRecommendations = (
  setState: any,
  selectedSong: string,
  selectedArtist: string,
  selectedGenres: any,
  acousticness: string,
  danceability: string,
  energy: string,
  instrumentalness: string,
  liveness: string,
  popularity: string,
  speechiness: string
) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get(
    `recommendations?limit=50&market=CH&seed_artists=${selectedArtist}&seed_genres=${selectedGenres.join(
      ","
    )}&seed_tracks=${selectedSong}&target_acousticness=${acousticness}&target_danceability=${danceability}&target_energy=${energy}&target_instrumentalness=${instrumentalness}&target_liveness=${liveness}&target_popularity=${popularity}&target_speechiness=${speechiness}`,
    config
  )
    .then((response: any) => setState(response.data.tracks))
    .catch((error: any) => console.log(error));
};

export const getUserInfo = (setState: any) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  Axios.get("me", config)
    .then((response: any) => setState(response.data))
    .catch((error: any) => console.log(error));
};

export const savePlaylistToSpotify = (
  playlistName: string,
  userID: string,
  tracksURIs: string[],
  setPopUpMenu: Function
) => {
  let config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("analyze-music-token")}`,
    },
  };
  let body = {
    name: playlistName,
    description: "Playlist created with Analyze My Music web app",
    public: false,
  };
  Axios.post(`users/${userID}/playlists`, body, config)
    .then((response: any) => {
      // console.log(response.data.id);
      // alert("Playlist saved!");
      let nestedBody = {
        uris: tracksURIs,
      };
      Axios.post(`playlists/${response.data.id}/tracks`, nestedBody, config)
        .then((response: any) => {
          console.log(response);
          setPopUpMenu("Playlist saved to your profile!");
        })
        .catch((error: any) => setPopUpMenu("Error! Please try again!"));
    })
    .catch((error: any) => console.log(error));
};
