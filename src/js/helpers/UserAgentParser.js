import kebabCase from 'lodash/kebabCase';
import UAParser from 'ua-parser-js';

/**
 * UserAgentParser
 * identify browser, engine, OS, CPU, and device type/model from user agent string and
 * add the browser name & OS name to <html> classes
 */
export default class UserAgentParser {
  constructor() {
    this.result = new UAParser().getResult();
  }

  addClasses() {
    const browser = kebabCase(this.result.browser.name);
    const os = kebabCase(this.result.os.name);
    const type = this.result.device.type || 'desktop';

    document.documentElement.classList.add(browser, os, type);
  }
}
