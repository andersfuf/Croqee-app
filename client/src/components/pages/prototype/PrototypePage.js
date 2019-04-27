import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Canvas from '../../child/canvas/CanvasPage';
import CanvasPage from '../../child/canvas/CanvasPage';
import config from '../../../modules/config';
import { getUser, setTimer } from '../../../js/actions';
import Timer from '../../child/timer/Timer';
import EmptyTimer from '../../child/timer/EmptyTimer';
import HandSide from '../../child/handside/HandSide';


class PrototypePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			greet: '',
			note: '',
		};
	}
	componentDidMount() {
		axios.post('/').then((response) => {
			console.log(response);
			const { greet, note, messageFromPython } = response.data;
			this.setState({
				greet,
				note,
				messageFromPython
			});
		});

		this.props.getUser();


	}
	render() {
		let user = this.props.user;
		let side = this.props.leftHand?"model_left_hand":""
		return (
			<React.Fragment>
				{this.props.showTimer ? <Timer /> : <EmptyTimer />}
				<div>
				<HandSide/>
					<img src="./shapes_1.png" className={"modelImg draw_and_model " + side} />
					<div>	
						<CanvasPage />
					</div>
				</div>
				<div id="home_bottom">
					<img id="home_bottom_triangle" src="/triangle.png" />
					<button id="home_bottom_button">Compete with others</button>
				</div>
			</React.Fragment>
		);
	}
}
const mapStateToProps = state => {
	const { events, user, showTimer,leftHand } = state;
	return { events, user, showTimer,leftHand };
};
const mapDispatchToProps = dispatch => {
	return {
		getUser: () => dispatch(getUser()),

	};
}
export default connect(mapStateToProps, mapDispatchToProps)(PrototypePage);
