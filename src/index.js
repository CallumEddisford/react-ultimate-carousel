import React, { Component } from "react";
import "intersection-observer";

class ReactVerticalCarousel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleIndex: 0,
      isDragging: false,
      dragStartPosition: 0,
      dragStartScrollTop: 0,
    };
    this.carouselRef = React.createRef();
    this.childrenRefs = [];
    this.observers = [];
  }

  handleIntersection = (entries, index) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        this.setState({ visibleIndex: index });
      }
    });
  };

  handleMouseDown = (e) => {
    this.setState({
      isDragging: true,
      dragStartPosition: e.clientY,
      dragStartScrollTop: this.carouselRef.current.scrollTop,
    });
    document.addEventListener("mousemove", this.handleMouseMove);
    document.addEventListener("mouseup", this.handleMouseUp);
    this.carouselRef.current.style['scroll-snap-type'] = 'none';
  };

  handleMouseMove = (e) => {
    if (this.state.isDragging) {
      const deltaY = e.clientY - this.state.dragStartPosition;
      this.carouselRef.current.scrollTop = this.state.dragStartScrollTop - deltaY;
    }
  };

  handleMouseUp = () => {
    this.setState({
      isDragging: false,
    });
    document.removeEventListener("mousemove", this.handleMouseMove);
    document.removeEventListener("mouseup", this.handleMouseUp);
    this.carouselRef.current.style['scroll-snap-type'] = 'y mandatory';
  };

  componentDidMount() {
    this.childrenRefs.forEach((childRef, index) => {
      const observer = new IntersectionObserver(
        (entries) => this.handleIntersection(entries, index),
        {
          root: null,
          rootMargin: "0px",
          threshold: this.props.threshold || "0.5",
        }
      );
      observer.observe(childRef);
      this.observers.push(observer);
    });
  }

  componentWillUnmount() {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
  }

  render() {
    const { children } = this.props;
    const { visibleIndex } = this.state;

    return (
      <div
        className="vertical-carousel"
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

export default ReactVerticalCarousel;
