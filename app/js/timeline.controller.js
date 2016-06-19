'use strict';


class TimelineController {
  constructor($q, $scope, $window, lodash, videoManager) {
    this.$q = $q;
    this.$scope = $scope;
    this.$window = $window;
    this._ = lodash;
    this.videoManager = videoManager;

    this.loading = 0;
    this.channel = null;
    this.videos = [];

    this.topItem = null;

    this.heightLeft = 0;
    this.heightRight = 0;

    this.lastHeight = 0;

    this.activate();
  }
  activate() {
    this.getVideos();
    this.setupInfiniteLoad();
  }
  setupInfiniteLoad() {
    this.$window.addEventListener('scroll', () => {
      const windowHeight = document.body.offsetHeight;
      const distanceToBottom = windowHeight - (window.scrollY + window.innerHeight);

      if (distanceToBottom < 1000 && windowHeight !== this.lastHeight) {
        this.lastHeight = windowHeight;
        this.$scope.$apply(() => {
          this.getVideos();
        });
      }
    });
  }
  getVideos() {
    this.loading++;
    return this.videoManager.getVideos()
      .then((videos) => {
        this.setVideoScale(videos);
        this.videos = this._.concat(this.videos, videos);
        this.setVideoContainerDirection();
        this.loading--;
      });
  }
  setVideoScale(videos) {
    const videoCount = videos.length;
    const orderByViews = this._.sortBy(videos, video => parseInt(video.statistics.viewCount));

    this._.map(videos, video => {
      const index = this._.indexOf(orderByViews, video);
      const scale = Math.floor(index / videoCount * 4) + 1;
      video.snippet.thumbnails.scale = scale;
    });
  }
  setVideoContainerDirection() {
    let heightLeft = 0;
    let heightRight = 0;

    this._.forEach(this.videos, (video, index) => {
      const scale = video.snippet.thumbnails.scale;
      const scaleWidths = { 1: 180, 2: 240, 3: 360, 4: 480 };

      const height = video.snippet.thumbnails.medium.height;
      const width = video.snippet.thumbnails.medium.width;
      const scaledHeight = height / width * scaleWidths[scale] + 6;

      if (heightLeft + scaledHeight < heightRight) {
        heightLeft += scaledHeight;
        video.direction = 'left';
      }
      else {
        heightRight += scaledHeight;
        video.direction = 'right';
      }
    });
  }
  getVideoContainerClass(video) {
    if (video.direction == 'left') { return 'video-position-container--left'; }
    if (video.direction == 'right') { return 'video-position-container--right'; }
  }
  getVideoThumbnailClass(video) {
    const scale = video.snippet.thumbnails.scale;
    if (scale == 1) { return 'video-container--sm'; }
    if (scale == 2) { return 'video-container--md'; }
    if (scale == 3) { return 'video-container--lg'; }
    if (scale == 4) { return 'video-container--xl'; }
  }
}


export default TimelineController;
