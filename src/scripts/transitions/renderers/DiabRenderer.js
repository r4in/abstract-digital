import ScrollRenderer from './ScrollRenderer';
import { diab, smoothScroll } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class DiabRenderer extends ScrollRenderer {
  onEnter() {
    smoothScroll.load(
      document.querySelector('.smoothScroll__container--diab'),
      document.querySelector('.smoothScroll__height--diab'),
    );
    diab.load();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    diab.play();
  }
}
