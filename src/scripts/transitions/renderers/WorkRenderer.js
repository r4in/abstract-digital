import ScrollRenderer from './ScrollRenderer';
import { WorkAnimation, onLoad, smoothScroll } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class WorkRenderer extends ScrollRenderer {
  onEnter() {
    smoothScroll.load(
      document.querySelector('.smoothScroll__container--work'),
      document.querySelector('.smoothScroll__height--work'),
    );
    const work = new WorkAnimation();
    work.load();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    onLoad.portfolio();
  }
}
