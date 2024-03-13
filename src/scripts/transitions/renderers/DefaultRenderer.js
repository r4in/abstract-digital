import Highway from '@dogstudio/highway';
import { menu } from '../../animations';

/* eslint-disable class-methods-use-this */
export default class DefaultRenderer extends Highway.Renderer {
  onLeaveCompleted() {
    menu.leave();
  }
}
