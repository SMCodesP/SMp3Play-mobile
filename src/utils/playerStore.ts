import TrackPlayer from 'react-native-track-player';

class PlayerStore {
  queue: TrackPlayer.Track[];

  constructor() {
    this.queue = [];
  }

  async updateQueue() {
    this.queue = await TrackPlayer.getQueue();
  }
}