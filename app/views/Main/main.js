'use strict';

var React = require('react-native');

import mainstyles from '../mainstyles.js';
import styles from '../styles.js';
import Tabbar, { Tab, RawContent, IconWithBar, glypyMapMaker } from 'react-native-tabbar';

import Tour from '../Tour';
import News from '../News';
import Events from '../Events';

const glypy = glypyMapMaker({
  Home: 'e900',
  Camera: 'e901',
  Stat: 'e902',
  Settings: 'e903',
  Favorite: 'e904'
});

var {
  StyleSheet,
  Image,
  View,
  TouchableHighlight,
  Text,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  Component,
  AsyncStorage,
  Alert
} = React;

var FBLogin = require('react-native-facebook-login');


var Main = React.createClass({
  getInitialState(){
    return {
    };
  },

  componentWillMount(){
    console.log("Main componentWillMount");

    AsyncStorage.getItem("profile_name").then((value) => {
        this.setState({"profileName": value});
    }).done();
  },

  componentDidMount(){
    console.log("Main componentDidMount");

    AsyncStorage.setItem("viewed_welcome", "true");
  },

  render() {
      var self = this;
    if(this.state.profileName == null) return this.renderLoading();
    // console.log("display2: "+display2);
    return (
        <Tabbar ref="myTabbar" barColor={'#007966'}>
        <Tab name="home">
          <IconWithBar label="Tour" type={glypy.Home} from={'icomoon'}/>
          <RawContent>
             <Tour navigator={this.props.navigator}/>
          </RawContent>
        </Tab>
        <Tab name="camera">
          <IconWithBar label="News" type={glypy.Camera} from={'icomoon'}/>
          <RawContent>
             <News navigator={this.props.navigator}/>
          </RawContent>
        </Tab>
        <Tab name="stats">
          <IconWithBar label="Events" type={glypy.Stat} from={'icomoon'}/>
          <RawContent>
             <Events navigator={this.props.navigator}/>
          </RawContent>
        </Tab>
        <Tab name="favorite">
          <IconWithBar label="Favorites" type={glypy.Favorite} from={'icomoon'}/>
          <RawContent>
            <MyLongScrollView/>
          </RawContent>
        </Tab>
        <Tab name="settings">
          <IconWithBar label="Settings" type={glypy.Settings} from={'icomoon'}/>
          <RawContent>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent:'center' }}>
               <FBLogin style={{ alignItems: 'center', justifyContent: 'center',}}
                  onLogout={function(){
                    console.log("FBLoginMock logged out.");
                    self.logout();
                  }}
                />
                 <TouchableHighlight style={mainstyles.button}
                  onPress={this.clearStorage}
                    underlayColor='red'>
                  <Text style={mainstyles.buttonText}>Clear Welcome Storage</Text>
                </TouchableHighlight>
            </View>
          </RawContent>
        </Tab>
      </Tabbar>
    );
  },
  renderScene(route, navigator) {

  },
  clearStorage() {
    Alert.alert(
    'Alert Title',
    'Are you sure you want to clear Welcome message?',
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Clear storate'), style: 'cancel'},
      {text: 'OK', onPress: () => AsyncStorage.setItem("viewed_welcome", "false") },
    ]
  )

  },

  logout() {
    this.props.navigator.replace({
      id: 'login'
    });
  },
  renderLoading(){
    return (
      <View>
        <Text style={styles.rowCenter}></Text>
      </View>
    );
  }

});


var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          >
        <Text style={{color: 'white', margin: 10,}}>
          Profile
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          TarShare
        </Text>
      </TouchableOpacity>
    );
  }
};


class MyLongScrollView extends Component {
  constructor(props, context) {
    super(props, context);
  }

  generateContents() {
    let contents = [];
    for (let i = 0; i < 100; i++) {
      contents.push(
        <Text key={i}>Faortie Content {i}</Text>
      );
    }

    return contents;
  }

  onScroll(e) {
    const {
      nativeEvent: {
        contentOffset: { y }
      }
    } = e;

    const { getBarRef } = this.context;
    getBarRef().setBarHeight(y);
  }

  render() {
    return (
      <ScrollView
        onScroll={this.onScroll.bind(this)}
        scrollEventThrottle={16}
        style={{ flex: 1}}
        contentContainerStyle={{ alignItems: 'center' }}>
        {this.generateContents()}
      </ScrollView>
    );
  }
}

MyLongScrollView.contextTypes = {
  getBarRef: React.PropTypes.func
};

module.exports = Main;
