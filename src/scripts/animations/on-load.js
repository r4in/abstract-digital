import lottie from 'lottie-web';
import portfolioAnimData from './lottie-files/portfolio.json';
import sprintAnimData from './lottie-files/sprint.json';
import aboutAnimData from './lottie-files/about.json';

// Temporary class until on enter animation is created for these pages
/* eslint-disable class-methods-use-this */
export default class OnLoadAnimations {
  /**
   * Loads portfolio animation
   */
  portfolio() {
    lottie.loadAnimation({
      container: document.querySelector('.lottie__hero--portfolio'),
      renderer: 'svg',
      animationData: portfolioAnimData,
      autoplay: true,
    });
  }

  /**
   * Loads sprint animation
   */
  sprint() {
    lottie.loadAnimation({
      container: document.querySelector('.lottie__hero--sprint'),
      renderer: 'svg',
      animationData: sprintAnimData,
      autoplay: true,
    });
  }

  /**
   * Loads about animation
   */
  about() {
    lottie.loadAnimation({
      container: document.querySelector('.lottie__hero--about'),
      renderer: 'svg',
      animationData: aboutAnimData,
      autoplay: true,
    });
  }
}
