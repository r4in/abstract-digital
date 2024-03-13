import { gsap } from 'gsap';

export default class TransitionAnimation {
  constructor() {
    this.transitionNode = document.querySelector('.transition');
    this.transitionMain = this.transitionNode.querySelector(
      '.transition__main',
    );
  }

  animateTopOpen(highwayCallback) {
    gsap
      .timeline({
        defaults: {
          ease: 'power2.in',
          duration: 0.5,
        },
        onComplete: highwayCallback,
      })
      .set(this.transitionNode, { display: 'block' })
      .set(this.transitionMain, { opacity: 1 })
      .fromTo(this.transitionMain, { yPercent: 100 }, { yPercent: 0 });
  }

  animateTopClose(highwayCallback) {
    gsap
      .timeline({
        defaults: {
          ease: 'power2.in',
          duration: 0.25,
          delay: 0.35,
        },
        onComplete: highwayCallback,
      })
      .fromTo(this.transitionMain, { opacity: 1 }, { opacity: 0 })
      .set(this.transitionNode, {
        display: 'none',
      });
  }
}
