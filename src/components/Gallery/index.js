import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faAngleRight,
  faUndo,
} from '@fortawesome/fontawesome-free-solid';
import './gallery.css';

class Gallery extends Component {
  /** @param {any} props */
  constructor(props) {
    super(props);
    this.state = {
      x: 0, // 光标距离浏览器窗口左边距离
      y: 0, // 光标距离浏览器窗口顶部距离
      l: 0, // 图片左边框距离浏览器窗口左边距离
      t: 0, // 图片上边框距离浏览器窗口顶部距离
      deg: 90,
      presentIndex: 0,
      presentArr: [],
    };
    this.isDown = false;
    this.isInitialized = false;
    this.isLoaded = true;
    this.toolbarDis = 20; // 工具栏和展示图片的距离
  }

  showImg = async (e) => {
    e.stopPropagation();
    await this.setState({
      presentArr: this.props.picArr.length > 4 ?
        [this.props.picArr.length - 2, this.props.picArr.length - 1, 0, 1, 2] :
        [0, 1, 2, 3, 4].splice(0, this.props.picArr.length),	// 判断传入的图片 url 数组长度是否大于四个
    });
    const mask = document.getElementsByClassName('mask')[0];
    const img = document.getElementsByClassName('originalPic')[0];
    const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
    mask.style.display = 'block';
    imgToolBar.style.display = 'block';
    imgToolBar.style.left = (window.innerWidth - imgToolBar.clientWidth) / 2 + 'px';
    imgToolBar.style.top = window.innerHeight / 2 + 200 + 'px';
    // 图片加载完成时执行
    if (img.complete) {
      img.style.display = 'block';
      img.style.transform = 'rotate(0)';
      img.style.top = imgToolBar.offsetTop - img.clientHeight - this.toolbarDis + 'px';
      img.style.left = (window.innerWidth - img.clientWidth) / 2 + 'px';
    }
  }

  // 初次打开组件，在图片加载完成后初始化面板
  initializePanel = (e) => {
    const img = document.getElementsByClassName('originalPic')[0];
    const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
    imgToolBar.style.display = 'block';
    imgToolBar.style.left = (window.innerWidth - imgToolBar.clientWidth) / 2 + 'px';
    imgToolBar.style.top = window.innerHeight / 2 + 200 + 'px';
    img.style.display = 'block';
    img.style.transform = 'rotate(0)';
    img.style.top = imgToolBar.offsetTop - img.clientHeight - this.toolbarDis + 'px';
    img.style.left = (window.innerWidth - img.clientWidth) / 2 + 'px';
    this.isInitialized = true;
  }

  loadPic = (e) => {
    this.isDown = false;
    const img = document.getElementsByClassName('originalPic')[0];
    const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
    if (!this.isInitialized) {
      imgToolBar.style.display = 'block';
      imgToolBar.style.left = (window.innerWidth - imgToolBar.clientWidth) / 2 + 'px';
      imgToolBar.style.top = window.innerHeight / 2 + 200 + 'px';
      img.style.display = 'block';
      img.style.transform = 'rotate(0)';
      img.style.top = imgToolBar.offsetTop - img.clientHeight - this.toolbarDis + 'px';
      img.style.left = (window.innerWidth - img.clientWidth) / 2 + 'px';
      this.isInitialized = true;
    } else if (!this.isLoaded) {
      img.style.top = imgToolBar.offsetTop - img.clientHeight - this.toolbarDis + 'px';
      img.style.left = imgToolBar.offsetLeft - (img.clientWidth - imgToolBar.clientWidth) / 2 + 'px';
      this.isLoaded = true;
    }
  }

