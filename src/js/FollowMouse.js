import throttle from 'lodash/throttle';

export default class {
  constructor(el) {
    this.dom = {
      el,
      parent: el.parentElement,
    };
  }

  // -- Methods
  // --------------------------------------------------------------
  init() {
    this.setVars();
    this.bindEvents();
  }

  setVars() {
    this.parentRect = this.dom.parent.getBoundingClientRect();
    this.elRect = this.dom.el.getBoundingClientRect();
    this.max = {
      top: this.parentRect.height - this.elRect.height,
      left: this.parentRect.width - this.elRect.width,
    };
  }

  bindEvents() {
    this.dom.parent.addEventListener('mousemove', throttle((e) => this.move(e), 50));
  }

  move(e) {
    let top = e.clientY - this.parentRect.top;
    let left = e.clientX - this.parentRect.left;

    top = Math.min(top, this.max.top);
    left = Math.min(left, this.max.left);

    this.dom.el.style.transform = `translate3d(${left}px, ${top}px, 0)`;
  }
}
