'use strict';


class TimelineController {
  constructor($q, $scope, $window, lodash, moment, videoManager) {
    this.$q = $q;
    this.$scope = $scope;
    this.$window = $window;
    this._ = lodash;
    this.moment = moment;
    this.videoManager = videoManager;

    this.loading = 0;
    this.channel = null;
    this.videos = [];

    this.videoAtTop = {};
    this.splitLocations = [];

    this.getVideoPublishedYear = this.getVideoPublishedYear.bind(this);
    this.activate();
  }
  activate() {
    this.getVideos();
  }
  scrollTo(value) {
    const elements = $(`[split-val='${value}']`);
    const position = $(elements[0]).offsetParent().position().top;

    const current = this.$window.pageYOffset;
    const distance = Math.abs(current - position);
    const total = $('body').height();
    const percentage = distance / total;

    const minspeed = 1000;
    const maxspeed = 4000;
    const speed = minspeed + percentage * (maxspeed - minspeed);

    $('body').animate({scrollTop: position}, speed);
  }
  getVideoPublishedYear(video) {
    const published = this.moment(video.snippet.publishedAt);
    return published.year();
  }
  getVideos() {
    this.loading++;
    return this.videoManager.getAllVideos()
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
      const scaledHeight = height / width * scaleWidths[scale] + 8;

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
  isActiveNavItem(location) {
    const locations = this._.sortBy(this.splitLocations, 'start');
    const currentPosition = this.$window.pageYOffset;

    for (let i = 0; i < locations.length; i++) {
      const current = locations[i];
      const next = locations[i+1];
      if (!next || next.start > currentPosition) {
        return current.value == location.value;
      }
    }
  }
}


export default TimelineController;
