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
  Platform
} = React;

var Dimensions = require('Dimensions');
var {width, height} = Dimensions.get('window');
var newheight = height - 150;
var FBLogin = require('react-native-facebook-login');
var FBLoginManager = require('NativeModules').FBLoginManager;

// var FBLoginManager = NativeModules.FBLoginManager;
var Carousel = require('react-native-carousel');


var itypeof = function (val) {
    return Object.prototype.toString.call(val).replace(/(\[|object|\s|\])/g, '').toLowerCase();
};

var Login = React.createClass({
  getInitialState(){
    return {
      user: null,
    };
  },

  updateView(){
    var self = this;
    FBLoginManager.getCredentials(function(error, data){

      if (!error) {
       self.gotoWelcome();
      }

    });
    // if (Platform.OS === 'ios')
    // {
    //   FBLoginManager.getCredentials(function(error, data){
    //
    //     if (!error) {
    //      self.gotoWelcome();
    //     }
    //
    //   });
    // }
    // else
    // {
    //   FBLoginManager.getCurrentToken(function(token, data){
    //     if(itypeof(token) === 'string' && token.length > 0){
    //       console.log("exiting login");
    //       console.log(data);
    //       self.gotoWelcome();
    //     }else{
    //       console.log("failed");
    //     }
    //   })
    // }
  },

  _handleEvent(e, data) {
     var result = e || data;
     console.log(result);
     console.log("handling event");
     if(result.type === 'success' && result.profile){
       try{
         result.profile = JSON.parse(result.profile)
       }catch(err){
         console.warn('Could not parse facebook profile: ', result.profile);
         console.error(err);
       }
     }
     console.log(result.profile);

     if(result.eventName === 'onLogin' || result.eventName === 'onLoginFound'){
       console.log("handleevent: is Login");
     }else if(result.eventName === 'onLogout'){
       console.log("handleevent: is Logout");
     }

     if(result.eventName && this.props.hasOwnProperty(result.eventName)){
       var event = result.eventName;
       delete result.eventName;
       console.log('Triggering \'%s\' event', event)
       this.props[event](result);
     }else{
       console.log('\'%s\' Event is not defined or recognized', result.eventName)
     }
   },

  render() {
    var _this = this;
    var user = this.state.user;

    return (
      <View style={logstyles.loginContainer}>

        <Carousel delay={2100} style={{width: width, height: newheight }}>
              <View style={{backgroundColor:'#007956',width:width,height:newheight}}/>
              <View style={{backgroundColor:'#007966',width:width,height:newheight}}/>
              <View style={{backgroundColor:'#007970',width:width,height:newheight}}/>
          </Carousel>

          <Text style={{ margin: 30, color: '#DCDCDC', textAlign: 'center' }}>
            Join us now!
          </Text>

        <View style={styles.rowCenter}>

          <FBLogin style={{ alignItems: 'center', justifyContent: 'center',}}
            permissions={["email","user_friends"]}
            onPress={function(){
              console.log("FBLoginMock clicked.");
              if( itypeof(this.props.permissions) === 'array'){
                permissions = this.props.permissions;
              }
              FBLoginManager.loginWithPermissions(permissions, (err,data) => _this._handleEvent(err,data));
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
    this.props.navigator.replace({
      id: 'welcome'
    });
  },

});


// export default login;
module.exports = Login;
