import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faUndo} from '@fortawesome/fontawesome-free-solid';
import './gallery.css';

class Gallery extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isDown: false,
			x: 0,
			y: 0,
			l: 0,
			t: 0,
			deg: 90,
			presentIndex: 0,
		}
	}

	showImg = (e) => {
		e.stopPropagation();
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
	}

	changeImg = (index, e) => {
		e.stopPropagation();
		this.setState({
			presentIndex: index,
			deg: 90,
		}, () => {					// 将打算在 State 更新后再执行的代码作为回调函数放在 setState 的第二个参数即可
			const img = document.getElementsByClassName('originalPic')[0];
			const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
			img.style.transform = 'rotate(0)';
			img.style.top = imgToolBar.offsetTop - img.clientHeight - 20 + 'px';
			img.style.left = imgToolBar.offsetLeft - (img.clientWidth - imgToolBar.clientWidth) / 2 + 'px';

		});	
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
		})
	}

	mouseDown = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const enlarge = document.getElementsByClassName('enlarge')[0];
		const zone = document.getElementsByClassName('zone')[0];
		const dv = document.getElementsByClassName("originalPic")[0];
		zone.style.display = 'none';
		enlarge.style.display = 'none';
	    this.setState({
	      x: e.clientX,
	      y: e.clientY,
	      l: dv.offsetLeft,
	      t: dv.offsetTop,
	      isDown: true,
	    });
  	}

	mouseMove = (e) => {
		window.onmousemove = (e) => {
			const zone = document.getElementsByClassName('zone')[0];
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
					imgToolBar.style.left = img.offsetLeft + img.clientWidth / 2  - imgToolBar.clientWidth / 2 + 'px';
	  			} else {
					imgToolBar.style.top = img.offsetTop + img.clientHeight + (img.clientWidth - img.clientHeight) / 2 + 20 + 'px';
					imgToolBar.style.left = img.offsetLeft + img.clientWidth / 2  - imgToolBar.clientWidth / 2 + 'px';
	  			}
	  		}
		};
	}

	mouseUp = (e) => {
		e.stopPropagation();
		this.setState({
	  		isDown: false
		});
	}

	rotate = (e) => {
		e.stopPropagation();
		const img = document.getElementsByClassName('originalPic')[0];
		const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
		if (this.state.deg === 270) {
			this.setState({
				deg: 0,
			});
		} else {
			this.setState({
				deg: this.state.deg + 90,
			});
		}
		img.style.transform = `rotate(${this.state.deg}deg)`;
		if (this.state.deg === 90 || this.state.deg === 270) {
			img.style.top = img.offsetTop - (img.clientWidth - img.clientHeight) / 2 + 'px';
		} else {
			img.style.top = imgToolBar.offsetTop - 20 - img.clientHeight + 'px';
		}
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
			if (zone.offsetLeft + zone.clientWidth / 2 > img.offsetLeft && zone.offsetLeft + zone.clientWidth / 2 < img.offsetLeft + img.clientWidth 
				&& zone.offsetTop + zone.clientHeight / 2 > img.offsetTop && zone.offsetTop +zone.clientHeight / 2 < img.offsetTop + img.clientHeight) {
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
			if (zone.offsetLeft + zone.clientWidth / 2 > img.offsetLeft + (img.clientWidth - img.clientHeight) / 2 && zone.offsetLeft + zone.clientWidth / 2 < img.offsetLeft + img.clientWidth -  (img.clientWidth - img.clientHeight) / 2
				&& zone.offsetTop + zone.clientWidth / 2 > img.offsetTop - (img.clientWidth - img.clientHeight) / 2 && zone.offsetTop +zone.clientHeight / 2 < img.offsetTop + img.clientHeight + (img.clientWidth - img.clientHeight) / 2) {
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
				enlarge.style.top = img.clientHeight - enlarge.clientHeight + img.offsetTop + (img.clientWidth - img.clientHeight) / 2 + 'px';
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

	hideEnlarge = (e) => {
		const enlarge = document.getElementsByClassName('enlarge')[0];
		const zone = document.getElementsByClassName('zone')[0];
		zone.style.display = 'none';
		enlarge.style.display = 'none';
	}

	noBuble = (e) => {
		e.stopPropagation();
		e.preventDefault();
	}

	previousPic = (e) => {
		this.changeImg(this.state.presentIndex - 1, e);
	}

	nextPic = (e) => {
		this.changeImg(this.state.presentIndex + 1, e);
	}

	picView = (picArr) => {
		const picList = picArr.map((picSrc, index) => 
			<li onClick={(e) => { this.changeImg(index, e)}}><img src={picSrc} alt='' /></li>
		);
		return (
			<div className="picView">
				<div className="mask" onClick={this.closeImg}>
					<img  className="originalPic" onMouseEnter={this.zoneInit} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} onClick={this.noBuble} src={this.props.picArr[this.state.presentIndex]} alt=''/>
					<div className="imgToolBar">
						<div className="btnBox">
							<button><FontAwesomeIcon icon={faAngleLeft} size="2x" onClick={this.previousPic}/></button>
							<button><FontAwesomeIcon icon={faUndo} size="2x" onClick={this.rotate}/></button>
							<button><FontAwesomeIcon icon={faAngleRight} size="2x" onClick={this.nextPic}/></button>
						</div>
						<ul className="picPreview">{picList}</ul>
					</div>
				</div>
				<div className="enlarge">
					<img className="enlargeImg" src={this.state.presentSrc} alt=''/>
				</div>
				<div className="zone" onMouseMove={this.handOver} onMouseDown={this.mouseDown} onClick={this.noBuble}></div>
				<button onClick={this.showImg}>查看</button>
			</div>
		);
	}

	render () {
		return(
			<div className="gallery">
				{this.picView(this.props.picArr)}
			</div>
		)
	}
}

Gallery.propTypes = {
	picArr: PropTypes.array,
}

export default Gallery;