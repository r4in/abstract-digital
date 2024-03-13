import ScrollRenderer from './ScrollRenderer';
import { flash, smoothScroll } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class FlashRenderer extends ScrollRenderer {
  onEnter() {
    smoothScroll.load(
      document.querySelector('.smoothScroll__container--flash'),
      document.querySelector('.smoothScroll__height--flash'),
    );
    flash.load();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    flash.play();
  }
}
