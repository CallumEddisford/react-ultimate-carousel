import React, { Component } from "react";
import "intersection-observer";

class ReactUltimateCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleIndex: props.startingIndex || 0,
      isDragging: false,
    };
    this.carouselRef = React.createRef();
    this.childrenRefs = [];
    this.observers = [];
    this.isVertical = this.props.axis === "vertical";
    this.draggable = this.props.isDraggable === undefined ? true : this.props.isDraggable;
  }

  handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const children = Array.from(this.carouselRef.current.children);
        const visibleIndex = children.indexOf(entry.target);
        this.setState({ visibleIndex });
      }
    });
  };
  
  handleMouseDown = (e) => {
    if (!this.draggable) return;
    const { clientY, clientX } = e;
    const { scrollTop, scrollLeft } = this.carouselRef.current;
    this.setState({
      isDragging: true,
      dragStartPosition: {
        clientY,
        clientX,
        scrollTop,
        scrollLeft
      },
    });
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseMove = (e) => {
    if (this.state.isDragging) {
      const { clientY, clientX } = e;
      const { clientY: startY, clientX: startX, scrollTop, scrollLeft } = this.state.dragStartPosition;
      const deltaY = clientY - startY;
      const deltaX = clientX - startX;

      if (this.isVertical) this.carouselRef.current.scrollTop = scrollTop - deltaY;
      else this.carouselRef.current.scrollLeft = scrollLeft - deltaX;
    }
  };

  handleMouseUp = () => {
    const { isDragging } = this.state;
    if (isDragging) {
      const carousel = this.carouselRef.current;
      const { offsetHeight, offsetWidth } = carousel.children[this.state.visibleIndex];
      const newIndex = Math.round(this.isVertical ? carousel.scrollTop / offsetHeight : carousel.scrollLeft / offsetWidth);

      if (this.isVertical) carousel.children[newIndex].scrollIntoView({ behavior: "smooth", block: "start" });
      else carousel.children[newIndex].scrollIntoView({ behavior: "smooth", inline: "start" });
      this.setState({ visibleIndex: newIndex });
    }

    this.setState({ isDragging: false });
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  observeIntersection = (childRef) => {
    const observer = new IntersectionObserver((entries) => this.handleIntersection(entries), {
      threshold: this.props.threshold || 0.5
    });
    observer.observe(childRef);
    this.observers.push(observer);
  };

  navigateSlide = (directionOrIndex) => {
    const { visibleIndex } = this.state;
    const numSlides = React.Children.count(this.props.children);
    const isIndex = typeof directionOrIndex === "number";

    let newIndex;
    if (isIndex) {
      newIndex = directionOrIndex % numSlides;
      if (newIndex < 0) {
        newIndex = (newIndex + numSlides) % numSlides;
      }
    } else if (directionOrIndex === "next") {
      newIndex = (visibleIndex + 1) % numSlides;
    } else if (directionOrIndex === "previous") {
      newIndex = (visibleIndex - 1 + numSlides) % numSlides;
    }

    const { current: carousel } = this.carouselRef;

    if (this.isVertical) {
      const { offsetHeight } = carousel;
      const { top: carouselTop } = carousel.getBoundingClientRect();
      const { top: slideTop } = this.childrenRefs[newIndex].getBoundingClientRect();
      const { height: slideHeight } = this.childrenRefs[newIndex].getBoundingClientRect();
      const scrollTop = carousel.scrollTop + slideTop - carouselTop - offsetHeight / 2 + slideHeight / 2;
      carousel.scrollTo({
        top: scrollTop,
        behavior: isIndex ? "instant" : "smooth",
      });
    } else {
      const offsetWidth = carousel.offsetWidth;
      carousel.scrollTo({
        left: newIndex * offsetWidth,
        behavior: isIndex ? "instant" : "smooth",
      });
    }

    this.setState({ visibleIndex: newIndex });
  };

  componentDidMount() {
    this.childrenRefs.forEach(this.observeIntersection);
    const { startingIndex } = this.props;
    if (startingIndex && startingIndex >= 0 && startingIndex < this.childrenRefs.length) {
      if (this.isVertical) {
        const { offsetHeight } = this.carouselRef.current;
        const { top: carouselTop } = this.carouselRef.current.getBoundingClientRect();
        const { top: slideTop } = this.childrenRefs[startingIndex].getBoundingClientRect();
        const { height: slideHeight } = this.childrenRefs[startingIndex].getBoundingClientRect();
        const scrollTop = this.carouselRef.current.scrollTop + slideTop - carouselTop - offsetHeight / 2 + slideHeight / 2;
        this.carouselRef.current.scrollTo({
          top: scrollTop,
          behavior: "instant",
        });
      } else {
        this.carouselRef.current.scrollTo({
          left: startingIndex * this.carouselRef.current.offsetWidth,
          behavior: "instant",
        });
      }
      this.setState({ visibleIndex: startingIndex });
    }
  }

  componentWillUnmount() {
    this.observers.forEach((observer) => observer.disconnect());
  }

  componentDidUpdate(prevProps, prevState) {
    const { visibleIndex } = this.state;
    if (visibleIndex !== prevState.visibleIndex && this.props.onChange) this.props.onChange(visibleIndex);

    if (this.props.children.length > prevProps.children.length) {
      const newSlides = this.props.children.slice(prevProps.children.length);
      newSlides.forEach((_, index) => {
        const newIndex = prevProps.children.length + index;
        const childRef = this.childrenRefs[newIndex];
        if (childRef) this.observeIntersection(childRef, newIndex);
      });
    }
  }

  render() {
    const { children, className } = this.props;
    const { visibleIndex, isDragging } = this.state;

    const style = {
      scrollSnapType: isDragging ? "none" : `${this.isVertical ? "y" : "x"} mandatory`,
      whiteSpace: this.isVertical ? "normal" : "nowrap",
    };

    return (
      <>
        <div
          style={style}
          className={className ? `carousel ${className}` : "carousel"}
          ref={this.carouselRef}
          onMouseDown={this.handleMouseDown}
        >
          {React.Children.map(children, (child, index) =>
            React.cloneElement(child, {
              key: index,
              isActive: index === visibleIndex,
              innerRef: (ref) => (this.childrenRefs[index] = ref),
              navigateSlide: this.navigateSlide
            })
          )}
        </div>
        {this.props.renderControls &&
          this.props.renderControls({
            navigateSlide: this.navigateSlide,
            visibleIndex: this.state.visibleIndex
          })}
      </>
    );
  }
}

export default ReactUltimateCarousel;
