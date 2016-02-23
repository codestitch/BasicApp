import React from 'react-native';
// import LinearGradient from 'react-native-linear-gradient'; 

const {
  StyleSheet
} = React;

const loginStyles = StyleSheet.create({
  // Style container
  mainContainer: {
    flex: 1,
    backgroundColor:'white',
    margin: 0, 
  },
  loginContainer: { 
    flex: 1,
    backgroundColor:'#1F1F1F',  
    margin: 0,
  },

  carouseContainer: {  
    flexDirection: 'column',
    margin: 0,
  },




  // header
  toolbar:{
      flexDirection:'row',
      backgroundColor:'#81c04d',
      paddingTop:30,
      paddingBottom:20,
      marginBottom: 30,   
  },
  toolbarButton:{
      width: 50,           
      color:'#fff',
      textAlign:'center'
  },
  toolbarTitle:{
      color:'#fff',
      textAlign:'center', 
      fontSize:30,
      flex:1         
  },

  // Carousel Container
  carouselContainer: {
    width: 375,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },


  // Input
  fieldTitle: {
    flex: 1,
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 30,
    marginRight: 10,
    fontSize: 15,
    fontWeight: "bold"
  },
  fieldInput: {
    height: 36,
    padding: 10,
    marginRight: 30,
    marginLeft:30, 
    flex: 1,
    fontSize: 15,
    borderWidth: 1, 
    borderRadius: 3, 
    color: '#000'
  },

  
  // Fb button
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
    marginTop: 1,
    marginLeft: 30,
    marginRight: 30
  },
  fbbutton: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent'
  }, 

  // Greyed Text
  greytext: {
    marginTop: 150, 
    color: '#C7C7C7', 
  }

});

export default loginStyles;