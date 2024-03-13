import Highway from '@dogstudio/highway';
import { transition } from '../animations';

/* eslint-disable */
export default class Fade extends Highway.Transition {
  in({ from, to, done }) {
    from.remove();
    transition.animateTopClose(done);
  }
  out({ from, done }) {
    window.scrollTo(0, 0);
    transition.animateTopOpen(done);
  }
}
