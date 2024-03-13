import ScrollRenderer from './ScrollRenderer';
import { onLoad, smoothScroll } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class AboutRenderer extends ScrollRenderer {
  onEnter() {
    smoothScroll.load(
      document.querySelector('.smoothScroll__container--about'),
      document.querySelector('.smoothScroll__height--about'),
    );
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    onLoad.about();
  }
}
