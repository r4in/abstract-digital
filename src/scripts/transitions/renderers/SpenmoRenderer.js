import ScrollRenderer from './ScrollRenderer';
import { spenmo, smoothScroll } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class SpenmoRenderer extends ScrollRenderer {
  onEnter() {
    smoothScroll.load(
      document.querySelector('.smoothScroll__container--spenmo'),
      document.querySelector('.smoothScroll__height--spenmo'),
    );
    spenmo.load();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    spenmo.play();
  }
}
