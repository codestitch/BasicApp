import React from 'react-native';
//const COLORS = require('./../constants/colors');
const {
  StyleSheet
} = React;

const styles = StyleSheet.create({

  // GENERAL CONTAINERS
  container:{
    flex: 1,
    backgroundColor: '#fff',
  },
  launchView:{
    flex: 1,
    marginTop: 30
  },
	col: {
	 flexDirection: 'column',
	 margin: 0,
	},
	colCenter: {
	 flexDirection: 'column',
	 margin: 0,
	 alignSelf: 'center',
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

  // GENERAL TEXT
  text:{
    paddingBottom: 10,
  },

  // LIST VIEW
  listcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  listView: {
      backgroundColor: '#fff',
      flex: 1,
      marginTop: 32,
      marginBottom: 50,
  },
  wholeimage: {
    flex: 1,
  },
  headlineContainer : {
    marginTop: 100,
    backgroundColor: '#D6D6D6',
    height: 50,
  },
  title: {
    fontSize: 20,
    paddingLeft: 9,
    paddingTop: 5,
  },
  description: {
    fontSize: 10,
    paddingLeft: 9,
    color: '#3e3e3e',
  },

  // Toolbar
  toolbar:{
       backgroundColor:'#81c04d',
       paddingTop:30,
       paddingBottom:14,
       flexDirection:'row'
   },
   toolbarButton:{
       width: 50,
       color:'#fff',
       textAlign:'center'
   },
   toolbarTitle:{
       color:'#fff',
       textAlign:'center',
       fontWeight:'bold',
       flex:1,
       fontSize: 18,
   },


   // Detail Views
   detailcontainer:{
     height: 250,
   },
   detailimg: {
     flex: 1,
   },
   detaildescription:{

   }

});

export default styles;
