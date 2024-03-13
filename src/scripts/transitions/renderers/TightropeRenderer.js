import ScrollRenderer from './ScrollRenderer';
import { tightrope, smoothScroll } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class TightropeRenderer extends ScrollRenderer {
  onEnter() {
    smoothScroll.load(
      document.querySelector('.smoothScroll__container--tightrope'),
      document.querySelector('.smoothScroll__height--tightrope'),
    );
    tightrope.load();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    tightrope.play();
  }
}
