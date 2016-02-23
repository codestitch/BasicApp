'use strict';

var React = require('react-native'); 
import mainstyles from '../mainstyles.js'; 
import styles from '../styles.js'; 
import Tabbar, { Tab, RawContent, IconWithBar, glypyMapMaker } from 'react-native-tabbar';

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
  Component
} = React;

var FBLogin = require('react-native-facebook-login');  
 

var Main = React.createClass({  
  getInitialState(){ 
    return {
      toggle : false
    };
  }, 
  render() {
    return (
      <Navigator
          renderScene={this.renderScene}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#007966'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  },
  renderScene(route, navigator) {
    var self = this;
    return (  
        <Tabbar ref="myTabbar" barColor={'#007966'}>
        <Tab name="home">
          <IconWithBar label="Tour" type={glypy.Home} from={'icomoon'}/>
          <RawContent>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent:'center' }}>
              <Text> Hotels / Resorts </Text>
            </View>
          </RawContent>
        </Tab>
        <Tab name="camera">
          <IconWithBar label="News" type={glypy.Camera} from={'icomoon'}/>
          <RawContent>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent:'center' }}>
              <Text onPress={()=>console.log('camera')}>News</Text>
            </View>
          </RawContent>
        </Tab>
        <Tab name="stats">
          <IconWithBar label="Events" type={glypy.Stat} from={'icomoon'}/>
          <RawContent>
            <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent:'center' }}>
              <Text onPress={()=>console.log('stats')}>Events</Text>
            </View>
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
                    // _this.setState({ user : null });
                  }} 
                /> 
            </View>
          </RawContent>
        </Tab>
      </Tabbar> 
    );
  },
  gotoPersonPage() {
     
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
