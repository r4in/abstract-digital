import { gsap } from 'gsap';
import debounce from 'lodash/debounce';

export default class DaysAnimation {
  constructor() {
    this.indicatorNode = null;
    this.stepNodes = null;
    this.sliderNode = null;
    this.daysNode = null;

    this.currentTimeline = null;
    this.currentStep = null;
    this.day = null;
    this.width = null;
    this.height = null;
    this.movementFactor = null;

    this.resizeFunc = debounce(() => this.handleResize(), 200);
  }

  /* * SETUP * */

  /**
   * Queries all selectors on load
   */
  querySelectors() {
    this.indicatorNode = document.querySelector('.days__indicator');
    this.stepNodes = document.querySelectorAll('.days__step');
    this.sliderNode = document.querySelector('.days__slider');
    this.daysNode = document.querySelector('.days__holder');

    this.day = [...this.daysNode.children].map((element) => ({
      element,
      sides: element.querySelectorAll('.day__sides'),
      reveal: element.querySelectorAll('.reveal--day'),
    }));
    this.width = this.stepNodes[0].clientWidth;
    this.movementFactor = (this.sliderNode.clientWidth - this.width * 4) / 3 + this.width;
    this.height = this.day[1].element.clientHeight;
  }

  /**
   * Sets all initial styles
   */
  setStyles() {
    for (let i = 1; i < this.day.length; i += 1) {
      gsap.set(this.day[i].element, {
        visibility: 'hidden',
        opacity: 0,
        zIndex: 1,
        height: this.height,
      });
      gsap.set(this.day[i].reveal, { opacity: 0 });
    }
    gsap.set(this.day[0].element, {
      visibility: 'visible',
      zIndex: 2,
      height: this.height,
    });
    gsap.set(this.indicatorNode, { width: this.stepNodes[0].clientWidth });
  }

  /**
   * Adds all event listeners
   */
  addListeners() {
    window.addEventListener('resize', this.resizeFunc);
    this.stepNodes.forEach((element) => {
      element.addEventListener('click', () => this.moveSlide(element.dataset.step));
    });
  }

  /* * ANIMATION CREATORS * */

  /**
   * Moves the indicator to the proper location
   * @param {number} to - The index of the next slide to be activated
   */
  indicatorAnimation(to) {
    gsap.to(this.indicatorNode, {
      x: this.movementFactor * to,
      ease: 'power2.out',
      duration: 0.5,
    });
  }

  /**
   * Animates the reveal of the info and crossfade of the images
   * @param {number} to - The index of the slide that is being animated to
   */
  contentAnimation(to) {
    // Makes sure to end the current timeline if it is still playing
    if (this.currentTimeline && this.currentTimeline.isActive()) {
      this.currentTimeline.progress(1).kill();
    }

    this.currentTimeline = gsap
      .timeline({ defaults: { ease: 'power1.inOut' } })
      // Make next element visible
      .set(this.day[to].element, { visibility: 'visible' })
      // Crossfade the two images
      .to(this.day[this.currentStep].element, { opacity: 0 })
      .to(this.day[to].element, { opacity: 1 }, '<')
      // Fade the current info out
      .to(this.day[this.currentStep].reveal, { opacity: 0 }, '<')
      // Prepare next info
      .set(this.day[to].reveal, { opacity: 1 })
      // Reveal info
      .from(this.day[to].reveal, {
        y: 200,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
      })
      // set z-index and visiblities for next transition
      .set(this.day[to].element, { zIndex: 2 })
      .set(
        this.day[this.currentStep].element,
        { visibility: 'hidden', zIndex: 1 },
        '<',
      );
  }

  /* * ANIMATION HANDLERS * */

  /**
   * Runs the animation based on the event
   * @param {number} to - The index of the slide that is being animated to
   */
  moveSlide(to) {
    if (to !== this.currentStep) {
      this.indicatorAnimation(to);
      this.contentAnimation(to);
      this.currentStep = to;
      document.activeElement.blur();
    }
  }

  /* * EVENT HANDLERS * */

  /**
   * Handles resizing
   */
  handleResize() {
    if (this.width !== this.stepNodes[0].clientWidth) {
      this.width = this.stepNodes[0].clientWidth;
      this.movementFactor = (this.sliderNode.clientWidth - this.width * 4) / 3 + this.width;
      gsap.to(this.indicatorNode, {
        width: this.stepNodes[0].clientWidth,
        ease: 'power2.out',
        duration: 0.5,
      });
      this.moveIndicator(this.currentStep);
    }

    gsap.timeline().set(this.day[1].element, {
      height: 'auto',
      onComplete: () => {
        gsap.set(this.day[1].element, {
          height: this.day[1].element.clientHeight,
        });

        if (this.height !== this.day[1].element.clientHeight) {
          this.height = this.day[1].element.clientHeight;
          this.day.forEach((daysObj) => {
            gsap.set(daysObj.element, {
              height: this.height,
            });
          });
        }
      },
    });
  }

  /* * LOAD AND  CLEAN UP * */

  /**
   * Handle Loading
   */
  load() {
    this.currentStep = 0;
    this.querySelectors();
    this.setStyles();
    this.addListeners();
  }

  /**
   * Handle Clean Up
   */
  leave() {
    window.removeEventListener('resize', this.resizeFunc);
  }
}