  changeImg = async (index, e) => {
    e.stopPropagation();
    const img = document.getElementsByClassName('originalPic')[0];
    const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
    if (this.props.picArr.length <= 5) {
      await this.setState({
        presentIndex: index,
        deg: 90,
      });
      console.log(img.complete);
      if (img.complete) {
        img.style.transform = 'rotate(0)';
        img.style.top = imgToolBar.offsetTop - img.clientHeight - this.toolbarDis + 'px';
        img.style.left = (window.innerWidth - img.clientWidth) / 2 + 'px';
      } else {
        this.isLoaded = false;
      }
    } else {
      await this.setState({
        presentIndex: index,
        presentArr: [
          index - 2 >= 0 ? index - 2 : index - 2 + this.props.picArr.length,
          index - 1 >= 0 ? index - 1 : index - 1 + this.props.picArr.length,
          index,
          index + 1 >= this.props.picArr.length ? index + 1 - this.props.picArr.length : index + 1,
          index + 2 >= this.props.picArr.length ? index + 2 - this.props.picArr.length : index + 2,
        ],
        deg: 90,
      });
      console.log(img.complete);
      if (img.complete) {
        img.style.transform = 'rotate(0)';
        img.style.top = imgToolBar.offsetTop - img.clientHeight - this.toolbarDis + 'px';
        img.style.left = imgToolBar.offsetLeft - (img.clientWidth - imgToolBar.clientWidth) / 2 + 'px';
      } else {
        this.isLoaded = false;
      }
    }
  }

  closeImg = () => {
    const img = document.getElementsByClassName('originalPic')[0];
    const mask = document.getElementsByClassName('mask')[0];
    const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
    mask.style.display = 'none';
    img.style.display = 'none';
    imgToolBar.style.display = 'none';
    this.setState({
      presentIndex: 0,
      deg: 90,
    });
  }

