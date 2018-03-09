export default class Slider {
  constructor(options) {
    this.options = options;
    this.slider = document.querySelector(options.slider);
    this.track = this.slider.querySelector('.slider-track');
    this.activeItem = this.slider.querySelector('.item.active');
    this.items = this.slider.querySelectorAll('.item');
    this.current = 0;
    
    this.slotWidth = this.getSlotWidth();
    this.maxItemsInView = parseInt(this.slider.offsetWidth / this.slotWidth, 10);
    this.nextLimit = this.items.length - this.maxItemsInView;
    
    console.log('nextlimit', this.nextLimit);
    
    this.setItemsStyle();
    this.setTrackStyle();
  }
  
  setItemsStyle() {
    const style = this.getComputedStyle();
    
    for (let i = 0; i  < this.items.length; i += 1) {
      this.items[i].style.width = `${style.width}px`;
      this.items[i].style.marginLeft = `${style.marginLeft}px`;
      this.items[i].style.marginRight = `${style.marginRight}px`;
    }
  }
  
  setTrackStyle() {
    this.track.style.width = `${this.slotWidth * this.items.length}px`;
    
    if (this.items.length <= this.maxItemsInView) {
      this.track.style.margin = '0 auto';
    }
  }
  
  getSlotWidth() {
    const style = this.getComputedStyle();
    return this.activeItem.offsetWidth + style.marginLeft + style.marginRight;
  }
  
  getComputedStyle() {
    const style = window.getComputedStyle(this.activeItem);
    const left = parseInt(style.marginLeft, 10);
    const right = parseInt(style.marginRight, 10);
    
    return {
      width: this.activeItem.offsetWidth,
      marginLeft: left,
      marginRight: right
    };
  }
  
  prev() {
    this.current -= this.options.slidesToScroll || 1;
    if (this.current < 0) {
      this.current = 0;  
    }
    this.navigate('prev');
  }
  
  next() {
    this.current += this.options.slidesToScroll || 1;
    if (this.current > this.nextLimit) {
      this.current = this.nextLimit;  
    }
    this.navigate('next'); 
  }
  
  navigate(direction) {
    console.log(this.current);
    
    if (this.items.length <= this.maxItemsInView) return;
    
    const margin = this.current * this.slotWidth;
    this.track.style.marginLeft = `-${margin}px`;
    
    this.removeActiveClassFromItems();
    this.items[this.current].classList.add('active');
  }
  
  removeActiveClassFromItems() {
    for (let i = 0; i < this.items.length; i += 1) {
      this.items[i].classList.remove('active');
    }
  }
}