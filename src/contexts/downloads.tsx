import React, { createContext, useContext, useEffect, useState } from "react";
import RNBackgroundDownloader, {
  DownloadTask,
} from "react-native-background-downloader";
import RNFS from "react-native-fs";
import { usePlaylist } from "./playlist";

type DownloadsType = {
  handleDownloadPlaylist(playlistName: string): void;
  handleCompleteDownload(id: string): void;
  downloads: DownloadTask[];
  downloadsCompleted: TDownload[];
};

const DownloadsContext = createContext<DownloadsType>({} as DownloadsType);

const DownloadsProvider: React.FC = ({ children }) => {
  const [downloads, setDownloads] = useState<DownloadTask[]>([]);
  const [downloadsCompleted, setDownloadsCompleted] = useState<TDownload[]>([]);
  const { getPlaylist } = usePlaylist();

  const handleDownloadPlaylist: DownloadsType["handleDownloadPlaylist"] = (
    playlistName
  ) => {
    const playlist = getPlaylist(playlistName);
    if (playlist) {
      setDownloads((state) => [
        ...state,
        ...playlist.songs
          .filter(
            (songId) =>
              state.findIndex(({ id }) => id === songId) === -1 &&
              downloadsCompleted.findIndex(({ id }) => id === songId) === -1
          )
          .map((song) => {
            return RNBackgroundDownloader.download({
              id: song,
              url: `https://sm-p3-play-api.vercel.app/api/song/${song}`,
              destination: `${RNBackgroundDownloader.directories.documents}/${song}.mp3`,
            });
          }),
      ]);
    }
  };

  const handleCompleteDownload: DownloadsType["handleCompleteDownload"] = (
    id
  ) => {
    setDownloads((state) => state.filter((song) => song.id !== id));
    setDownloadsCompleted((state) => [
      ...state.filter((song) => song.id !== id),
      { id },
    ]);
  };

  useEffect(() => {
    (async () => {
      setDownloads(await RNBackgroundDownloader.checkForExistingDownloads());
      const files = await RNFS.readDir(
        RNBackgroundDownloader.directories.documents
      );
      setDownloadsCompleted(
        files.map((file) => ({
          id: file.name.split(".mp3")[0],
        }))
      );
    })();
  }, []);

  return (
    <DownloadsContext.Provider
      value={{
        handleDownloadPlaylist,
        handleCompleteDownload,
        downloads,
        downloadsCompleted,
      }}
    >
      {children}
    </DownloadsContext.Provider>
  );
};

function useDownloads(): DownloadsType {
  const context = useContext(DownloadsContext);

  return context;
}

export { useDownloads, DownloadsProvider };

export default DownloadsContext;