  mouseDown = (e) => {
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
    });
    this.isDown = true;
  }

  mouseMove = () => {
    window.onmousemove = (e) => {
      const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
      const img = document.getElementsByClassName('originalPic')[0];
      if (this.isDown === false) {
        this.moveZone(e);
      } else {
        const nx = e.clientX;
        const ny = e.clientY;
        const nl = nx - (this.state.x - this.state.l);
        const nt = ny - (this.state.y - this.state.t);
        img.style.left = nl + 'px';
        img.style.top = nt + 'px';
        if (this.state.deg === 90 || this.state.deg === 270) {
          imgToolBar.style.top = img.offsetTop + img.clientHeight + this.toolbarDis + 'px';
          imgToolBar.style.left = img.offsetLeft + img.clientWidth / 2 - imgToolBar.clientWidth / 2 + 'px';
        } else {
          imgToolBar.style.top = img.offsetTop + img.clientHeight +
          (img.clientWidth - img.clientHeight) / 2 + this.toolbarDis + 'px';
          imgToolBar.style.left = img.offsetLeft + img.clientWidth / 2 - imgToolBar.clientWidth / 2 + 'px';
        }
      }
    };
  }

  mouseUp = (e) => {
    e.stopPropagation();
    this.isDown = false;
  }

  rotate = (e) => {
    e.stopPropagation();
    const img = document.getElementsByClassName('originalPic')[0];
    const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
    this.setState({
      deg: this.state.deg === 270 ? 0 : this.state.deg + 90,
    });
    img.style.transform = `rotate(${this.state.deg}deg)`;
    img.style.top = (this.state.deg === 90 || this.state.deg === 270) ?
      img.offsetTop - (img.clientWidth - img.clientHeight) / 2 + 'px' :
      img.style.top = imgToolBar.offsetTop - 20 - img.clientHeight + 'px';
  }

  moveZone = (e) => {
    const zone = document.getElementsByClassName('zone')[0];
    const enlarge = document.getElementsByClassName('enlarge')[0];
    const img = document.getElementsByClassName('originalPic')[0];
    const enlargeImg = document.getElementsByClassName('enlargeImg')[0];
    zone.style.display = 'block';
    enlarge.style.display = 'block';
    zone.style.left = e.clientX - zone.clientWidth / 2 + 'px';
    zone.style.top = e.clientY - zone.clientHeight / 2 + 'px';
    if (this.state.deg === 90 || this.state.deg === 270) {
      if (zone.offsetLeft + zone.clientWidth / 2 > img.offsetLeft &&
        zone.offsetLeft + zone.clientWidth / 2 < img.offsetLeft + img.clientWidth &&
        zone.offsetTop + zone.clientHeight / 2 > img.offsetTop &&
        zone.offsetTop +zone.clientHeight / 2 < img.offsetTop + img.clientHeight) {
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
      if (zone.offsetLeft + zone.clientWidth / 2 > img.offsetLeft + (img.clientWidth - img.clientHeight) / 2 &&
        zone.offsetLeft + zone.clientWidth / 2 < img.offsetLeft + img.clientWidth - (img.clientWidth - img.clientHeight) / 2 &&
        zone.offsetTop + zone.clientWidth / 2 > img.offsetTop - (img.clientWidth - img.clientHeight) / 2 &&
        zone.offsetTop +zone.clientHeight / 2 < img.offsetTop + img.clientHeight + (img.clientWidth - img.clientHeight) / 2) {
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
          enlargeImg.style.marginTop = 2 * (- zone.offsetTop + img.offsetTop) + 'px';
        }
        enlarge.style.top = img.clientHeight - enlarge.clientHeight + img.offsetTop +
       (img.clientWidth - img.clientHeight) / 2 + 'px';
        enlarge.style.left = img.clientWidth + img.offsetLeft - (img.clientWidth - img.clientHeight) / 2 + 10 + 'px';
      } else {
        zone.style.display = 'none';
        enlarge.style.display = 'none';
      }
    }
  }

  handOver = (e) => {
    this.moveZone(e);
  }

  noBuble = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  previousPic = (e) => {
    if (this.state.presentIndex !== 0) {
      this.changeImg(this.state.presentIndex - 1, e);
    } else {
      this.changeImg(this.props.picArr.length - 1, e);
    }
  }

  nextPic = (e) => {
    if (this.state.presentIndex !== this.props.picArr.length - 1) {
      this.changeImg(this.state.presentIndex + 1, e);
    } else {
      this.changeImg(0, e);
    }
  }

  // Generate picture html list
  getPicList = (picArr) => {
    const picList = this.state.presentArr.map((item) =>
      <li key={item} onClick={(e) => {
        this.changeImg(item, e);
      }}><img src={picArr[item]} alt=''/></li>
    );
    return picList;
  }

  /** @return {object} Gallery Component */
  render() {
    return (
      <div className="gallery">
        <div className="picView">
          <div className="mask" onClick={this.closeImg}>
            <div className="wrap">
              <img
                className="originalPic"
                onLoad={this.loadPic}
                onMouseEnter={this.zoneInit}
                onMouseMove={this.mouseMove}
                onMouseUp={this.mouseUp}
                onClick={this.noBuble}
                src={this.props.picArr[this.state.presentIndex]}
                alt=''
              />
            </div>
            <div className="imgToolBar">
              <div className="btnBox">
                <button onClick={this.previousPic}><FontAwesomeIcon icon={faAngleLeft} size="2x"/></button>
                <button onClick={this.rotate}><FontAwesomeIcon icon={faUndo} size="2x"/></button>
                <button onClick={this.nextPic}><FontAwesomeIcon icon={faAngleRight} size="2x"/></button>
              </div>
              <ul className="picPreview">
                {this.getPicList(this.props.picArr)}
              </ul>
            </div>
          </div>
          <div className="enlarge">
            <img className="enlargeImg" src={this.props.picArr[this.state.presentIndex]} alt=''/>
          </div>
          <div className="zone" onMouseMove={this.handOver} onMouseDown={this.mouseDown} onClick={this.noBuble}></div>
          <button onClick={this.showImg}>{this.props.btnMsg}</button>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  picArr: PropTypes.array,
  btnMsg: PropTypes.string,
};

export default Gallery;
