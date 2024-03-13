import Highway from '@dogstudio/highway';
import {
  ProcessRenderer,
  ScrollRenderer,
  LandingRenderer,
  WorkRenderer,
  AboutRenderer,
  FlashRenderer,
  SpenmoRenderer,
  DiabRenderer,
  TightropeRenderer,
} from './renderers/index';
import Fade from './transitions';

const road = new Highway.Core({
  transitions: {
    default: Fade,
  },
  renderers: {
    process: ProcessRenderer,
    scroll: ScrollRenderer,
    landing: LandingRenderer,
    work: WorkRenderer,
    about: AboutRenderer,
    flash: FlashRenderer,
    spenmo: SpenmoRenderer,
    diab: DiabRenderer,
    tightrope: TightropeRenderer,
  },
});

const links = document.querySelectorAll('.mainNav__link--main');
// eslint-disable-next-line
road.on("NAVIGATE_IN", ({ to, location }) => {
  for (let i = 0; i < links.length; i += 1) {
    const link = links[i];

    link.classList.remove('mainNav__link--active');

    if (link.href === location.href) {
      link.classList.add('mainNav__link--active');
    }
  }
});

// eslint-disable-next-line
road.on("NAVIGATE_END", ({ from, to, location }) => {
  // Analytics
  if (typeof gtag !== 'undefined') {
    // eslint-disable-next-line
    gtag("js", new Date());
    // eslint-disable-next-line
    gtag("config", "UA-167307387-1", {
      page_path: location.pathname,
      page_title: to.page.title,
      page_location: location.href,
    });
  }
});
