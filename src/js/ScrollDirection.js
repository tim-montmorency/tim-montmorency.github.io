import throttle from 'lodash/throttle';

export default class {
  constructor(el) {
    this.dom = {
      el,
    };
  }

  // -- Methods
  // --------------------------------------------------------------
  init() {
    this.bindEvents();
  }

  bindEvents() {
    window.addEventListener('scroll', throttle(() => this.update(), 300));
  }

  update() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const isScrollingDown = scrollY > this.previousScrollY;

    if (isScrollingDown) {
      document.documentElement.classList.add('is-scrolling-down');
      document.documentElement.classList.remove('is-scrolling-up');

      if (scrollY > 100) document.documentElement.classList.remove('is-on-top');
    } else {
      document.documentElement.classList.add('is-scrolling-up');
      document.documentElement.classList.remove('is-scrolling-down');

      if (scrollY < 100) document.documentElement.classList.add('is-on-top');
    }

    this.previousScrollY = scrollY <= 0 ? 0 : scrollY;
  }
}
