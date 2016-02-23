'use strict'

var React = require('react-native');

const {
  StyleSheet,
  Image,
  Text, 
  Navigator,
  View, 
  Component
} = React; 

var Second = React.createClass({
	getInitialState(){
		return{
			user: null
		}
	},

	componentWillMount(){
		console.log("componentWillMount");
		var passdata = this.props.route.passProps.passData; 
		console.log(passdata);
		this.setState({ user: passdata});
	},

	render(){
		var display = this.state.user;
		console.log(display);
		return(

			<View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
	  
	        	  <Text style={{backgroundColor: 'yellow', color: 'green'}}>Main page</Text>

	      </View>

		);
	}
});

// export default login;
module.exports = Second;