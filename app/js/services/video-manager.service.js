'use strict';

const DEFAULT_NEXT_PAGE_TOKEN = '##########';


class VideoManager {
  constructor($http, $q, lodash) {
    this.$http = $http;
    this.$q = $q;
    this._ = lodash;
    this._url = '/youtube/';

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
      type: 'video',
      maxResults: '50',
      order: 'date',
    };
    if (this._nextPageToken && this._nextPageToken != DEFAULT_NEXT_PAGE_TOKEN) {
      config['pageToken'] = this._nextPageToken;
    }

    const request = this.$http({
      method: 'post',
      url: `${this._url}search/list/`,
      data: config,
      cache: true,
    }).then(
      (response) => {
        const data = response.data;
        this._nextPageToken = data.nextPageToken;

        const videoIds = this._.map(data.items, (item) => item.id.videoId);
        const requestData = {
          id: this._.join(videoIds, ','),
          part: 'id,snippet,contentDetails,statistics',
        };

        const pVideos = this.$http({
          method: 'post',
          url: `${this._url}videos/list/`,
          data: requestData,
          cache: true,
        }).then((response) => {
          return response.data.items;
        });

        return pVideos;
      }
    );

    return request;
  }
}


export default VideoManager;
