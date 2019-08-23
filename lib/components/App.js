"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = _interopRequireDefault(require("./Gallery/index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

class App extends _react.Component {
  render() {
    return _react.default.createElement("div", {
      className: "background"
    }, _react.default.createElement(_index.default, {
      picArr: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564925499&di=35e916b76f2c3bb446967ff9d5dc4a59&imgtype=jpg&er=1&src=http%3A%2F%2Fi0.hdslb.com%2Fbfs%2Farchive%2Ff1c4ddd9d6911d627a37174babda331e72c47201.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564369521&di=98ec882928f5db69506fa3a6f3253b2f&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140219%2F20140219160303-1860964840.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563948139355&di=918457ff101b1369d626a88ea5d916a1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201309%2F17%2F20130917161051_CZAcd.thumb.700_0.jpeg', 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2663858449,2203482578&fm=26&gp=0.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564206288315&di=2bb6ba1a41e78664f67155add3d64ba3&imgtype=0&src=http%3A%2F%2Fi-4.yxdown.com%2F2016%2F8%2F12%2F5b28869e-9fc7-4afa-8693-2bc36dc14c3e.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564206615603&di=011d8796f534360af6728993c29ebad3&imgtype=0&src=http%3A%2F%2Fimg.9ku.com%2Fgeshoutuji%2Fsingertuji%2F5%2F5414%2F5414_2.jpg']
    }));
  }

}

var _default = App;
exports.default = _default;