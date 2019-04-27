import React, { Component } from 'react';
import './App.css';
import PrototypePage from './components/pages/prototype/PrototypePage';
import LoginPage from './components/pages/login/LoginPage';
import SignUpPage from './components/pages/signup/SignUpPage';
import LogoutFunction from './components/child/logout/LogoutFunction';
import { BrowserRouter as Router, Route, Switch, Link, Redirect, withRouter } from 'react-router-dom';
import Auth from './modules/Auth';
import NavBar from './components/child/navbar/NavBar';

const PrivateRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			Auth.isUserAuthenticated() ? (
				<Component {...props} {...rest} />
			) : (
				<React.Fragment>
					<Redirect
						to={{
							pathname: '/login',
							state: { from: props.location }
						}}
					/>
				</React.Fragment>
			)}
	/>
);

const LoggedOutRoute = ({ component: Component, ...rest }) => (
	<Route
		{...rest}
		render={(props) =>
			Auth.isUserAuthenticated() ? (
				<Redirect
					to={{
						pathname: '/',
						state: { from: props.location }
					}}
				/>
			) : (
				<Component {...props} {...rest} />
			)}
	/>
);
const GlobalRoute = ({ component: Component, ...rest }) => (
	<Route {...rest} render={(props) => <Component {...props} {...rest} />} />
);

class App extends Component {
	state = {};

	componentDidMount() {}

	render() {
		return (
			<div className="App">
				<Router>
					<NavBar />
					<div>
						<GlobalRoute exact path="/" component={PrototypePage} />
						<LoggedOutRoute path="/signup" component={SignUpPage} />
						<LoggedOutRoute path="/login" component={LoginPage} />
						<PrivateRoute path="/logout" component={LogoutFunction} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
