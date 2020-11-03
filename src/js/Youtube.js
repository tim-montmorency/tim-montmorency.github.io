import { v1 as uuid } from 'uuid';

export default class Video {
  constructor(el) {
    this.dom = {
      el,
    };

    this.prefix = 'youtube';

    // -- Properties
    //--------------------------------------------------------------
    this.keys = {
      enter: 13,
      escape: 27,
      space: 32,
    };

    this.player = {
      el: null,
      guid: uuid(),
      state: null,
      isInitialized: false,
      key: this.getVideoId(),
      settings: {
        enablejsapi: 1,
        modestbranding: 1,
        rel: 0,
        showinfo: 0,
      },
    };

    this.init();
  }

  // -- Methods
  //--------------------------------------------------------------
  init() {
    this.setVars();
    this.initYT();
  }

  setVars() {
    this.spacer = 60;
  }

  initYT() {
    this.createYouTubePlayerHtml();
    window.onYouTubeIframeAPIReady = () => document.body.dispatchEvent(new CustomEvent('youtube-ready'));
    document.body.addEventListener('youtube-ready', () => this.initYoutubePlayer());
    this.loadYoutubeApi();
  }

  getVideoId() {
    const src = this.dom.el.getAttribute('href');
    let result = false;

    if (src && typeof src === 'string') {
      if (src.length === 11) {
        result = src; // The src is a Youtube key, not an url
      } else {
        // eslint-disable-next-line max-len
        const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        // eslint-disable-next-line prefer-destructuring
        result = src.match(regex)[1];
      }
    } else {
      console.error('The Youtube src/href is not properly defined');
    }

    return result;
  }

  createYouTubePlayerHtml() {
    const player = `<div class="${this.prefix}__player" id="youtube-player-${this.player.guid}">
      <div id="youtube-${this.player.guid}"></div>
    </div>`;

    this.dom.el.insertAdjacentHTML('afterbegin', player);
    this.dom.player = this.dom.el.querySelector(`#youtube-player-${this.player.guid}`);
  }

  loadYoutubeApi() {
    if (typeof YT !== 'undefined') {
      this.initYoutubePlayer();
    } else if (!document.body.querySelector('#youtube-iframe-api')) {
      const tag = document.createElement('script');
      tag.id = 'youtube-iframe-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.insertAdjacentElement('beforeend', tag);
    }
  }

  initYoutubePlayer() {
    if (this.player.isInitialized || !this.player.key) return;

    this.player.isInitialized = true;

    this.player.el = new YT.Player(`youtube-${this.player.guid}`, {
      videoId: this.player.key,
      playerVars: this.player.settings,
      events: {
        onReady: () => {
          this.dom.el.addEventListener('click', (e) => this.play(e));
          this.dom.iframe = this.dom.el.querySelector('iframe');
          this.dom.iframe.tabIndex = -1;
          this.dom.el.addEventListener('keydown', (e) => this.toggleAction(e));
          this.dom.el.addEventListener('youtube:stop', () => this.stop());
        },
        onStateChange: (e) => this.onPlayerStateChange(e),
      },
    });
  }

  toggleAction(e) {
    const isPlaying = this.player.state === YT.PlayerState.PLAYING;
    const isPaused = this.player.state === YT.PlayerState.PAUSED;
    const togglePlay = e.which === this.keys.space || e.which === this.keys.enter;
    const requestStop = e.which === this.keys.escape;

    if ((isPlaying || isPaused) && requestStop) this.stop();
    else if (isPlaying && togglePlay) this.pause(e);
    else if (!isPlaying && togglePlay) this.play(e);
  }

  onPlayerStateChange(e) {
    this.player.state = e.data;
    if (this.player.state === YT.PlayerState.ENDED) this.stop(); // Video ended
  }

  play(e) {
    e.preventDefault();
    this.dom.iframe.removeAttribute('tabIndex');
    this.dom.iframe.focus({ preventScroll: true });
    this.dom.el.classList.add('is-playing');
    if (this.player.state !== YT.PlayerState.PLAYING) {
      this.player.el.playVideo();
      this.stopOthersYoutubeModules();
    }
  }

  pause(e) {
    e.preventDefault();
    if (this.player.state === YT.PlayerState.PLAYING) {
      this.player.el.pauseVideo();
    }
  }

  stop() {
    this.dom.iframe.tabIndex = -1;
    if (this.dom.play) {
      this.dom.play.focus({ preventScroll: true });
    }
    this.dom.el.classList.remove('is-playing');
    if (this.player.state === YT.PlayerState.PLAYING || this.player.state === YT.PlayerState.BUFFERING) {
      this.player.el.stopVideo();
    }
  }

  stopOthersYoutubeModules() {
    const youtubeModules = document.body.querySelectorAll('.js-video');
    youtubeModules.forEach((youtube) => {
      if (youtube !== this.dom.el) {
        youtube.dispatchEvent(new CustomEvent('youtube:stop'));
      }
    });
  }
}
