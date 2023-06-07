import React, { Component } from "react";
import "intersection-observer";

class ReactUltimateCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleIndex: 0,
      isDragging: false,
      dragStartPositionY: 0,
      dragStartPositionX: 0,
      dragStartScrollTop: 0,
      dragStartScrollLeft: 0,
    };
    this.carouselRef = React.createRef();
    this.childrenRefs = [];
    this.observers = [];
    this.isVertical = this.props.axis === "vertical";
  }

  handleIntersection = (entries, index) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.setState({ visibleIndex: index });
      }
    });
  };

  handleMouseDown = (e) => {
    const { clientY, clientX } = e;
    const { scrollTop, scrollLeft } = this.carouselRef.current;
    this.setState({
      isDragging: true,
      dragStartPositionY: clientY,
      dragStartPositionX: clientX,
      dragStartScrollTop: scrollTop,
      dragStartScrollLeft: scrollLeft,
    });
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
  };

  handleMouseMove = (e) => {
    if (this.state.isDragging) {
      const { clientY, clientX } = e;
      const {
        dragStartPositionY,
        dragStartPositionX,
        dragStartScrollTop,
        dragStartScrollLeft,
      } = this.state;
      const deltaY = clientY - dragStartPositionY;
      const deltaX = clientX - dragStartPositionX;

      if (this.isVertical) {
        this.carouselRef.current.scrollTop = dragStartScrollTop - deltaY;
      } else {
        this.carouselRef.current.scrollLeft = dragStartScrollLeft - deltaX;
      }
    }
  };

  handleMouseUp = () => {
    this.setState({ isDragging: false });
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
  };

  observeIntersection = (childRef, index) => {
    const observer = new IntersectionObserver(
      (entries) => this.handleIntersection(entries, index),
      {
        root: null,
        rootMargin: "0px",
        threshold: this.props.threshold || 0.5,
      }
    );
    observer.observe(childRef);
    this.observers.push(observer);
  };

  navigateSlide = (direction) => {
    const { visibleIndex } = this.state;
    const numSlides = React.Children.count(this.props.children);
    let newIndex;

    if (direction === "next") {
      newIndex = (visibleIndex + 1) % numSlides;
    } else if (direction === "previous") {
      newIndex = (visibleIndex - 1 + numSlides) % numSlides;
    }

    this.carouselRef.current.scrollTo({
      top: 0,
      left: newIndex * this.carouselRef.current.offsetWidth,
      behavior: "smooth",
    });

    this.setState({ visibleIndex: newIndex });
  };

  componentDidMount() {
    this.childrenRefs.forEach(this.observeIntersection);
  }

  componentWillUnmount() {
    this.observers.forEach((observer) => observer.disconnect());
  }

  componentDidUpdate(prevProps, prevState) {
    const { visibleIndex } = this.state;
    if (visibleIndex !== prevState.visibleIndex && this.props.onChange) {
      this.props.onChange(visibleIndex);
    }
  }

  render() {
    const { children } = this.props;
    const { visibleIndex, isDragging } = this.state;

    const style = {
      scrollSnapType: isDragging ? "none" : `${this.isVertical ? "y" : "x"} mandatory`,
      whiteSpace: this.isVertical ? "normal" : "nowrap",
    };
    

    return (
      // <button onClick={() => this.navigateSlide("previous")}>Previous</button>
      // <button onClick={() => this.navigateSlide("next")}>Next</button>
      <div
        style={style}
        className="carousel"
        ref={this.carouselRef}
        onMouseDown={this.handleMouseDown}
      >
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, {
            key: index,
            isActive: index === visibleIndex,
            innerRef: (ref) => (this.childrenRefs[index] = ref),
          })
        )}
      </div>
    );
  }
}

export default ReactUltimateCarousel;
