"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFontawesome = require("@fortawesome/react-fontawesome");

var _fontawesomeFreeSolid = require("@fortawesome/fontawesome-free-solid");

require("./gallery.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Gallery extends _react.Component {
  constructor(props) {
    super(props);

    _defineProperty(this, "showImg", e => {
      e.stopPropagation();
      this.setState({
        presentArr: this.props.picArr.length > 4 ? [0, 1, 2, 3, 4] : [0, 1, 2, 3, 4].splice(0, this.props.picArr.length) // 判断传入的图片 url 数组长度是否大于四个

      }, () => {
        const mask = document.getElementsByClassName('mask')[0];
        const img = document.getElementsByClassName('originalPic')[0];
        const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
        mask.style.display = 'block';
        img.style.display = 'block';
        img.style.transform = 'rotate(0)';
        img.style.top = (window.innerHeight - img.clientHeight) / 2 - 100 + 'px';
        img.style.left = (window.innerWidth - img.clientWidth) / 2 + 'px';
        imgToolBar.style.display = 'block';
        imgToolBar.style.top = img.offsetTop + img.clientHeight + 20 + 'px';
        imgToolBar.style.left = img.offsetLeft + img.clientWidth / 2 - imgToolBar.clientWidth / 2 + 'px';
      });
    });

    _defineProperty(this, "changeImg", async (index, e) => {
      e.stopPropagation();

      if (this.props.picArr.length <= 5) {
        await this.setState({
          presentIndex: index,
          deg: 90
        });
        const img = document.getElementsByClassName('originalPic')[0];
        const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
        img.style.transform = 'rotate(0)';
        img.style.top = imgToolBar.offsetTop - img.clientHeight - 20 + 'px';
        img.style.left = imgToolBar.offsetLeft - (img.clientWidth - imgToolBar.clientWidth) / 2 + 'px';
      } else {
        await this.setState({
          presentIndex: index,
          presentArr: [index - 2 >= 0 ? index - 2 : index - 2 + this.props.picArr.length, index - 1 >= 0 ? index - 1 : index - 1 + this.props.picArr.length, index, index + 1 >= this.props.picArr.length ? index + 1 - this.props.picArr.length : index + 1, index + 2 >= this.props.picArr.length ? index + 2 - this.props.picArr.length : index + 2],
          deg: 90
        });
        const img = document.getElementsByClassName('originalPic')[0];
        const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
        img.style.transform = 'rotate(0)';
        img.style.top = imgToolBar.offsetTop - img.clientHeight - 20 + 'px';
        img.style.left = imgToolBar.offsetLeft - (img.clientWidth - imgToolBar.clientWidth) / 2 + 'px';
      }
    });

    _defineProperty(this, "closeImg", () => {
      const img = document.getElementsByClassName('originalPic')[0];
      const mask = document.getElementsByClassName('mask')[0];
      const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
      mask.style.display = 'none';
      img.style.display = 'none';
      imgToolBar.style.display = 'none';
      this.setState({
        presentIndex: 0,
        deg: 90
      });
    });

    _defineProperty(this, "mouseDown", e => {
      e.preventDefault();
      e.stopPropagation();
      const enlarge = document.getElementsByClassName('enlarge')[0];
      const zone = document.getElementsByClassName('zone')[0];
      const dv = document.getElementsByClassName('originalPic')[0];
      zone.style.display = 'none';
      enlarge.style.display = 'none';
      this.setState({
        x: e.clientX,
        y: e.clientY,
        l: dv.offsetLeft,
        t: dv.offsetTop,
        isDown: true
      });
    });

    _defineProperty(this, "mouseMove", () => {
      window.onmousemove = e => {
        const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
        const img = document.getElementsByClassName('originalPic')[0];

        if (this.state.isDown === false) {
          this.moveZone(e);
        } else {
          let nx = e.clientX;
          let ny = e.clientY;
          let nl = nx - (this.state.x - this.state.l);
          let nt = ny - (this.state.y - this.state.t);
          img.style.left = nl + 'px';
          img.style.top = nt + 'px';

          if (this.state.deg === 90 || this.state.deg === 270) {
            imgToolBar.style.top = img.offsetTop + img.clientHeight + 20 + 'px';
            imgToolBar.style.left = img.offsetLeft + img.clientWidth / 2 - imgToolBar.clientWidth / 2 + 'px';
          } else {
            imgToolBar.style.top = img.offsetTop + img.clientHeight + (img.clientWidth - img.clientHeight) / 2 + 20 + 'px';
            imgToolBar.style.left = img.offsetLeft + img.clientWidth / 2 - imgToolBar.clientWidth / 2 + 'px';
          }
        }
      };
    });

    _defineProperty(this, "mouseUp", e => {
      e.stopPropagation();
      this.setState({
        isDown: false
      });
    });

    _defineProperty(this, "rotate", e => {
      e.stopPropagation();
      const img = document.getElementsByClassName('originalPic')[0];
      const imgToolBar = document.getElementsByClassName('imgToolBar')[0];

      if (this.state.deg === 270) {
        this.setState({
          deg: 0
        });
      } else {
        this.setState({
          deg: this.state.deg + 90
        });
      }

      img.style.transform = "rotate(".concat(this.state.deg, "deg)");

      if (this.state.deg === 90 || this.state.deg === 270) {
        img.style.top = img.offsetTop - (img.clientWidth - img.clientHeight) / 2 + 'px';
      } else {
        img.style.top = imgToolBar.offsetTop - 20 - img.clientHeight + 'px';
      }
    });

    _defineProperty(this, "moveZone", e => {
      const zone = document.getElementsByClassName('zone')[0];
      const enlarge = document.getElementsByClassName('enlarge')[0];
      const img = document.getElementsByClassName('originalPic')[0];
      const enlargeImg = document.getElementsByClassName('enlargeImg')[0];
      zone.style.display = 'block';
      enlarge.style.display = 'block';
      zone.style.left = e.clientX - zone.clientWidth / 2 + 'px';
      zone.style.top = e.clientY - zone.clientHeight / 2 + 'px';

      if (this.state.deg === 90 || this.state.deg === 270) {
        if (zone.offsetLeft + zone.clientWidth / 2 > img.offsetLeft && zone.offsetLeft + zone.clientWidth / 2 < img.offsetLeft + img.clientWidth && zone.offsetTop + zone.clientHeight / 2 > img.offsetTop && zone.offsetTop + zone.clientHeight / 2 < img.offsetTop + img.clientHeight) {
          enlargeImg.style.width = img.clientWidth * 2 + 'px';
          enlargeImg.style.height = img.clientHeight * 2 + 'px';

          if (this.state.deg === 90) {
            enlargeImg.style.transform = 'rotate(0deg)';
            enlargeImg.style.marginTop = 2 * (-zone.offsetTop + img.offsetTop) + 'px';
            enlargeImg.style.marginLeft = 2 * (-zone.offsetLeft + img.offsetLeft) + 'px';
          } else {
            enlargeImg.style.transform = 'rotate(180deg)';
            enlargeImg.style.marginTop = 2 * (-zone.offsetTop + img.offsetTop) + 'px';
            enlargeImg.style.marginLeft = 2 * (-zone.offsetLeft + img.offsetLeft) + 'px';
          }

          enlarge.style.top = img.clientHeight - enlarge.clientHeight + img.offsetTop + 'px';
          enlarge.style.left = img.clientWidth + img.offsetLeft + 10 + 'px';
        } else {
          zone.style.display = 'none';
          enlarge.style.display = 'none';
        }
      } else {
        if (zone.offsetLeft + zone.clientWidth / 2 > img.offsetLeft + (img.clientWidth - img.clientHeight) / 2 && zone.offsetLeft + zone.clientWidth / 2 < img.offsetLeft + img.clientWidth - (img.clientWidth - img.clientHeight) / 2 && zone.offsetTop + zone.clientWidth / 2 > img.offsetTop - (img.clientWidth - img.clientHeight) / 2 && zone.offsetTop + zone.clientHeight / 2 < img.offsetTop + img.clientHeight + (img.clientWidth - img.clientHeight) / 2) {
          zone.style.left = e.clientX - zone.clientWidth / 2 + 'px';
          zone.style.top = e.clientY - zone.clientHeight / 2 + 'px';
          enlarge.style.display = 'block';
          enlargeImg.style.width = img.clientWidth * 2 + 'px';
          enlargeImg.style.height = img.clientHeight * 2 + 'px';

          if (this.state.deg === 180) {
            enlargeImg.style.transform = 'rotate(90deg)';
            enlargeImg.style.marginLeft = 2 * (-zone.offsetLeft + img.offsetLeft) + 'px';
            enlargeImg.style.marginTop = 2 * (-zone.offsetTop + img.offsetTop) + 'px';
          } else {
            enlargeImg.style.transform = 'rotate(270deg)';
            enlargeImg.style.marginLeft = 2 * (-zone.offsetLeft + img.offsetLeft) + 'px';
            enlargeImg.style.marginTop = 2 * (-zone.offsetTop + img.offsetTop) + 'px';
          }

          enlarge.style.top = img.clientHeight - enlarge.clientHeight + img.offsetTop + (img.clientWidth - img.clientHeight) / 2 + 'px';
          enlarge.style.left = img.clientWidth + img.offsetLeft - (img.clientWidth - img.clientHeight) / 2 + 10 + 'px';
        } else {
          zone.style.display = 'none';
          enlarge.style.display = 'none';
        }
      }
    });

    _defineProperty(this, "handOver", e => {
      this.moveZone(e);
    });

    _defineProperty(this, "noBuble", e => {
      e.stopPropagation();
      e.preventDefault();
    });

    _defineProperty(this, "previousPic", e => {
      if (this.state.presentIndex !== 0) {
        this.changeImg(this.state.presentIndex - 1, e);
      } else {
        this.changeImg(this.props.picArr.length - 1, e);
      }
    });

    _defineProperty(this, "nextPic", e => {
      if (this.state.presentIndex !== this.props.picArr.length - 1) {
        this.changeImg(this.state.presentIndex + 1, e);
      } else {
        this.changeImg(0, e);
      }
    });

    _defineProperty(this, "picView", picArr => {
      const picList = this.state.presentArr.map(item => _react.default.createElement("li", {
        key: item,
        onClick: e => {
          this.changeImg(item, e);
        }
      }, _react.default.createElement("img", {
        src: picArr[item],
        alt: ""
      })));
      return _react.default.createElement("div", {
        className: "picView"
      }, _react.default.createElement("div", {
        className: "mask",
        onClick: this.closeImg
      }, _react.default.createElement("img", {
        className: "originalPic",
        onMouseEnter: this.zoneInit,
        onMouseMove: this.mouseMove,
        onMouseUp: this.mouseUp,
        onClick: this.noBuble,
        src: this.props.picArr[this.state.presentIndex],
        alt: ""
      }), _react.default.createElement("div", {
        className: "imgToolBar"
      }, _react.default.createElement("div", {
        className: "btnBox"
      }, _react.default.createElement("button", null, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _fontawesomeFreeSolid.faAngleLeft,
        size: "2x",
        onClick: this.previousPic
      })), _react.default.createElement("button", null, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _fontawesomeFreeSolid.faUndo,
        size: "2x",
        onClick: this.rotate
      })), _react.default.createElement("button", null, _react.default.createElement(_reactFontawesome.FontAwesomeIcon, {
        icon: _fontawesomeFreeSolid.faAngleRight,
        size: "2x",
        onClick: this.nextPic
      }))), _react.default.createElement("ul", {
        className: "picPreview"
      }, picList))), _react.default.createElement("div", {
        className: "enlarge"
      }, _react.default.createElement("img", {
        className: "enlargeImg",
        src: this.props.picArr[this.state.presentIndex],
        alt: ""
      })), _react.default.createElement("div", {
        className: "zone",
        onMouseMove: this.handOver,
        onMouseDown: this.mouseDown,
        onClick: this.noBuble
      }), _react.default.createElement("button", {
        onClick: this.showImg
      }, "\u67E5\u770B"));
    });

    this.state = {
      isDown: false,
      x: 0,
      y: 0,
      l: 0,
      t: 0,
      deg: 90,
      presentIndex: 0,
      presentArr: []
    };
  }

  render() {
    return _react.default.createElement("div", {
      className: "gallery"
    }, this.picView(this.props.picArr));
  }

}

Gallery.propTypes = {
  picArr: _propTypes.default.array
};
var _default = Gallery;
exports.default = _default;