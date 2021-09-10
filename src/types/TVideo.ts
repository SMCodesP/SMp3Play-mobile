interface TVideo {
  ago: string;
  author: {
    name: string;
    url: string;
  };
  description: string;
  duration: { seconds: number; timestamp: string };
  image: string;
  seconds: number;
  thumbnail: string;
  timestamp: string;
  title: string;
  type: string;
  url: string;
  videoId: string;
  views: number;
}
