export interface Author {
  name: string;
  url: string;
}

export interface Duration {
  seconds: number;
  timestamp: string;
  toString: () => string;
}

export default interface VideoType {
  type: 'video';
  videoId: string;
  url: string;
  title: string;
  description: string;
  image: string;
  thumbnail: string;
  seconds: number;
  timestamp: string;
  duration: Duration;
  ago: string;
  views: number;
  author: Author;
  src?: string;
  uuid?: string;
}
