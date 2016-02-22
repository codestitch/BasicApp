'use strict';

import React from 'react-native';
import styles from '../loginstyles.js'; 


const {
  StyleSheet,
  Image,
  Text, 
  Navigator,
  View,
  TouchableHighlight
} = React;


var FBLogin = require('react-native-facebook-login'); 
var FBLoginManager = require('NativeModules').FBLoginManager;

var Carousel = require('react-native-carousel');
var CarouselLoop = require('react-native-looped-carousel');

var Login = React.createClass({
  getInitialState(){ 
    return {
      user: null, 
    };
  },

  componentWillMount(){
    this.updateView();
  },

  updateView(){  
    var _this = this;
    FBLoginManager.getCredentials(function(error, data){ 
      // console.log(data.credentials );
      if (!error) {
        _this.setState({ user : data.credentials }); 
       _this.gotoMain();
      } else {
        _this.setState({ user : null });
      }
    });

    console.log("going to main");
  },

  render() {
    var _this = this;
    var user = this.state.user;
    var Dimensions = require('Dimensions');
    var {width, height} = Dimensions.get('window');
    var newheight = height - 150;

    return (
      <View style={styles.loginContainer}>  

        <View style={styles.carouseContainer}> 
          <Carousel delay={2100} style={{width: width, height: newheight }}>
              <View style={{backgroundColor:'#007956',width:width,height:newheight}}/>
              <View style={{backgroundColor:'#007966',width:width,height:newheight}}/>
              <View style={{backgroundColor:'#007970',width:width,height:newheight}}/>
          </Carousel>
        </View> 
 
          <Text style={{ margin: 30, color: '#DCDCDC', textAlign: 'center' }}> 
            Join us now!
          </Text>

        <View style={styles.rowCenter}> 

          <FBLogin style={{ alignItems: 'center', justifyContent: 'center',}}
            permissions={["email","user_friends"]}
            onPress={function(){
              console.log("FBLoginMock clicked.");
            }}
            onLogin={function(){
              console.log("FBLoginMock logged in!");
              _this.updateView(); 
            }}
            onLogout={function(){
              console.log("FBLoginMock logged out.");
              _this.setState({ user : null });
            }}
            onLoginFound={function(data){
              console.log("Existing login found.");
              _this.updateView();
            }}
            onLoginNotFound={function(){
              console.log("No user logged in."); 
            }}
            onError={function(data){
              console.log("ERROR");
              console.log(data);
            }}
            onCancel={function(){
              console.log("User cancelled.");
            }}
            onPermissionsMissing={function(data){
              console.log("Check permissions!");
              console.log(data);
            }}
          /> 
        </View>
 
      </View>
    );
  },

  gotoMain() {  
    var navigator = this.props.navigator;
    var _user = this.state.user;

    this.props.navigator.replace({
      id: 'main',  
      passProps: {list  : this.state.user }
    }); 
  }

});
 

// export default login;
module.exports = Login;