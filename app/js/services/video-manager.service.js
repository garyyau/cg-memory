'use strict';

const YOUTUBE_CHANNEL_ID = 'UCUudDyi0JiVmSxarvU98YYQ';

const YOUTUBE_SEARCH_LIST_REQUEST = {
  part: 'id,snippet',
  channelId: YOUTUBE_CHANNEL_ID,
  type: 'video',
  maxResults: '50',
  order: 'date',
};

const YOUTUBE_VIDEO_LIST_REQUEST = {
  id: '',
  part: 'id,snippet,statistics',
};

class VideoManager {

  constructor($http, $q, lodash) {
    this.$http = $http;
    this.$q = $q;
    this._ = lodash;
    this._url = '/youtube/';

    this._channelId = 'UCUudDyi0JiVmSxarvU98YYQ';
  }

  getAllVideos() {
    return this.getVideos();
  }

  getVideosFromSearch(pageToken) {
    const postData = YOUTUBE_SEARCH_LIST_REQUEST;
    if (pageToken) { postData['pageToken'] = pageToken; }

    const request = this.$http({
      method: 'post',
      url: `${this._url}search/list/`,
      data: postData,
    }).then(response => response.data);

    return request;
  }

  getVideosData(ids) {
    const postData = YOUTUBE_VIDEO_LIST_REQUEST;
    postData.id = this._.join(ids, ',');

    const request = this.$http({
      method: 'post',
      url: `${this._url}videos/list/`,
      data: postData,
    }).then(response => response.data);

    return request;
  }

  getVideos(pageToken) {
    const pVideosFromSearch = this.getVideosFromSearch(pageToken)
      .then((searchData) => {
        const nextPageToken = searchData.nextPageToken;

        const promises = [];
        const videoIds = this._.map(searchData.items, (item) => item.id.videoId);
        promises.push(this.getVideosData(videoIds));
        if (nextPageToken) { promises.push(this.getVideos(nextPageToken)); }

        const request = this.$q.all(promises)
          .then((responses) => {
            if (!nextPageToken) { return responses.shift().items; }

            const videosData = responses.shift().items;
            const nextPageVideos = responses.shift();

            return this._.concat(videosData, nextPageVideos);
          });

        return request;
      });

    return pVideosFromSearch;
  }

}


export default VideoManager;
