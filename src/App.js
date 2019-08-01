import React, {Component} from 'react';
import './App.css';
import routes from './route.js'
import {Router, Route, Link, BrowserRouter} from 'react-router-dom'
import Gallery from './components/Gallery/index'

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='background'>
        <Gallery picArr={['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564369521&di=98ec882928f5db69506fa3a6f3253b2f&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140219%2F20140219160303-1860964840.jpg', 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1563948139355&di=918457ff101b1369d626a88ea5d916a1&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201309%2F17%2F20130917161051_CZAcd.thumb.700_0.jpeg']}></Gallery>
      </div>
    )
  }
}

export default App;