import { FC, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { getTrackBaseInfo, getTrackAnalysis } from "../../Axios/fetches";
import { ResponsiveBar } from "@nivo/bar";
import SpotifyPlayer from "react-spotify-web-playback";
import { checkTokenOrRedirect } from "../../common";
import { useRouter } from "next/router";
import spotifyIcon from "../../static/spotify-icon.png";
import Image from "next/image";

interface dataBarChartInterface {
  metric: string;
  value: number;
}

const Song: FC = () => {
  const [trackBaseInfo, setTrackBaseInfo] = useState<any>(undefined);
  const [trackAnalysis, setTrackAnalysis] = useState<any>(undefined);
  const [refetch, setRefetch] = useState<boolean>(false);
  const [dataBarChart, setDataBarChart] = useState<undefined | any[]>(
    undefined
  );
  const [token, setToken] = useState<null | string>(null);
  const [uri, setUri] = useState<undefined | string[]>(undefined);
  const router = useRouter();
  const params: any = router.query;

  const getDataBarChart = (trackAnalysis: any) => {
    setUri([trackAnalysis.uri]);
    const dataBarChart: dataBarChartInterface[] = [
      { metric: "acousticness", value: trackAnalysis.acousticness },
      { metric: "danceability", value: trackAnalysis.danceability },
      { metric: "energy", value: trackAnalysis.energy },
      { metric: "liveness", value: trackAnalysis.liveness },
      { metric: "speechiness", value: trackAnalysis.speechiness },
    ];
    return dataBarChart;
  };

  useEffect(() => {
    if (router) {
      checkTokenOrRedirect(router);
      setToken(sessionStorage.getItem("analyze-music-token"));
      getTrackBaseInfo(setTrackBaseInfo, params.id);
      getTrackAnalysis(setTrackAnalysis, params.id, setRefetch);
    }
    if (trackAnalysis) {
      console.log("works"); //WAT
      setDataBarChart(getDataBarChart(trackAnalysis));
    }
  }, [refetch, router]);

  return (
    <div className="h-screen w-screen overflow-x-hidden font-roboto">
      <Header />
      {}
      <div className="text-center text-xl my-6 font-roboto">Song Info</div>
      <div className="w-full flex flex-col items-center h-5/6 lg:h-10/12 mb-12">
        <div className="border-2  rounded-xl custom-shadow p-8 flex w-10/12 flex-wrap">
          {/* first row */}
          <div className="w-full">
            <div className="flex flex-col">
              {trackBaseInfo && (
                <div className="flex items-center">
                  <div className="font-bold font-roboto self-center">
                    {trackBaseInfo.name}
                  </div>
                  <a
                    href={trackBaseInfo.external_urls.spotify}
                    className="flex-shrink-0"
                  >
                    <Image
                      className="cursor-pointer transform object-scale-down scale-50 "
                      src={spotifyIcon}
                      alt="spotify-icon"
                    />
                  </a>
                </div>
              )}
              {trackBaseInfo && (
                <div className="flex items-center">
                  <div className="my-2 self-center ">
                    {trackBaseInfo.artists[0].name}
                  </div>
                  <a
                    href={trackBaseInfo.artists[0].external_urls.spotify}
                    className="flex-shrink-0"
                  >
                    <Image
                      className="cursor-pointer transform object-scale-down scale-50 "
                      src={spotifyIcon}
                      alt="spotify-icon"
                    />
                  </a>
                </div>
              )}
            </div>
          </div>
          {/* second row */}
          <div className="w-full flex flex-col lg:flex-row">
            <div className="w-full lg:w-4/12 mr-5">
              {trackBaseInfo && (
                <img
                  className="shadow-xl"
                  src={trackBaseInfo.album.images[0].url}
                  alt=""
                />
              )}
            </div>
            <div className="h-10/12 w-full hidden lg:block lg:w-8/12">
              {dataBarChart && (
                <ResponsiveBar
                  data={dataBarChart}
                  keys={["value"]}
                  indexBy="metric"
                  colors={{ scheme: "set2" }}
                  maxValue={1}
                  layout="horizontal"
                  margin={{ top: 10, right: 10, bottom: 50, left: 75 }}
                  padding={0.1}
                  enableLabel={false}
                  axisBottom={{
                    legend: "value",
                    legendPosition: "middle",
                    legendOffset: 32,
                  }}
                  theme={{ fontFamily: "Roboto" }}
                />
              )}
            </div>
            <div className="h-96 w-full block lg:hidden lg:w-8/12 p-3 m-3">
              {dataBarChart && (
                <ResponsiveBar
                  data={dataBarChart}
                  keys={["value"]}
                  indexBy="metric"
                  colors={{ scheme: "set2" }}
                  maxValue={1}
                  layout="vertical"
                  margin={{ top: 10, right: 20, bottom: 70, left: 30 }}
                  padding={0.1}
                  enableLabel={false}
                  axisBottom={{
                    legendPosition: "middle",
                    legendOffset: 32,
                    tickRotation: 55,
                  }}
                  theme={{ fontFamily: "Roboto" }}
                />
              )}
            </div>
          </div>
          <div className="w-full flex justify-center mb-2 mt-10 mx-8 font-roboto">
            <div className="w-full lg:w-6/12">
              {token && uri ? (
                <SpotifyPlayer
                  token={token as string}
                  uris={uri}
                  showSaveIcon={true}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Song;
