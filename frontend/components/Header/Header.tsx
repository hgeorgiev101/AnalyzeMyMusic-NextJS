import analyzeMyMusicIcon from "../../static/analyzemymusic-logo.png";
import Link from "next/link";
import { FC, useState } from "react";
import Image from "next/image";

const Header: FC = (props) => {
  const [showBurger, setShowBurger] = useState(false);
  const logout = (): void => sessionStorage.clear();
  return (
    <header className="bg-indigo-600 font-roboto">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-2 flex items-center justify-between border-b border-indigo-500 lg:border-none">
          <div className="flex items-center">
            <span className="sr-only">Workflow</span>
            <Link href="/home">
              <Image
                className="h-20 w-auto cursor-pointer hover:scale-105 transform transition-all ease-linear delay-100"
                src={analyzeMyMusicIcon}
                alt="headphones-icon"
              />
            </Link>
            <div className="hidden ml-10 space-x-8 lg:block">
              <Link href="/home">
                <a className="text-base font-medium text-white hover:text-indigo-50">
                  Home
                </a>
              </Link>

              <Link href="/toptracks">
                <a className="text-base font-medium text-white hover:text-indigo-50">
                  Top Tracks
                </a>
              </Link>

              <Link href="/topartists">
                <a className="text-base font-medium text-white hover:text-indigo-50">
                  Top Artists
                </a>
              </Link>

              <Link href="/recentlyplayed">
                <a className="text-base font-medium text-white hover:text-indigo-50">
                  Recently Played
                </a>
              </Link>

              <Link href="/createplaylist">
                <a className="text-base font-medium text-white hover:text-indigo-50">
                  Create Playlist
                </a>
              </Link>
            </div>
          </div>
          <div className="ml-10 space-x-4 hidden lg:block">
            <Link href="/">
              <a className="inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base font-medium text-indigo-600 hover:bg-indigo-50 hover:scale-110 transform transition-all ease-linear delay-100">
                Logout
              </a>
            </Link>
          </div>
          <div
            className="ml-10 space-x-4 lg:hidden cursor-pointer"
            onClick={() => setShowBurger(!showBurger)}
          >
            <div className="flex flex-col items-center bg-white py-1 px-3 border border-transparent rounded-md hover:bg-indigo-50">
              <div className="px-2 py-0.5 my-0.5 border border-transparent rounded-md bg-indigo-600"></div>
              <div className="px-2 py-0.5 my-0.5 border border-transparent rounded-md bg-indigo-600"></div>
              <div className="px-2 py-0.5 my-0.5 border border-transparent rounded-md bg-indigo-600"></div>
            </div>
          </div>
        </div>
        <div
          className={`h-full ${
            showBurger ? `w-full` : `w-0`
          } absolute top-23 right-0 bg-indigo-400 z-10 overflow-auto overscroll-contain lg:hidden transition-all duration-200 ease-in-out`}
        >
          <div className="h-5/6 py-4 flex flex-col items-center justify-around">
            <Link href="/home">
              <a className="w-40 inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base text-center font-medium text-indigo-600 hover:bg-indigo-50">
                Home
              </a>
            </Link>

            <Link href="/toptracks">
              <a className="w-40 inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base text-center font-medium text-indigo-600 hover:bg-indigo-50">
                Top Tracks
              </a>
            </Link>

            <Link href="/topartists">
              <a className="w-40 inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base text-center font-medium text-indigo-600 hover:bg-indigo-50">
                Top Artists
              </a>
            </Link>

            <Link href="/recentlyplayed">
              <a className="w-40 inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base text-center font-medium text-indigo-600 hover:bg-indigo-50">
                Recently Played
              </a>
            </Link>

            <Link href="/createplaylist">
              <a className="w-40 inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base text-center font-medium text-indigo-600 hover:bg-indigo-50">
                Create Playlist
              </a>
            </Link>
            <Link href="/">
              <a
                onClick={() => logout()}
                className="w-40 inline-block bg-white py-2 px-4 border border-transparent rounded-md text-base text-center font-medium text-indigo-600 hover:bg-indigo-50"
              >
                Logout
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
