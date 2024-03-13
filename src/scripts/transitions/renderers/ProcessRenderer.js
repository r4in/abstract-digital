import ScrollRenderer from './ScrollRenderer';
import { days, onLoad, smoothScroll } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ProcessRenderer extends ScrollRenderer {
  onEnter() {
    smoothScroll.load(
      document.querySelector('.smoothScroll__container--process'),
      document.querySelector('.smoothScroll__height--process'),
    );
    days.load();
  }

  onEnterCompleted() {
    super.onEnterCompleted();
    onLoad.sprint();
  }

  onLeave() {
    super.onLeave();
    days.leave();
  }
}
