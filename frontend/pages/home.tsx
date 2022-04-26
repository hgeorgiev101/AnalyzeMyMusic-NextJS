import Head from "next/head";
import ReactGA from "react-ga";
import { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";

import {
  getTopArtists,
  getTopTracks,
  getMultipleTracksAnalysis,
} from "../Axios/fetches";
import { Doughnut, Bar, Pie } from "react-chartjs-2";
import Header from "../components/Header/Header";
import { GApageView } from "../common/index";
import {
  topArtistInterface,
  topTrackInterface,
  trackAnalisys,
} from "../interfaces";

interface chartData {
  labels: string[] | any[];
  datasets: {
    stack?: string;
    backgroundColor: string[] | string;
    data: number[] | any[];
    label: string;
  }[];
}

const Home: FC = () => {
  const [topArtists, setTopArtists] = useState<
    undefined | topArtistInterface[]
  >(undefined);
  const [artistsDoughnutData, setArtistsDoughnutData] = useState<
    undefined | chartData
  >(undefined);
  const [artistsBarData, setArtistsBarData] = useState<undefined | chartData>(
    undefined
  );
  const [refetch, setRefetch] = useState<boolean>(false);
  const [secondRefetch, setSecondRefetch] = useState<boolean>(false);
  const [thirdRefetch, setThirdRefetch] = useState<boolean>(false);
  const [artistsRangeSelector, setArtistsRangeSelector] =
    useState<string>("long_term");
  const [artistsLimitSelector, setArtistsLimitSelector] =
    useState<string>("50");
  const [topTracks, setTopTracks] = useState<undefined | topTrackInterface[]>(
    undefined
  );
  const [top10TracksAnalisys, setTop10TracksAnalisys] = useState<
    undefined | trackAnalisys[]
  >(undefined);
  const [tracksRangeSelector, setTracksRangeSelector] =
    useState<string>("long_term");
  const [tracksLimitSelector, setTracksLimitSelector] = useState<string>("50");
  const [tracksLineData, setTracksLineData] = useState<undefined | chartData>(
    undefined
  );
  const [tracksBarData, setTracksBarData] = useState<undefined | chartData>(
    undefined
  );
  const [tracksDecades, setTracksDecades] = useState<undefined | chartData>(
    undefined
  );
  const [rerender, setRerender] = useState<boolean>(false);
  const router = useRouter();

  const checkTokenOrRedirect = () => {
    if (
      !sessionStorage.getItem("analyze-music-token") ||
      sessionStorage.getItem("analyze-music-token") === undefined
    ) {
      router.push("/");
    }
  };

  const calculateTopGenres = (top: topArtistInterface[]): chartData => {
    const genresCounter = new Map<string, number>();
    top.forEach((artist: topArtistInterface) => {
      artist.genres.forEach((genre: string) => {
        let genreToUpper = genre.charAt(0).toUpperCase() + genre.slice(1);
        if (!genresCounter.has(genreToUpper)) {
          genresCounter.set(genreToUpper, 1);
        } else {
          genresCounter.set(
            genreToUpper,
            (genresCounter.get(genreToUpper) as number) + 1
          );
        }
      });
    });
    const mapSort1 = new Map(
      [...genresCounter.entries()].sort((a, b) => b[1] - a[1])
    );

    let resultObj: chartData = {
      labels: Array.from(mapSort1.keys()).slice(0, 10),
      datasets: [
        {
          label: "Top genres",
          data: Array.from(mapSort1.values()).slice(0, 10),
          backgroundColor: [
            "#C0392B",
            "#9B59B6",
            "#D0ECE7",
            "#1A5276",
            "#58D68D",
            "#F4D03F",
            "#DC7633",
            "#CACFD2",
            "#7FB3D5",
            "#FAD7A0",
          ],
        },
      ],
    };
    return resultObj;
  };

  const calculateArtistsPopularity = (top: topArtistInterface[]): chartData => {
    const popularityMap = new Map<string, number>();
    top.forEach((artist: topArtistInterface) =>
      popularityMap.set(artist.name, artist.popularity)
    );
    const popularityMapSorted = new Map(
      [...popularityMap.entries()].sort((a, b) => b[1] - a[1])
    );

    let resultObj: chartData = {
      labels: Array.from(popularityMapSorted.keys()).slice(0, 10),
      datasets: [
        {
          label: "Most popular artists",
          data: Array.from(popularityMapSorted.values()).slice(0, 10),
          backgroundColor: [
            "#C0392B",
            "#9B59B6",
            "#D0ECE7",
            "#1A5276",
            "#58D68D",
            "#F4D03F",
            "#DC7633",
            "#CACFD2",
            "#7FB3D5",
            "#FAD7A0",
          ],
        },
      ],
    };
    return resultObj;
  };

  const getTop10TracksAnalisys = (
    top: topTrackInterface[],
    setTop10TracksAnalisys: Function
  ) => {
    let urlString = "";
    const top10Tracks = top.slice(0, 10);
    top10Tracks.forEach(
      (track: topTrackInterface) => (urlString += `${track.id},`)
    );
    const urlGetRequestString = urlString.slice(0, -1);
    getMultipleTracksAnalysis(
      setTop10TracksAnalisys,
      setThirdRefetch,
      urlGetRequestString
    );
  };

  const calculateTracksAnalysisData = (
    top: topTrackInterface[],
    analisys: trackAnalisys[]
  ): chartData => {
    const trackNames: string[] = [];
    const danceability: number[] = [];
    const energy: number[] = [];
    const speechiness: number[] = [];
    const top10Tracks = top.slice(0, 10);
    top10Tracks.forEach((track: topTrackInterface) =>
      trackNames.push(track.name)
    );
    analisys.forEach((track: trackAnalisys) => {
      danceability.push(track.danceability);
      energy.push(track.energy);
      speechiness.push(track.speechiness);
    });

    const resultObj: chartData = {
      labels: trackNames,
      datasets: [
        {
          stack: "stack1",
          label: "Speechiness",
          data: speechiness,
          backgroundColor: "#C0392B",
        },
        {
          stack: "stack1",
          label: "Danceability",
          data: danceability,
          backgroundColor: "#9B59B6",
        },
        {
          stack: "stack1",
          label: "Energy",
          data: energy,
          backgroundColor: "#58D68D",
        },
      ],
    };
    return resultObj;
  };

  const calculateTracksPopularity = (top: topTrackInterface[]): chartData => {
    const popularityMap = new Map<string, number>();
    top.forEach((track: topTrackInterface) =>
      popularityMap.set(track.name, track.popularity)
    );
    const popularityMapSorted = new Map<string, number>(
      [...popularityMap.entries()].sort((a, b) => b[1] - a[1])
    );

    let resultObj: chartData = {
      labels: Array.from(popularityMapSorted.keys()).slice(0, 10),
      datasets: [
        {
          label: "Most popular tracks",
          data: Array.from(popularityMapSorted.values()).slice(0, 10),
          backgroundColor: [
            "#C0392B",
            "#9B59B6",
            "#D0ECE7",
            "#1A5276",
            "#58D68D",
            "#F4D03F",
            "#DC7633",
            "#CACFD2",
            "#7FB3D5",
            "#FAD7A0",
          ],
        },
      ],
    };
    return resultObj;
  };

  const calculateTopTracksDecades = (top: topTrackInterface[]): chartData => {
    const decadesCounter = new Map<string, number>();
    top.forEach((track: topTrackInterface) => {
      const releaseDate: number[] = track.album.release_date.split("-");
      if (releaseDate[0] <= 2029 && releaseDate[0] >= 2020) {
        if (!decadesCounter.has("2020s")) {
          decadesCounter.set("2020s", 1);
        } else {
          decadesCounter.set(
            "2020s",
            (decadesCounter.get("2020s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 2019 && releaseDate[0] >= 2010) {
        if (!decadesCounter.has("2010s")) {
          decadesCounter.set("2010s", 1);
        } else {
          decadesCounter.set(
            "2010s",
            (decadesCounter.get("2010s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 2009 && releaseDate[0] >= 2000) {
        if (!decadesCounter.has("2000s")) {
          decadesCounter.set("2000s", 1);
        } else {
          decadesCounter.set(
            "2000s",
            (decadesCounter.get("2000s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 1999 && releaseDate[0] >= 1990) {
        if (!decadesCounter.has("1990s")) {
          decadesCounter.set("1990s", 1);
        } else {
          decadesCounter.set(
            "1990s",
            (decadesCounter.get("1990s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 1989 && releaseDate[0] >= 1980) {
        if (!decadesCounter.has("1980s")) {
          decadesCounter.set("1980s", 1);
        } else {
          decadesCounter.set(
            "1980s",
            (decadesCounter.get("1980s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 1979 && releaseDate[0] >= 1970) {
        if (!decadesCounter.has("1970s")) {
          decadesCounter.set("1970s", 1);
        } else {
          decadesCounter.set(
            "1970s",
            (decadesCounter.get("1970s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 1969 && releaseDate[0] >= 1960) {
        if (!decadesCounter.has("1960s")) {
          decadesCounter.set("1960s", 1);
        } else {
          decadesCounter.set(
            "1960s",
            (decadesCounter.get("1960s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 1959 && releaseDate[0] >= 1950) {
        if (!decadesCounter.has("1950s")) {
          decadesCounter.set("1950s", 1);
        } else {
          decadesCounter.set(
            "1950s",
            (decadesCounter.get("1950s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 1949 && releaseDate[0] >= 1940) {
        if (!decadesCounter.has("1940s")) {
          decadesCounter.set("1940s", 1);
        } else {
          decadesCounter.set(
            "1940s",
            (decadesCounter.get("1940s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 1939 && releaseDate[0] >= 1930) {
        if (!decadesCounter.has("1930s")) {
          decadesCounter.set("1930s", 1);
        } else {
          decadesCounter.set(
            "1930s",
            (decadesCounter.get("1930s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 1929 && releaseDate[0] >= 1920) {
        if (!decadesCounter.has("1920s")) {
          decadesCounter.set("1920s", 1);
        } else {
          decadesCounter.set(
            "1920s",
            (decadesCounter.get("1920s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 1919 && releaseDate[0] >= 1910) {
        if (!decadesCounter.has("1910s")) {
          decadesCounter.set("1910s", 1);
        } else {
          decadesCounter.set(
            "1910s",
            (decadesCounter.get("1910s") as number) + 1
          );
        }
      } else if (releaseDate[0] <= 1909 && releaseDate[0] >= 1900) {
        if (!decadesCounter.has("1900s")) {
          decadesCounter.set("1900s", 1);
        } else {
          decadesCounter.set(
            "1900s",
            (decadesCounter.get("1900s") as number) + 1
          );
        }
      }
    });
    const mapSort1 = new Map([...decadesCounter].sort());

    let resultObj: chartData = {
      labels: Array.from(mapSort1.keys()),
      datasets: [
        {
          label: "Decades",
          data: Array.from(mapSort1.values()).map((value: number) =>
            Math.floor((value / 50) * 100)
          ),
          backgroundColor: [
            "#C0392B",
            "#9B59B6",
            "#D0ECE7",
            "#1A5276",
            "#58D68D",
            "#F4D03F",
            "#DC7633",
            "#CACFD2",
            "#7FB3D5",
            "#FAD7A0",
          ],
        },
      ],
    };
    return resultObj;
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    switch (event.target.name) {
      case "artistsRange":
        setArtistsRangeSelector(event.target.value);
        break;
      case "artistsLimit":
        setArtistsLimitSelector(event.target.value);
        break;
      case "tracksRange":
        setTracksRangeSelector(event.target.value);
        break;
      case "tracksLimit":
        setTracksLimitSelector(event.target.value);
        break;
      default:
        console.log("default");
    }
  };

  useEffect(() => {
    GApageView(window.location.pathname);
    checkTokenOrRedirect();
    getTopArtists(
      setTopArtists,
      artistsRangeSelector,
      artistsLimitSelector,
      setRefetch
    );
    if (topArtists) {
      setArtistsDoughnutData(calculateTopGenres(topArtists));
      setArtistsBarData(calculateArtistsPopularity(topArtists));
    }
    getTopTracks(
      setTopTracks,
      tracksRangeSelector,
      tracksLimitSelector,
      setSecondRefetch
    );
    if (topTracks) {
      getTop10TracksAnalisys(topTracks, setTop10TracksAnalisys);
      setTracksBarData(calculateTracksPopularity(topTracks));
      setTracksDecades(calculateTopTracksDecades(topTracks));
    }
    if (top10TracksAnalisys) {
      setTracksLineData(
        calculateTracksAnalysisData(
          topTracks as topTrackInterface[],
          top10TracksAnalisys
        )
      );
    }
  }, [refetch, secondRefetch, thirdRefetch, rerender]);

  return (
    <div className="h-full w-full flex flex-col">
      <Header />
      <div className="flex flex-col">
        <div className="flex flex-col lg:flex-row h-4/5 w-full">
          <div className="h-full w-full lg:w-1/2 flex flex-col justify-center items-center">
            <p className="my-6 text-xl font-roboto">Top Artists</p>
            <div className="w-3/4 flex items-center justify-around font-roboto">
              <label>
                Scope:{" "}
                <select
                  name="artistsRange"
                  value={artistsRangeSelector}
                  onChange={handleChange}
                  className="border-2 shadow-md rounded-md"
                >
                  <option value="long_term">Last 3 years</option>
                  <option value="medium_term">Last 6 months</option>
                  <option value="short_term">Last 4 weeks</option>
                </select>
              </label>
              <label>
                Limit:{" "}
                <select
                  name="artistsLimit"
                  value={artistsLimitSelector}
                  onChange={handleChange}
                  className="border-2 shadow-md rounded-md"
                >
                  <option value="10">10 Artists</option>
                  <option value="20">20 Artists</option>
                  <option value="30">30 Artists</option>
                  <option value="40">40 Artists</option>
                  <option value="50">50 Artists</option>
                </select>
              </label>
              <button
                className="p-3 lg:p-2 bg-indigo-400 text-white rounded-md shadow-md"
                onClick={() => {
                  getTopArtists(
                    setTopArtists,
                    artistsRangeSelector,
                    artistsLimitSelector,
                    setRerender,
                    rerender
                  );
                }}
              >
                Apply
              </button>
            </div>
            <div className="h-96 w-5/6 my-8 p-4 custom-shadow rounded-lg">
              {artistsDoughnutData ? (
                <Doughnut
                  data={artistsDoughnutData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: "Top genres",
                        font: { size: 20, family: "Roboto" },
                      },
                      legend: {
                        labels: {
                          font: { family: "Roboto" },
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>
            <div className="h-96 w-5/6 my-8 p-4 custom-shadow rounded-lg">
              {artistsBarData ? (
                <Bar
                  data={artistsBarData}
                  options={{
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    plugins: {
                      title: {
                        display: true,
                        text: "Most popular artists",
                        font: { size: 20, family: "Roboto" },
                      },
                      legend: {
                        display: false,
                      },
                    },
                    scales: {
                      y: {
                        ticks: {
                          font: {
                            family: "Roboto",
                          },
                        },
                      },
                      x: {
                        ticks: {
                          font: {
                            family: "Roboto",
                          },
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>
          </div>
          <div className="h-full w-full lg:w-1/2 flex flex-col justify-center items-center">
            <p className="my-6 text-xl font-roboto">Top Tracks</p>
            <div className="w-3/4 flex items-center justify-around font-roboto">
              <label>
                Scope:{" "}
                <select
                  name="tracksRange"
                  value={tracksRangeSelector}
                  onChange={handleChange}
                  className="border-2 shadow-md rounded-md"
                >
                  <option value="long_term">Last 3 years</option>
                  <option value="medium_term">Last 6 months</option>
                  <option value="short_term">Last 4 weeks</option>
                </select>
              </label>
              <label>
                Limit:{" "}
                <select
                  name="tracksLimit"
                  value={tracksLimitSelector}
                  onChange={handleChange}
                  className="border-2 shadow-md rounded-md"
                >
                  <option value="10">10 Tracks</option>
                  <option value="20">20 Tracks</option>
                  <option value="30">30 Tracks</option>
                  <option value="40">40 Tracks</option>
                  <option value="50">50 Tracks</option>
                </select>
              </label>
              <button
                className="p-3 lg:p-2 bg-indigo-400 text-white rounded-md shadow-md"
                onClick={() => {
                  getTopTracks(
                    setTopTracks,
                    tracksRangeSelector,
                    tracksLimitSelector,
                    setRerender,
                    rerender
                  );
                }}
              >
                Apply
              </button>
            </div>
            <div className="h-96 w-5/6 my-8 p-4 custom-shadow rounded-lg">
              {tracksLineData ? (
                <Bar
                  data={tracksLineData}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      title: {
                        display: true,
                        text: "Top 10 Tracks Analysis Data",
                        font: { size: 20, family: "Roboto" },
                      },
                      legend: {
                        labels: {
                          font: {
                            family: "Roboto",
                          },
                        },
                      },
                    },
                    scales: {
                      y: {
                        ticks: {
                          font: {
                            family: "Roboto",
                          },
                        },
                      },
                      x: {
                        ticks: {
                          font: {
                            family: "Roboto",
                          },
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>
            <div className="h-96 w-5/6 my-8 p-4 custom-shadow rounded-lg">
              {tracksBarData ? (
                <Bar
                  data={tracksBarData}
                  options={{
                    maintainAspectRatio: false,
                    indexAxis: "y",
                    plugins: {
                      title: {
                        display: true,
                        text: "Most popular tracks",
                        font: { size: 20, family: "Roboto" },
                      },
                      legend: {
                        display: false,
                      },
                    },
                    responsive: true,
                    scales: {
                      x: {
                        stacked: true,
                        ticks: {
                          font: {
                            family: "Roboto",
                          },
                        },
                      },
                      y: {
                        stacked: true,
                        ticks: {
                          font: {
                            family: "Roboto",
                          },
                        },
                      },
                    },
                  }}
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center">
                  <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="h-96 self-center w-10/12 lg:w-1/2 my-8 p-4 custom-shadow rounded-lg">
          {tracksDecades ? (
            <Pie
              data={tracksDecades}
              options={{
                maintainAspectRatio: false,
                plugins: {
                  title: {
                    display: true,
                    text: "Your track history based on decades in %",
                    font: { size: 19, family: "Roboto" },
                  },
                  legend: {
                    labels: {
                      font: {
                        family: "Roboto",
                      },
                    },
                  },
                },
              }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
