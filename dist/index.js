"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
require("intersection-observer");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ReactUltimateCarousel = /*#__PURE__*/function (_Component) {
  _inherits(ReactUltimateCarousel, _Component);
  var _super = _createSuper(ReactUltimateCarousel);
  function ReactUltimateCarousel(props) {
    var _this;
    _classCallCheck(this, ReactUltimateCarousel);
    _this = _super.call(this, props);
    _defineProperty(_assertThisInitialized(_this), "handleIntersection", function (entries, index) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          _this.setState({
            visibleIndex: index
          });
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseDown", function (e) {
      var clientY = e.clientY,
        clientX = e.clientX;
      var _this$carouselRef$cur = _this.carouselRef.current,
        scrollTop = _this$carouselRef$cur.scrollTop,
        scrollLeft = _this$carouselRef$cur.scrollLeft;
      _this.setState({
        isDragging: true,
        dragStartPosition: {
          clientY: clientY,
          clientX: clientX,
          scrollTop: scrollTop,
          scrollLeft: scrollLeft
        }
      });
      document.addEventListener("mousemove", _this.handleMouseMove);
      document.addEventListener("mouseup", _this.handleMouseUp);
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseMove", function (e) {
      if (_this.state.isDragging) {
        var clientY = e.clientY,
          clientX = e.clientX;
        var _this$state$dragStart = _this.state.dragStartPosition,
          startY = _this$state$dragStart.clientY,
          startX = _this$state$dragStart.clientX,
          scrollTop = _this$state$dragStart.scrollTop,
          scrollLeft = _this$state$dragStart.scrollLeft;
        var deltaY = clientY - startY;
        var deltaX = clientX - startX;
        if (_this.isVertical) {
          _this.carouselRef.current.scrollTop = scrollTop - deltaY;
        } else {
          _this.carouselRef.current.scrollLeft = scrollLeft - deltaX;
        }
      }
    });
    _defineProperty(_assertThisInitialized(_this), "handleMouseUp", function () {
      _this.setState({
        isDragging: false
      });
      document.removeEventListener("mousemove", _this.handleMouseMove);
      document.removeEventListener("mouseup", _this.handleMouseUp);
    });
    _defineProperty(_assertThisInitialized(_this), "observeIntersection", function (childRef, index) {
      var observer = new IntersectionObserver(function (entries) {
        return _this.handleIntersection(entries, index);
      }, {
        root: null,
        rootMargin: "0px",
        threshold: _this.props.threshold || 0.5
      });
      observer.observe(childRef);
      _this.observers.push(observer);
    });
    _defineProperty(_assertThisInitialized(_this), "navigateSlide", function (directionOrIndex) {
      var visibleIndex = _this.state.visibleIndex;
      var numSlides = _react["default"].Children.count(_this.props.children);
      var startingIndex = _this.props.startingIndex || 0;
      var newIndex;
      if (typeof directionOrIndex === "number") {
        newIndex = (directionOrIndex - startingIndex + numSlides) % numSlides;
      } else if (directionOrIndex === "next") {
        newIndex = (visibleIndex + 1) % numSlides;
      } else if (directionOrIndex === "previous") {
        newIndex = (visibleIndex - 1 + numSlides) % numSlides;
      }
      newIndex = (newIndex + startingIndex) % numSlides;
      _this.carouselRef.current.scrollTo({
        top: 0,
        left: newIndex * _this.carouselRef.current.offsetWidth,
        behavior: typeof directionOrIndex === "number" ? "instant" : "smooth"
      });
      _this.setState({
        visibleIndex: newIndex
      });
    });
    _this.state = {
      visibleIndex: props.startingIndex || 0,
      isDragging: false
    };
    _this.carouselRef = /*#__PURE__*/_react["default"].createRef();
    _this.childrenRefs = [];
    _this.observers = [];
    _this.isVertical = _this.props.axis === "vertical";
    return _this;
  }
  _createClass(ReactUltimateCarousel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.childrenRefs.forEach(this.observeIntersection);
      var startingIndex = this.props.startingIndex;
      if (startingIndex && startingIndex >= 0 && startingIndex < this.childrenRefs.length) {
        this.carouselRef.current.scrollTo({
          top: 0,
          left: startingIndex * this.carouselRef.current.offsetWidth,
          behavior: "auto"
        });
        this.setState({
          visibleIndex: startingIndex
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.observers.forEach(function (observer) {
        return observer.disconnect();
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      var visibleIndex = this.state.visibleIndex;
      if (visibleIndex !== prevState.visibleIndex && this.props.onChange) {
        this.props.onChange(visibleIndex);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var children = this.props.children;
      var _this$state = this.state,
        visibleIndex = _this$state.visibleIndex,
        isDragging = _this$state.isDragging;
      var style = {
        scrollSnapType: isDragging ? "none" : "".concat(this.isVertical ? "y" : "x", " mandatory"),
        whiteSpace: this.isVertical ? "normal" : "nowrap"
      };
      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
        style: style,
        className: "carousel",
        ref: this.carouselRef,
        onMouseDown: this.handleMouseDown
      }, _react["default"].Children.map(children, function (child, index) {
        return /*#__PURE__*/_react["default"].cloneElement(child, {
          key: index,
          isActive: index === visibleIndex,
          innerRef: function innerRef(ref) {
            return _this2.childrenRefs[index] = ref;
          }
        });
      })), this.props.renderControls && this.props.renderControls({
        navigateSlide: this.navigateSlide,
        visibleIndex: this.state.visibleIndex
      }));
    }
  }]);
  return ReactUltimateCarousel;
}(_react.Component);
var _default = ReactUltimateCarousel;
exports["default"] = _default;
