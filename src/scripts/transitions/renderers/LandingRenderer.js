import DefaultRenderer from './DefaultRenderer';
import { landing, menu } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class LandingRenderer extends DefaultRenderer {
  onEnterCompleted() {
    landing.load();
    menu.addScrollbar();
  }

  onLeave() {
    menu.removeScrollbar();
  }

  onLeaveCompleted() {
    super.onLeaveCompleted();
    landing.leave();
  }
}
