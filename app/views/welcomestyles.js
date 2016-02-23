import React from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; 

const {
  StyleSheet
} = React;

const welcomeStyles = StyleSheet.create({

	container: {
    flex: 1,
    backgroundColor:'#007966',
    margin: 0,  
	},
	titlebar: {
		marginTop: 120, 
		marginBottom: 15,
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		color: 'white',
	},
  welcomebar: {
    marginTop: 30,
    marginBottom: 10,  
  },
  welcometext:{
    fontSize: 24,
    color: '#3e3e3e',
    textAlign: 'center',
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
    marginTop: 5,
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


export default welcomeStyles;