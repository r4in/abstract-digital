import DefaultRenderer from './DefaultRenderer';
import { smoothScroll, scrollDown } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class ScrollRenderer extends DefaultRenderer {
  onEnterCompleted() {
    scrollDown.load();
  }

  onLeave() {
    smoothScroll.leave();
    scrollDown.leave();
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
  }
}
