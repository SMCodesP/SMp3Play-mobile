interface TCreator {
  authorId: string;
  author: string;
  authorUrl: string;
  authorBanner: {
    height: number;
    width: number;
    url: string
  };
  authorThumbnail: {
    height: number;
    width: number;
    url: string
  };
  subscriberCount: number;
  description: string;
  isVerified: boolean;
}
