export default class {
  constructor(el) {
    this.dom = {
      el,
      select: el.querySelector('.anchors__select'),
      anchors: document.querySelectorAll('[data-anchor]'),
    };
  }

  // -- Methods
  // --------------------------------------------------------------
  init() {
    this.bindEnvents();
  }

  bindEnvents() {
    this.dom.select.addEventListener('change', () => this.goTo());
  }

  goTo() {
    const anchor = this.dom.select.value;

    if (anchor.includes('javascript')) {
      /* eslint-disable */
      const fn = anchor.replace('javascript:', '');
      eval(fn);
      /* eslint-enable */
    } else {
      const link = document.querySelector(`[href="#${anchor}"]`);
      link.click();
    }
  }
}
