'use strict';

import React from 'react-native';
import logstyles from '../loginstyles.js'; 
import styles from '../styles.js';  


const {
  StyleSheet,
  Image,
  Text, 
  Navigator,
  View,
  TouchableHighlight,
    AsyncStorage,
} = React;


var FBLogin = require('react-native-facebook-login'); 
var FBLoginManager = require('NativeModules').FBLoginManager;

var Carousel = require('react-native-carousel');
var CarouselLoop = require('react-native-looped-carousel');

var FB_PHOTO_WIDTH = 200;
var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var newheight = height - 150;

var Login = React.createClass({
  getInitialState(){ 
    return {
      user: null, 
    };
  },

  componentWillMount(){

    // AsyncStorage.setItem("viewed_welcome", "false");
  },

  updateView(){  
    var _this = this;
    FBLoginManager.getCredentials(function(error, data){ 

      if (!error) { 
       _this.gotoWelcome();
      }  

    }); 
  },

  render() {
    var _this = this;
    var user = this.state.user;

    return (
      <View style={logstyles.loginContainer}>  

        <View style={logstyles.carouseContainer}> 
          <Carousel delay={2100} style={{width: width, height: newheight }}>
              <View style={{backgroundColor:'#007956',width:width,height:newheight}}/>
              <View style={{backgroundColor:'#007966',width:width,height:newheight}}/>
              <View style={{backgroundColor:'#007970',width:width,height:newheight}}/>
          </Carousel>
        </View> 
 
        { user && <Photo user={user} /> } 
        { user && <Info user={user} /> } 
          <Text style={{ margin: 30, color: '#DCDCDC', textAlign: 'center' }}> 
            Join us now!
          </Text>
        
        {/*<TouchableHighlight style={{backgroundColor: 'yellow', padding: 10}}
            onPress={this.gotoSecond}>
          <Text style={{backgroundColor: 'yellow', color: 'green'}}>Main page</Text>
        </TouchableHighlight> */}

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
              // _this.setState({ user : null });
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

  gotoWelcome() {  
    console.log('gotoWelcome');
    var navigator = this.props.navigator;  
    var screen = 'welcome'; 

    this.props.navigator.replace({
      id: screen
    }); 
  },

  gotoSecond(){
    var tempdata = "this is the data";
    var navigator = this.props.navigator;
    navigator.push({
      id: 'second',
      passProps: {passData: tempdata}
    });
  }

});
  
 

// export default login;
module.exports = Login;