import '../scss/main.scss';
import 'mdn-polyfills/CustomEvent';
import 'mdn-polyfills/NodeList.prototype.forEach';

/* eslint-disable global-require */

const Modules = {
  Youtube: require('./Youtube').default,
};

window.dom = {
  body: document.body,
  html: document.documentElement,
};

/**
 * Init - Instanciate and initialize Modules and/or Pages in the element provided
 * @param {element} [el=window.dom.body] - the element to search into for data-[type]
 * @param {array.<string>|string} [types=['module']]
 */
window.init = function init(el = window.dom.body, types = ['module']) {
  const currentTypes = typeof types === 'string' ? [types] : types;

  if (!Array.isArray(types)) return;

  currentTypes.forEach((type) => {
    if (type !== 'module' && type !== 'page') return;

    const attr = `data-${type}`;
    const classes = Modules;
    const items = el.querySelectorAll(`[${attr}]`);
    const styles = 'background: \'#18314f\'; color: #fff; padding: 0 0.25em;';

    items.forEach((item) => {
      const list = item.getAttribute(attr).split(/\s+/);

      list.forEach((name) => {
        if (classes[name] !== undefined) {
          console.log(`%c✔️${name}%O`, styles, { el: item });
          new classes[name](item).init();
        } else if (classes.Default !== undefined) {
          console.warn(`%c⚠️${name}%O`, styles, { el: item });
          new classes.Default(item).init();
        } else {
          console.error(`%c❌️${name}%O`, styles, { el: item });
        }
      });
    });
  });
};

if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
  window.init(window.dom.body);
} else {
  document.addEventListener('DOMContentLoaded', window.init(window.dom.body));
}
