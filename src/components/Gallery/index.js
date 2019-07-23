import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearchMinus, faSearchPlus, faUndo} from '@fortawesome/fontawesome-free-solid';
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
			deg: 90
		}
	}

	showImg = () => {
		const mask = document.getElementsByClassName('mask')[0];
		const img = document.getElementsByClassName('test')[0];
		const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
		mask.style.display = 'block';
		img.style.display = 'block';
		img.style.transform = 'rotate(0)';
		img.style.top = (window.innerHeight - img.clientHeight) / 2 + 'px';
		img.style.left = (window.innerWidth - img.clientWidth) / 2 + 'px';
		this.setState({
			deg: 90
		});
		imgToolBar.style.display = 'block';
		imgToolBar.style.top = img.offsetTop + img.clientHeight + 20 + 'px';
		imgToolBar.style.left = img.offsetLeft + img.clientWidth / 2 + 'px';
	}

	closeImg() {
		const img = document.getElementsByClassName('test')[0];
		const mask = document.getElementsByClassName('mask')[0];
		const imgToolBar = document.getElementsByClassName('imgToolBar')[0];
		mask.style.display = 'none';
		img.style.display = 'none';
		imgToolBar.style.display = 'none';
	}

	mouseDown = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const enlarge = document.getElementsByClassName('enlarge')[0];
		const zone = document.getElementsByClassName('zone')[0];
		const dv = document.getElementsByClassName("test")[0];
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
			const img = document.getElementsByClassName('test')[0];
	  		if (this.state.isDown === false) {
	  			this.showZone(e);
	  		} else {
	  			let nx = e.clientX;
		  		let ny = e.clientY;
		  		let nl = nx - (this.state.x - this.state.l);
		  		let nt = ny - (this.state.y - this.state.t);
		  		img.style.left = nl + 'px';
		  		img.style.top = nt + 'px';	
	  			if (this.state.deg === 90 || this.state.deg === 270) {
	  				imgToolBar.style.top = img.offsetTop + img.clientHeight + 20 + 'px';
					imgToolBar.style.left = img.offsetLeft + img.clientWidth / 2 + 'px';
	  			} else {
					imgToolBar.style.top = img.offsetTop + img.clientHeight + (img.clientWidth - img.clientHeight) / 2 + 20 + 'px';
					imgToolBar.style.left = img.offsetLeft + img.clientWidth / 2 + 'px';
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
		const img = document.getElementsByClassName('test')[0];
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

	showZone = (e) => {
		const zone = document.getElementsByClassName('zone')[0];
		const enlarge = document.getElementsByClassName('enlarge')[0];
		const img = document.getElementsByClassName('test')[0];
		const enlargeImg = document.getElementsByClassName('enlargeImg')[0];
		zone.style.display = 'block';
		zone.style.left = e.clientX - 75 + 'px';
		zone.style.top = e.clientY - 35 + 'px';
		if (this.state.deg === 90 || this.state.deg == 270) {
			if (zone.offsetLeft + 75 > img.offsetLeft && zone.offsetLeft + 75 < img.offsetLeft + img.clientWidth 
				&& zone.offsetTop + 35 > img.offsetTop && zone.offsetTop +35 < img.offsetTop + img.clientHeight) {
				zone.style.left = e.clientX - 75 + 'px';
				zone.style.top = e.clientY - 35 + 'px';
				enlarge.style.display = 'block';
				// enlargeImg.style.width = img.clientWidth * 2 + 'px!important';
				console.log(`${enlargeImg.width}, ${enlargeImg.height}`);
				// enlargeImg.style.height = img.clientHeight * 2 + 'px';
				enlarge.style.top = img.clientHeight - enlarge.clientHeight + img.offsetTop + 'px';
				enlarge.style.left = img.clientWidth + img.offsetLeft + 10 + 'px';
			} else {
				zone.style.display = 'none';
				enlarge.style.display = 'none';
			}
		} else {
			if (zone.offsetLeft + 75 > img.offsetLeft + (img.clientWidth - img.clientHeight) / 2 && zone.offsetLeft + 75 < img.offsetLeft + img.clientWidth -  (img.clientWidth - img.clientHeight) / 2
				&& zone.offsetTop + 35 > img.offsetTop - (img.clientWidth - img.clientHeight) / 2 && zone.offsetTop +35 < img.offsetTop + img.clientHeight + (img.clientWidth - img.clientHeight) / 2) {
				zone.style.left = e.clientX - 75 + 'px';
				zone.style.top = e.clientY - 35 + 'px';
				enlarge.style.display = 'block';
				enlarge.style.backgroundImage = 'url(https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564369521&di=98ec882928f5db69506fa3a6f3253b2f&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140219%2F20140219160303-1860964840.jpg)';
				enlarge.style.top = img.clientHeight - enlarge.clientHeight + img.offsetTop + (img.clientWidth - img.clientHeight) / 2 + 'px';
				enlarge.style.left = img.clientWidth + img.offsetLeft - (img.clientWidth - img.clientHeight) / 2 + 10 + 'px';
			} else {
				zone.style.display = 'none';
				enlarge.style.display = 'none';
			}
		}
	}

	handOver = (e) => {
		this.showZone(e);
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

	render() {
		return (
			<div className="gallery">
				<button onClick={this.showImg}>查看</button>
				<div className="mask" onClick={this.closeImg}>
					<img  className="test" onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} onClick={this.noBuble} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564369521&di=98ec882928f5db69506fa3a6f3253b2f&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140219%2F20140219160303-1860964840.jpg"/>
					<ul className="imgToolBar">
						<li><FontAwesomeIcon icon={faUndo} size="2x" onClick={this.rotate}/></li>
					</ul>
				</div>
				<div className="enlarge">
					<img className="enlargeImg" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564369521&di=98ec882928f5db69506fa3a6f3253b2f&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140219%2F20140219160303-1860964840.jpg"/>
				</div>
				<div className="zone" onMouseMove={this.handOver} onMouseDown={this.mouseDown} onClick={this.noBuble}></div>
			</div>
		);
	}
}

Gallery.propTypes = {
	src: PropTypes.string,
}

export default Gallery;