import VideoType from './VideoType';

export default interface Playlist {
  id: string;
  name: string;
  videos: VideoType[];
}
