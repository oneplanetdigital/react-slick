"use strict";

exports.__esModule = true;
exports.Dots = undefined;

var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return call && (typeof call === "object" || typeof call === "function")
    ? call
    : self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError(
      "Super expression must either be null or a function, not " +
        typeof superClass
    );
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass)
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subClass, superClass)
      : (subClass.__proto__ = superClass);
}

var getDotCount = function getDotCount(spec) {
  var dots;

  if (spec.infinite) {
    dots = Math.ceil(spec.slideCount / spec.slidesToScroll);
  } else {
    dots =
      Math.ceil((spec.slideCount - spec.slidesToShow) / spec.slidesToScroll) +
      1;
  }

  return dots;
};

var Dots = (exports.Dots = (function(_React$PureComponent) {
  _inherits(Dots, _React$PureComponent);

  function Dots() {
    _classCallCheck(this, Dots);

    return _possibleConstructorReturn(
      this,
      _React$PureComponent.apply(this, arguments)
    );
  }

  Dots.prototype.clickHandler = function clickHandler(options, e) {
    // In Autoplay the focus stays on clicked button even after transition
    // to next slide. That only goes away by click somewhere outside
    e.preventDefault();
    this.props.clickHandler(options);
  };

  Dots.prototype.render = function render() {
    var _this2 = this;

    var dotCount = getDotCount({
      slideCount: this.props.slideCount,
      slidesToScroll: this.props.slidesToScroll,
      slidesToShow: this.props.slidesToShow,
      infinite: this.props.infinite
    });

    // Apply join & split to Array to pre-fill it for IE8
    //
    // Credit: http://stackoverflow.com/a/13735425/1849458
    var _props = this.props,
      onMouseEnter = _props.onMouseEnter,
      onMouseOver = _props.onMouseOver,
      onMouseLeave = _props.onMouseLeave;

    var mouseEvents = {
      onMouseEnter: onMouseEnter,
      onMouseOver: onMouseOver,
      onMouseLeave: onMouseLeave
    };
    var dots = Array(dotCount + 1)
      .join("0")
      .split("")
      .map(function(x, i) {
        var leftBound = i * _this2.props.slidesToScroll;
        var rightBound =
          i * _this2.props.slidesToScroll + (_this2.props.slidesToScroll - 1);
        var className = (0, _classnames2.default)({
          "slick-active":
            _this2.props.currentSlide >= leftBound &&
            _this2.props.currentSlide <= rightBound
        });

        var dotOptions = {
          message: "dots",
          index: i,
          slidesToScroll: _this2.props.slidesToScroll,
          currentSlide: _this2.props.currentSlide
        };

        var onClick = _this2.clickHandler.bind(_this2, dotOptions);
        return _react2.default.createElement(
          "li",
          { key: i, className: className },
          _react2.default.cloneElement(_this2.props.customPaging(i), {
            onClick: onClick
          })
        );
      });

    return _react2.default.cloneElement(
      this.props.appendDots(dots),
      _extends(
        {
          className: this.props.dotsClass
        },
        mouseEvents
      )
    );
  };

  return Dots;
})(_react2.default.PureComponent));
