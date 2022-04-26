import ReactGA from "react-ga";

export const checkTokenOrRedirect = (router: any): void => {
  if (
    !sessionStorage.getItem("analyze-music-token") ||
    sessionStorage.getItem("analyze-music-token") === undefined
  ) {
    router.push("/");
  }
};

export const initGA = () => {
  ReactGA.initialize("UA-119929711-3"); // put your tracking id here
};

export const GApageView = (page: any) => {
  ReactGA.pageview(page);
};
