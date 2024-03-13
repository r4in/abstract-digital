import { gsap } from 'gsap';
import debounce from 'lodash/debounce';

export default class ScrollDownAnimation {
  constructor() {
    this.scrollDown = null;
    this.backToTop = null;
    this.overlayArrow = null;
    this.scrollHolder = null;
    this.textHolder = null;

    this.boundAnimate = debounce(() => this.animateScrollDown(), 100);
    this.boundOnEnter = () => {
      this.backToTopAnimation(true);
    };

    this.boundOnExit = () => {
      this.backToTopAnimation(false);
    };

    this.boundScrollTo = () => {
      if (window.scrollY !== 0) {
        window.scrollTo(0, 0);
        this.backToTopAnimation(false);
      }
    };
  }

  querySelectors() {
    this.scrollDown = document.querySelector('.overlay__text');
    this.backToTop = document.querySelector('.overlay__text--backToTop');
    this.overlayArrow = document.querySelector('.overlay__arrow');
    this.scrollHolder = document.querySelector('.overlay__scroll');
    this.textHolder = document.querySelector('.overlay__textHolder');
  }

  addEventListeners() {
    window.addEventListener('scroll', this.boundAnimate);
    this.scrollHolder.addEventListener('mouseenter', this.boundOnEnter);
    this.scrollHolder.addEventListener('mouseleave', this.boundOnExit);
    this.scrollHolder.addEventListener('click', this.boundScrollTo);
  }

  removeEventListeners() {
    window.removeEventListener('scroll', this.boundAnimate);
    this.scrollHolder.removeEventListener('mouseenter', this.boundOnEnter);
    this.scrollHolder.removeEventListener('mouseleave', this.boundOnExit);
  }

  removeStyles() {
    gsap
      .timeline({ delay: 0.5 })
      .set(this.scrollHolder, { cursor: 'initial' })
      .set(this.scrollDown, { display: 'block' })
      .set(this.backToTop, { y: 100 })
      .set(this.scrollDown, { y: 28 })
      .set(this.overlayArrow, { rotate: '0' })
      .set(this.backToTop, { display: 'none' });
  }

  animateScrollDown() {
    if (window.scrollY === 0) {
      gsap
        .timeline({
          defaults: {
            ease: 'power2.inOut',
            duration: 0.35,
          },
        })
        .set(this.scrollDown, { display: 'block' })
        .to(this.backToTop, { y: 100 })
        .to(this.scrollDown, { y: 28 }, '<.5')
        .to(this.overlayArrow, { rotate: '0' }, '<')
        .set(this.backToTop, { display: 'none' })
        .set(this.scrollHolder, { cursor: 'initial' });
    } else {
      gsap
        .timeline({
          defaults: {
            ease: 'power2.inOut',
            duration: 0.35,
          },
        })
        .set(this.backToTop, { display: 'block' })
        .set(this.scrollHolder, { cursor: 'pointer' })
        .to(this.scrollDown, { y: -50 })
        .to(this.backToTop, { y: 28 }, '<.5')
        .to(this.overlayArrow, { rotate: '180deg' }, '<')
        .set(this.scrollDown, { display: 'none' });
    }
  }

  backToTopAnimation(isEntering) {
    if (isEntering && window.scrollY !== 0) {
      gsap
        .timeline({
          defaults: { ease: this.defaultEase, duration: 0.35 },
        })
        .to(this.overlayArrow, { y: -100 })
        .to(this.textHolder, { y: 51 }, '<');
    } else {
      gsap
        .timeline({
          defaults: { ease: this.defaultEase, duration: 0.35 },
          delay: 0.175,
        })
        .to(this.overlayArrow, { y: 0 })
        .to(this.textHolder, { y: 0 }, '<');
    }
  }

  load() {
    this.querySelectors();
    this.removeStyles();
    this.addEventListeners();
  }

  leave() {
    this.removeEventListeners();
    this.removeStyles();
  }
}
