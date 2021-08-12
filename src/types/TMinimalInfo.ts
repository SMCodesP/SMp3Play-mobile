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
  related_videos: [
    {
      author: [Object];
      id: string;
      isLive: boolean;
      length_seconds: number;
      published: string;
      richThumbnails: any[];
      short_view_count_text: string;
      thumbnails: any[];
      title: string;
      view_count: string;
    }
  ];
}
