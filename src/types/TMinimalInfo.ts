interface TMinimalInfo {
  ago: string;
  author: {
    name: string;
    avatar: string;
  };
  description: string;
  thumbnail: string;
  timestamp: string;
  title: string;
  url: string;
  videoId: string;
  views: number;
  is_liked: boolean;
  updated_at?: number;
}
