'use strict';

var React = require('react-native');
import styles from '../loginstyles.js'; 

var {
  StyleSheet,
  Component,
  Image,
  View,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} = React;


var FBLogin = require('react-native-facebook-login'); 
var FBLoginManager = require('NativeModules').FBLoginManager;

var FB_PHOTO_WIDTH = 200;

var Main = React.createClass({  

  getInitialState(){ 
    return {
      user: null, 
    };
  },

  componentWillMount(){
  },

  componentDidMount(){
    this.updateView(); 
	},

  updateView(){  
    var _this = this;
    FBLoginManager.getCredentials(function(error, data){ 

      if (!error) {
        _this.setState({ user : data.credentials });  
      } else {
        _this.setState({ user : null });
      }
    });
 
  },
 

  render() {   
    var user = this.state.user;
    return ( 
    	<View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
	 
        { user && <Photo user={user} /> }
          { user && <Info user={user} /> }

        <TouchableHighlight style={{backgroundColor: 'yellow', padding: 10}}
            onPress={this.gotoPersonPage}>
          <Text style={{backgroundColor: 'yellow', color: 'green'}}>Main page</Text>
        </TouchableHighlight>

        <View style={styles.rowCenter}> 

          <FBLogin style={{ alignItems: 'center', justifyContent: 'center',}} 
            onLogout={function(){
              console.log("FBLoginMock logged out."); 
            }} 
          /> 
        </View>


      </View>
    );
  },
 

  gotoPersonPage() {
    this.props.navigator.push({
      id: 'PersonPage',
      name: 'PersonPage',
    });
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

    return (
      <View style={styles.bottomBump}>

        <Image
          style={photo &&
            {
              height: photo.height,
              width: photo.width,
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
        <Text>Loading...</Text>
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
    var info = this.state.info;

    return (
      <View style={styles.bottomBump}>
        <Text>{ info && this.props.user.userId }</Text>
        <Text>{ info && info.name }</Text>
        <Text>{ info && info.email }</Text>
      </View>
    );
  }
});
 

module.exports = Main;
