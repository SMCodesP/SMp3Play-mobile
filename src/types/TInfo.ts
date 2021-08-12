interface TInfo {
  formats: [
    {
      approxDurationMs: string;
      audioChannels: number;
      audioQuality: string;
      audioSampleRate: string;
      averageBitrate: number;
      bitrate: number;
      contentLength: string;
      fps: number;
      height: number;
      itag: number;
      lastModified: string;
      mimeType: string;
      projectionType: string;
      quality: string;
      qualityLabel: string;
      url: string;
      width: number;
    }
  ];
  html5player: string;
  page: string;
  player_response: {
    adPlacements: [];
    annotations: [];
    attestation: {
      playerAttestationRenderer: [Object];
    };
    captions: {
      playerCaptionsRenderer: [Object];
      playerCaptionsTracklistRenderer: [Object];
    };
    cards: {
      cardCollectionRenderer: [Object];
    };
    endscreen: {
      endscreenRenderer: [Object];
    };
    frameworkUpdates: {
      entityBatchUpdate: [Object];
    };
    messages: [[Object]];
    microformat: {
      playerMicroformatRenderer: [Object];
    };
    playabilityStatus: {
      contextParams: string;
      miniplayer: [Object];
      playableInEmbed: boolean;
      status: string;
    };
    playbackTracking: {
      atrUrl: [Object];
      ptrackingUrl: [Object];
      qoeUrl: [Object];
      videostatsDefaultFlushIntervalSeconds: number;
      videostatsDelayplayUrl: [Object];
      videostatsPlaybackUrl: [Object];
      videostatsScheduledFlushWalltimeSeconds: any[];
      videostatsWatchtimeUrl: [Object];
      youtubeRemarketingUrl: [Object];
    };
    playerAds: [[Object]];
    playerConfig: {
      audioConfig: [Object];
      mediaCommonConfig: [Object];
      streamSelectionConfig: [Object];
      webPlayerConfig: [Object];
    };
    responseContext: {
      mainAppWebResponseContext: [Object];
      serviceTrackingParams: any[];
      webResponseContextExtensionData: [Object];
    };
    storyboards: {
      playerStoryboardSpecRenderer: [Object];
    };
    streamingData: {
      adaptiveFormats: any[];
      expiresInSeconds: string;
      formats: any[];
    };
    trackingParams: string;
    videoDetails: {
      allowRatings: boolean;
      author: string;
      averageRating: number;
      channelId: string;
      isCrawlable: boolean;
      isLiveContent: boolean;
      isOwnerViewing: boolean;
      isPrivate: boolean;
      isUnpluggedCorpus: boolean;
      keywords: any[];
      lengthSeconds: string;
      shortDescription: string;
      thumbnail: [Object];
      title: string;
      videoId: string;
      viewCount: string;
    };
  };
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
  response: {
    contents: {
      twoColumnWatchNextResults: [Object];
    };
    currentVideoEndpoint: {
      clickTrackingParams: string;
      commandMetadata: [Object];
      watchEndpoint: [Object];
    };
    engagementPanels: [[Object]];
    frameworkUpdates: {
      entityBatchUpdate: [Object];
    };
    onResponseReceivedEndpoints: [[Object]];
    overlay: {
      tooltipRenderer: [Object];
    };
    playerOverlays: {
      playerOverlayRenderer: [Object];
    };
    responseContext: {
      mainAppWebResponseContext: [Object];
      serviceTrackingParams: any[];
      webResponseContextExtensionData: [Object];
    };
    topbar: {
      desktopTopbarRenderer: [Object];
    };
    trackingParams: string;
  };
  videoDetails: {
    age_restricted: boolean;
    allowRatings: boolean;
    author: {
      channel_url: string;
      external_channel_url: string;
      id: string;
      name: string;
      subscriber_count: number;
      thumbnails: any[];
      user: string;
      user_url: string;
      verified: boolean;
    };
    availableCountries: string[];
    averageRating: number;
    category: string;
    channelId: string;
    chapters: any[];
    description: string;
    dislikes: number;
    embed: {
      flashSecureUrl: string;
      flashUrl: string;
      height: number;
      iframeUrl: string;
      width: number;
    };
    externalChannelId: string;
    hasYpcMetadata: boolean;
    isCrawlable: boolean;
    isFamilySafe: boolean;
    isLiveContent: boolean;
    isOwnerViewing: boolean;
    isPrivate: boolean;
    isUnlisted: boolean;
    isUnpluggedCorpus: boolean;
    keywords: string[];
    lengthSeconds: string;
    likes: number;
    media: {};
    ownerChannelName: string;
    ownerProfileUrl: string;
    publishDate: string;
    storyboards: any[];
    thumbnails: any[];
    title: string;
    uploadDate: string;
    videoId: string;
    video_url: string;
    viewCount: string;
  };
}
