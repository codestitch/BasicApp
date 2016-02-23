import React from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; 

const {
  StyleSheet
} = React;

const mainStyles = StyleSheet.create({

	container: {
    flex: 1,
    backgroundColor:'#007966',
    margin: 0,  
	},
	titlebar: {
		marginTop: 60, 
		marginBottom: 60,
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		color: 'white',
	},
	// Button
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36, 
    marginRight: 30,
    marginLeft:30, 
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: '#29D65E',
    borderColor: '#29D65E',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center', 
  }, 

});


export default mainStyles;