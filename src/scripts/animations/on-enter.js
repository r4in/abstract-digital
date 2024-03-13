import lottie from 'lottie-web';
import { gsap } from 'gsap';
import spenmoAnimData from './lottie-files/spenmo.json';
import diabAnimData from './lottie-files/diab.json';
import tightropeAnimData from './lottie-files/tightrope.json';
import flashAnimData from './lottie-files/flash.json';

export default class OnEnterAnimation {
  constructor(page, numberOfImages) {
    this.page = page;
    this.numberOfImages = numberOfImages;

    this.h1Node = null;
    this.labelNode = null;
    this.lineNode = null;
    this.letterNode = null;
    this.images = [];

    this.lottieNode = null;
    this.lottieAnimation = null;

    this.mainTimeline = null;
    this.lineLoopTimeline = null;

    this.animData = null;
    switch (page) {
      case 'spenmo':
        this.animData = spenmoAnimData;
        break;
      case 'diab':
        this.animData = diabAnimData;
        break;
      case 'tightrope':
        this.animData = tightropeAnimData;
        break;

      case 'flash':
      default:
        this.animData = flashAnimData;
        break;
    }
  }

  /* * SETUP * */

  /**
   * Queries all selectors on load
   */
  querySelectors() {
    this.h1Node = document.querySelector(`.onEnter__h1--${this.page}`);
    this.labelNode = document.querySelector(`.onEnter__label--${this.page}`);
    this.lineNode = document.querySelector(`.onEnter__line--${this.page}`);
    this.letterNode = document.querySelector(`.onEnter__letter--${this.page}`);
    for (let i = 1; i <= this.numberOfImages; i += 1) {
      this.images.push(
        document.querySelector(`.onEnter__image--${this.page}${i}`),
      );
    }

    this.overlayNode = document.querySelector('.overlay');

    this.lottieNode = document.querySelector(`.lottie__hero--${this.page}`);
  }

  /**
   * Creates lottie animation depending onthe page loaded
   */
  generateWriteOnAnimation() {
    this.lottieAnimation = lottie.loadAnimation({
      container: this.lottieNode,
      animationData: this.animData,
      renderer: 'svg',
      autoplay: false,
    });
  }

  /**
   * Creates timeline animating the different elements depending on the page loaded
   */
  generateOnEnterAnimation() {
    this.timeline = gsap
      .timeline({
        paused: true,
        delay: 0.2,
        defaults: {
          duration: 0.4,
          ease: 'power3.out',
        },
      })
      .add(this.imageAnimation())
      .from(this.letterNode, { duration: 0.75, opacity: 0 }, '>-0.15')
      .fromTo(this.h1Node, { opacity: 0, y: 200 }, { opacity: 1, y: 0 }, '<.35')
      .fromTo(
        this.labelNode,
        { opacity: 0, y: 200 },
        {
          opacity: 1,
          y: 0,
        },
        '<.15',
      )
      .fromTo(
        this.lineNode,
        { clipPath: 'inset(0 -2px 100%)' },
        {
          clipPath: 'inset(0 -2px 0%)',
        },
      )
      .from(this.overlayNode, { delay: 0.25, duration: 0.75, opacity: 0 }, '<');
  }

  /**
   * Creates the timeline that animates each image
   */
  imageAnimation() {
    const timeline = gsap.timeline({
      defaults: {
        duration: 0.4,
        ease: 'back.inOut(0.5)',
      },
    });

    this.images.forEach((image) => {
      timeline.fromTo(
        image,
        {
          scale: 3,
          opacity: 0,
          y: -400,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
        },
        '<.15',
      );
    });

    return timeline;
  }

  /* * LOAD * */

  /**
   * Generates all the animations
   */
  load() {
    this.querySelectors();
    this.generateWriteOnAnimation();
    this.generateOnEnterAnimation();
  }

  /**
   * Plays the animation when onEnterCompleted() is called
   */
  play() {
    this.lottieAnimation.play();
    this.timeline.play();
  }
}
