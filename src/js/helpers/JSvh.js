import debounce from 'lodash/debounce';

/**
 * JSvh
 * Create a CSS native var corresponding to a vh unit.
 * Fix the iOS vh issue by using a JS value
 * Instead of .item { height: 20vh; } use .item { height: vh(20); }
 * Need the scss function in abstract/functions/_vh.scss to work
 * Inspired by: Jonas Sandstedt
 * https://chanind.github.io/javascript/2019/09/28/avoid-100vh-on-mobile-web.html
 */

export default class JSvh {
  constructor() {
    this.vh = 0;

    this.init();
  }

  init() {
    this.update();

    window.addEventListener('resize', debounce(() => this.update(), 300));
    window.addEventListener('orientationchange', debounce(() => this.update(), 300));
  }

  update() {
    this.vh = window.innerHeight / 100;
    JSvh.setVar(this.vh);
  }

  static setVar(vh) {
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
}
