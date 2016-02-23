import React from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; 

const {
  StyleSheet
} = React;

const styles = StyleSheet.create({

	container: {
    flex: 1,
    backgroundColor:'white',
    margin: 0,  
	},
	col: {
	 flexDirection: 'column',
	 margin: 0,
	},
	row: {
	 flexDirection: 'row',
	 margin:0,
	},
	rowCenter: {
	 flexDirection: 'row',
	 alignSelf: 'center',
	 margin: 0,
	},
	center: {
	 alignSelf: 'center',
		
	}

});


export default styles;