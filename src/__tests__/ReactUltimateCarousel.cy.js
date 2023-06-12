import React from "react";
import ReactUltimateCarousel from "../../dist/index.min.js";
import "../../lib/styles/carousel.min.css";
import "./test-styles.css";

describe("<ReactUltimateCarousel />", () => {
  const slides = new Array(5).fill(0);

  const Slide = ({ index, isActive, innerRef }) => (
    <div ref={innerRef} className="slide">
      Slide {index} {isActive ? "is active" : "is not active"}
    </div>
  );

  it("renders correctly", () => {
    cy.mount(
      <div className="carousel--container">
        <ReactUltimateCarousel>
          {slides.map((_, index) => (
            <Slide key={`slide-${index}`} index={index} />
          ))}
        </ReactUltimateCarousel>
      </div>
    );

    cy.get(".slide").should("have.length", 5);
  });

  it("renders correctly vertically", () => {
    cy.mount(
      <div className="carousel--container vertical">
        <ReactUltimateCarousel axis="vertical">
          {slides.map((_, index) => (
            <Slide key={`slide-${index}`} index={index} />
          ))}
        </ReactUltimateCarousel>
      </div>
    );

    cy.get(".slide").should("have.length", 5);
  });

  it("renders correctly at initial slide", () => {
    cy.mount(
      <div className="carousel--container">
        <ReactUltimateCarousel startingIndex="4">
          {slides.map((_, index) => (
            <Slide key={`slide-${index}`} index={index} />
          ))}
        </ReactUltimateCarousel>
      </div>
    );

    cy.get(".slide").contains("Slide 4 is active");
  });

  it("onChange gets called when slide changes", () => {
    const results = [];
    cy.mount(
      <div className="carousel--container">
        <ReactUltimateCarousel
          onChange={(v) => {
            results.push(v);
          }}
        >
          {slides.map((_, index) => (
            <Slide key={`slide-${index}`} index={index} />
          ))}
        </ReactUltimateCarousel>
      </div>
    );

    cy.get(".carousel").trigger("mousedown", {
      button: 0,
      clientX: 300,
      clientY: 300,
    });
    cy.get(".carousel").trigger("mousemove", { clientX: 0, clientY: 300 });
    cy.get(".carousel").trigger("mouseup");

    cy.wrap(results).should("deep.eq", [1]);

    cy.get(".carousel").trigger("mousedown", {
      button: 0,
      clientX: 300,
      clientY: 300,
    });
    cy.get(".carousel").trigger("mousemove", { clientX: 0, clientY: 300 });
    cy.get(".carousel").trigger("mouseup");

    cy.wrap(results).should("deep.eq", [1, 2]);
  });

  it("renders correctly with controls", () => {
    cy.viewport(500, 600);
    cy.mount(
      <div className="carousel--container">
        <ReactUltimateCarousel
          renderControls={({ navigateSlide, visibleIndex }) => (
            <div className="controls">
              <button onClick={() => navigateSlide("previous")}>
                Previous
              </button>
              <button onClick={() => navigateSlide("next")}>Next</button>
              <p>Current Slide: {visibleIndex + 1}</p>
            </div>
          )}
        >
          {slides.map((_, index) => (
            <Slide key={`slide-${index}`} index={index} />
          ))}
        </ReactUltimateCarousel>
      </div>
    );
  });

  it("calling navigateSlide with next and previous", () => {
    cy.viewport(500, 600);
    cy.mount(
      <div className="carousel--container">
        <ReactUltimateCarousel
          renderControls={({ navigateSlide, visibleIndex }) => (
            <div className="controls">
              <button id="previous" onClick={() => navigateSlide("previous")}>
                Previous
              </button>
              <button id="next" onClick={() => navigateSlide("next")}>
                Next
              </button>
              <p>Current Slide: {visibleIndex}</p>
            </div>
          )}
        >
          {slides.map((_, index) => (
            <Slide key={`slide-${index}`} index={index} />
          ))}
        </ReactUltimateCarousel>
      </div>
    );

    cy.get(".controls p").contains("Current Slide: 0");
    cy.get("#next").click();
    cy.get(".slide").contains("Slide 1 is active");
    cy.get(".controls p").contains("Current Slide: 1");
    cy.get("#previous").click();
    cy.get(".slide").contains("Slide 0 is active");
    cy.get(".controls p").contains("Current Slide: 0");
  });

  it("scrolls to the specified slide when calling navigateSlide with a number", () => {
    cy.viewport(500, 600);
    cy.mount(
      <div className="carousel--container">
        <ReactUltimateCarousel
          renderControls={({ navigateSlide, visibleIndex }) => (
            <div className="controls">
              <button onClick={() => navigateSlide("previous")}>
                Previous
              </button>
              <button onClick={() => navigateSlide("next")}>Next</button>
              <button id="goToSlide2" onClick={() => navigateSlide(2)}>
                Go to Slide 2
              </button>
              <p>Current Slide: {visibleIndex}</p>
            </div>
          )}
        >
          {slides.map((_, index) => (
            <Slide key={`slide-${index}`} index={index} />
          ))}
        </ReactUltimateCarousel>
      </div>
    );

    cy.get(".controls p").contains("Current Slide: 0");
    cy.get("#goToSlide2").click();
    cy.get(".slide").contains("Slide 2 is active");
    cy.get(".controls p").contains("Current Slide: 2");
  });

  it("scrolls the carousel when dragging with the mouse", () => {
    cy.viewport(500, 600);
    cy.mount(
      <div className="carousel--container">
        <ReactUltimateCarousel>
          {slides.map((_, index) => (
            <Slide key={`slide-${index}`} index={index} />
          ))}
        </ReactUltimateCarousel>
      </div>
    );

    cy.get(".carousel").trigger("mousedown", {
      button: 0,
      clientX: 300,
      clientY: 300,
    });
    cy.get(".carousel").trigger("mousemove", { clientX: 0, clientY: 300 });
    cy.get(".carousel").trigger("mouseup");

    cy.get(".slide").contains("Slide 1 is active");

    cy.get(".carousel").trigger("mousedown", {
      button: 0,
      clientX: 300,
      clientY: 300,
    });
    cy.get(".carousel").trigger("mousemove", { clientX: 0, clientY: 300 });
    cy.get(".carousel").trigger("mouseup");

    cy.get(".slide").contains("Slide 2 is active");

    cy.get(".carousel").trigger("mousedown", {
      button: 0,
      clientX: 300,
      clientY: 300,
    });
    cy.get(".carousel").trigger("mousemove", { clientX: 0, clientY: 300 });
    cy.get(".carousel").trigger("mouseup");

    cy.get(".slide").contains("Slide 3 is active");

    cy.get(".carousel").trigger("mousedown", {
      button: 0,
      clientX: 300,
      clientY: 300,
    });
    cy.get(".carousel").trigger("mousemove", { clientX: 600, clientY: 300 });
    cy.get(".carousel").trigger("mouseup");

    cy.get(".slide").contains("Slide 2 is active");
  });
});
