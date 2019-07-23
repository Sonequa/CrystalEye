import React, {Component} from 'react';
import Gallery from './Gallery/index';

class App extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return(
			<div>
				<Gallery></Gallery>
			</div>
		)
	}
}

export default App;