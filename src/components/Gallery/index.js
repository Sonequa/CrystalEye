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

	// componentDidMount() {
	// 	const imgBox = document.getElementsByClassName('imgBox')[0];
	// 	window.onmousemove = (e) => {
	// 		if (e.clientX > 200) {
	// 			imgBox.style.width = '600px';
	// 		}
	// 		console.log(`(${e.clientX}, ${imgBox.offsetLeft})`);
	// 	}
	// }

	showImg() {
		const imgBox = document.getElementsByClassName('imgBox')[0];
		const mask = document.getElementsByClassName('mask')[0];
		mask.style.display = 'block';
		imgBox.style.display = 'flex';
	}

	closeImg() {
		const imgBox = document.getElementsByClassName('imgBox')[0];
		const mask = document.getElementsByClassName('mask')[0];
		mask.style.display = 'none';
		imgBox.style.display = 'none';
	}

	mouseDown = (e) => {
		e.preventDefault();
		e.stopPropagation();
		const dv = document.getElementsByClassName("imgBox")[0];
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
			const img = document.getElementsByClassName('test')[0];
			const dv = document.getElementsByClassName("imgBox")[0];
	  		if (this.state.isDown === false) {
	  			return;
	  		}
	  		let nx = e.clientX;
	  		let ny = e.clientY;
	  		let nl = nx - (this.state.x - this.state.l);
	  		let nt = ny - (this.state.y - this.state.t);
	  		dv.style.left = nl + 'px';
	  		dv.style.top = nt + 'px';
		};
	}

	mouseUp = (e) => {
		e.stopPropagation();
		this.setState({
	  		isDown: false
		});
	}

	rotate = (e) => {
		const img = document.getElementsByTagName('img')[0];
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
	}

	showZone = (e) => {
		const zone = document.getElementsByClassName('zone')[0];
		const enlarge = document.getElementsByClassName('enlarge')[0];
		const img = document.getElementsByTagName('img')[0];
		const imgBox = document.getElementsByClassName('imgBox')[0];
		console.log(`(${e.clientX}, ${imgBox.offsetLeft})`);
		if (e.clientX > imgBox.offsetLeft - 200) {
			// enlarge.style.display = 'inline-block';
			// zone.style.display = 'block';
			zone.style.left = e.clientX - 75 + 'px';
			zone.style.top = e.clientY - 35 + 'px';
		} else {
			zone.style.display = 'none';
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
	}

	render() {
		return (
			<div className="gallery">
				<button onClick={this.showImg}>查看</button>
				<div className="mask" onClick={this.closeImg}>
					<div className="imgBox" onMouseDown={this.mouseDown} onMouseMove={this.mouseMove} onMouseUp={this.mouseUp} onClick={this.noBuble}>
						<div className="imgPreview">
							<img  className="test" onMouseMove={this.showZone} onMouseOut={this.hideEnlarge} src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564369521&di=98ec882928f5db69506fa3a6f3253b2f&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140219%2F20140219160303-1860964840.jpg"/>
							<ul>
								<li><FontAwesomeIcon icon={faUndo} size="2x" onClick={this.rotate}/></li>
							</ul>
						</div>
						<div className="enlarge"></div>
					</div>
					<div className="zone" onMouseMove={this.handOver} onClick={this.noBuble}></div>
				</div>
			</div>
		);
	}
}

Gallery.propTypes = {
	src: PropTypes.string,
}

export default Gallery;