import MobileDetect from 'mobile-detect';

const md = new MobileDetect(window.navigator.userAgent, 767);
if (md.mobile() && !md.tablet()) {
  window.location.replace('https://m.abstract.ph');
}
