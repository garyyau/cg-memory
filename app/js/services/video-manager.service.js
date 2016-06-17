'use strict';

const DEFAULT_NEXT_PAGE_TOKEN = '##########';


class VideoManager {
  constructor($q, lodash, youtubeFactory) {
    this.$q = $q;
    this._ = lodash;
    this.youtubeFactory = youtubeFactory;

    this._key = 'AIzaSyD37_ysUAUz4_TXYZh1H8vvTv_5CLHHNJA';

    this._channelId = 'UCUudDyi0JiVmSxarvU98YYQ';
    this._nextPageToken = DEFAULT_NEXT_PAGE_TOKEN;
  }
  getVideos() {
    if (!this._nextPageToken) {
      return this.$q.resolve([]);
    }

    const config = {
      part: 'id,snippet',
      channelId: this._channelId,
      maxResults: '50',
      order: 'date',
      key: this._key,
    };
    if (this._nextPageToken && this._nextPageToken != DEFAULT_NEXT_PAGE_TOKEN) {
      config['nextPageToken'] = this._nextPageToken;
    }

    return this.youtubeFactory
      .getVideosFromChannelById(config)
      .then(
        (response) => {
          const data = response.data;
          this._nextPageToken = data.nextPageToken;

          const videoIds = this._.map(data.items, (item) => item.id.videoId);
          const pVideos = this.youtubeFactory.getVideoById({
            part: 'id,snippet,contentDetails,statistics',
            videoId: this._.join(videoIds, ','),
            key: this._key,
          })
          .then((response) => response.data.items);

          return pVideos;
        }
      );
  }
}


export default VideoManager;
