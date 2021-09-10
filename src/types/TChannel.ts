interface TChannel {
  author: string;
  authorId: string;
  authorUrl: string;
  authorBanners: any[];
  authorThumbnails: any[];
  subscriberText: string;
  subscriberCount: number;
  description: string;
  isFamilyFriendly: boolean;
  relatedChannels: {
    items: any[];
    continuation: string
  };
  allowedRegions: string[];
  isVerified: boolean;
  tags: string[];
  channelIdType: number; 
}