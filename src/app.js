import Slider from './slider';
import './main.scss';

const arrowPrev = document.getElementById('js-prev');
const arrowNext = document.getElementById('js-next');
const slider = new Slider({
  slider: '.slider',
  slidesToScroll: 1
});

arrowPrev.addEventListener('click', (e) => {
  slider.prev();
});

arrowNext.addEventListener('click', (e) => {
  slider.next();
});