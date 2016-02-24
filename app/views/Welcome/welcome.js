'use strict';

var React = require('react-native');  
  
import welcomestyles from '../welcomestyles.js'; 
import styles from '../styles.js'; 
import store  from 'react-native-simple-store';

var {
  StyleSheet, 
  Image,
  View,
  TouchableHighlight,
  Text, 
  AsyncStorage,
  TextInput
} = React;

var FBLogin = require('react-native-facebook-login'); 
var FBLoginManager = require('NativeModules').FBLoginManager;

var FB_PHOTO_WIDTH = 200; 

var Welcome = React.createClass({  

  getInitialState(){ 
    return { 
    };
  },

  componentWillMount(){
    console.log("Welcome componentWillMount"); 


    AsyncStorage.getItem("viewed_welcome").then((value) => {

      this.setState({"viewedWelcome": value});
      if (value == "true") {
        console.log("going directly to main");
        this.gotoMain();
      }
      else{ 
        this.showProfile();
      }
       

    }).done();

  },

  componentDidMount(){
    console.log("Welcome componentDidMount"); 
    
  },  

  showProfile(){
    // var passdata = this.props.route.data.fb; 
    // console.log(passdata);
    // this.setState({ user: passdata}); 

    // Check if component is mounted
    var _this = this;
    var data = null;  

    // if (this.isMounted()) {
      FBLoginManager.getCredentials(function(error, data){   

        if (!error) { 
          _this.setState({ user : data.credentials }); 
        } 
        else {
          _this.setState({ user : null });
        }
 
      });     

  },

  render() {    
    var self = this;
    var user = this.state.user;
    console.log("welcome rendering..."); 

    if (self.state.viewedWelcome == null) return self.renderLoading();

    return ( 
      <View style={welcomestyles.container}>   
       
        { user && <Info user={user} /> } 
        { user && <Photo user={user} /> } 

        <View style={welcomestyles.welcomebar}>
          <Text style={welcomestyles.welcometext}> Welcome to Bohol </Text>
        </View>
 
        <TouchableHighlight style={welcomestyles.button}
          onPress={this.gotoExplore}
            underlayColor='#29D92E'>
          <Text style={welcomestyles.buttonText}>Explore</Text>
        </TouchableHighlight>

        {/*<TouchableHighlight style={welcomestyles.button}
          onPress={this.gotoSecond}
            underlayColor='#29D92E'>
          <Text style={welcomestyles.buttonText}>2nd page</Text>
        </TouchableHighlight> */}

      </View>
    );
  }, 

  logout() {
    this.props.navigator.replace({
      id: 'login'
    }); 
  }, 

  gotoMain() {  
    var navigator = this.props.navigator;  
    var screen = 'main'; 

    this.props.navigator.resetTo({
      id: screen
    }); 
  },


  gotoExplore() {
    this.props.navigator.push({
      id: 'main'
    }); 
  },

  gotoSecond() {
    this.props.navigator.push({
      id: 'second'
    }); 
  },
  renderLoading(){
    return (
       <View style={welcomestyles.container}>   
        <Text style={styles.rowCenter}></Text>
      </View>
    );
  }

}); 



var Photo = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState(){
    return {
      photo: null,
    };
  },

  componentWillMount(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          photo : {
            url : responseData.data.url,
            height: responseData.data.height,
            width: responseData.data.width,
          },
        });
      })
      .done();
  },

  render(){
    if(this.state.photo == null) return this.renderLoading();
    
    var photo = this.state.photo;
    AsyncStorage.setItem("profile_photo", photo.url); 

    return (
      <View style={styles.rowCenter}>

        <Image
          style={photo &&
            {
              height: photo.height - 70,
              width: photo.width - 70,
            }
          }
          source={{uri: photo && photo.url}}
        />
      </View>
    );
  },
  renderLoading(){
    return (
      <View>
        <Text style={styles.rowCenter}>Loading...</Text>
      </View>
    );
  }
});


var Info = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      info: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.3/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,
          },
        });
      })
      .done();
  },

  render: function(){
     if(this.state.info == null) return this.renderLoading();

    var info = this.state.info;
    AsyncStorage.setItem("profile_name", info.name); 

    return (
      <View style={styles.center}>


        <View style={welcomestyles.titlebar}>
          <Text style={welcomestyles.title}>Hi, { info && info.name }</Text>
        </View>

        {/*  <Text>{ info && this.props.user.userId }</Text>*/}
    
       {/*  <Text>{ info && info.email }</Text>*/}
      </View>
    );
  },
  renderLoading(){
    return (
      <View>
        <Text style={styles.rowCenter}></Text>
      </View>
    );
  }
});

module.exports = Welcome;
