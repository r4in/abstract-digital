import MenuAnimation from './menu';
import TransitionAnimation from './transition';
import LandingAnimation from './landing';
import DaysAnimation from './days';
import OnLoadAnimation from './on-load';
import OnEnterAnimation from './on-enter';
import SmoothScrollAnimation from './smooth-scroll';
import ScrollDownAnimation from './scroll-down';

// Load global animation
const menu = new MenuAnimation();
const transition = new TransitionAnimation();
const landing = new LandingAnimation();
const days = new DaysAnimation();
const onLoad = new OnLoadAnimation();
const spenmo = new OnEnterAnimation('spenmo', 2);
const diab = new OnEnterAnimation('diab', 3);
const tightrope = new OnEnterAnimation('tightrope', 3);
const flash = new OnEnterAnimation('flash', 3);
const smoothScroll = new SmoothScrollAnimation();
const scrollDown = new ScrollDownAnimation();
menu.load();

// Export per page animation
export { default as DaysAnimation } from './days';
export { default as WorkAnimation } from './work';
export {
  menu,
  transition,
  landing,
  days,
  onLoad,
  spenmo,
  diab,
  tightrope,
  flash,
  smoothScroll,
  scrollDown,
};
