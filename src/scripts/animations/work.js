import { gsap } from 'gsap';

export default class WorkAnimation {
  constructor() {
    this.workNodes = document.querySelectorAll('.work');
    this.work = [...this.workNodes].map((element) => ({
      element,
      image: element.querySelector('.work__image'),
    }));
  }

  hideWork(selectedElement) {
    this.work.forEach((workObj) => {
      if (workObj.element !== selectedElement) {
        gsap.to(workObj.element, {
          opacity: 0.2,
          duration: 0.25,
          ease: 'power2.out',
        });
      } else {
        gsap.to(workObj.element, {
          scale: 1.05,
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(workObj.image, {
          scale: 1,
          duration: 0.25,
          ease: 'power2.out',
        });
      }
    });
  }

  showWork() {
    this.work.forEach((workObj) => {
      gsap.to(workObj.element, {
        opacity: 1,
        scale: 1,
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to(workObj.image, {
        scale: 1.05,
        duration: 0.25,
        ease: 'power2.out',
      });
    });
  }

  load() {
    this.work.forEach((workObj) => {
      workObj.element.addEventListener('mouseenter', (event) => this.hideWork(event.target));
      workObj.element.addEventListener('mouseleave', () => this.showWork());
      gsap.set(workObj.image, { scale: 1.05 });
    });
  }
}
