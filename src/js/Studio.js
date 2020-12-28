export default class {
  constructor(el) {
    this.dom = {
      el,
      smallMask: el.querySelector('.js-small-mask'),
      largeMask: el.querySelector('.js-large-mask'),
      smallCard: el.querySelector('.js-small-card'),
      largeCard: el.querySelector('.js-large-card'),
    };
  }

  // -- Methods
  // --------------------------------------------------------------
  init() {
    this.bindEnvents();
  }

  bindEnvents() {
    this.dom.smallCard.addEventListener('mouseenter', () => this.dom.largeMask.classList.add('is-visible'));
    this.dom.largeCard.addEventListener('mouseenter', () => this.dom.smallMask.classList.add('is-visible'));
    this.dom.smallCard.addEventListener('mouseleave', () => this.dom.largeMask.classList.remove('is-visible'));
    this.dom.largeCard.addEventListener('mouseleave', () => this.dom.smallMask.classList.remove('is-visible'));
  }
}
