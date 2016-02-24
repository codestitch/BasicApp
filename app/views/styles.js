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

	},

	 formInput: {
        flex: 1,
        height: 26,
        fontSize: 13,
        borderWidth: 1,
        borderColor: "#555555",
    },
    saved: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
        marginTop: 5,
    },

});


export default styles;