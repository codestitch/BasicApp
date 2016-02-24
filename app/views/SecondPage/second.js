'use strict'

var React = require('react-native');
import Tabbar, { Tab, RawContent, IconWithBar, glypyMapMaker } from 'react-native-tabbar';

import mainstyles from '../mainstyles.js'; 
import styles from '../styles.js'; 

const glypy = glypyMapMaker({
  Home: 'e900',
  Camera: 'e901',
  Stat: 'e902',
  Settings: 'e903',
  Favorite: 'e904'
});

const {
  StyleSheet,
  Image,
  Text, 
  Navigator,
  View, 
  Component,
  AsyncStorage,
  ScrollView,
} = React; 

var FBLogin = require('react-native-facebook-login');  


var Second = React.createClass({
	getInitialState(){
		return{
			user: null
		}
	},
componentDidMount(){
    console.log("componentDidMount");
    AsyncStorage.getItem("myKey").then((value) => {
        this.setState({"myKey": value});
        console.log("value");
        console.log(value);
    }).done();
    // this.showProfile(); 
  },   
	componentWillMount(){
		console.log("componentWillMount");
		// var passdata = this.props.route.passProps.passData; 
		// console.log(passdata);
		// this.setState({ user: passdata});
	},

	render(){
		var display = this.state.myKey;
		console.log("display");
		console.log(display);
		var disp = "hi";
		return(
        <Tabbar ref="myTabbar" barColor={'#007966'}>
        <Tab name="home">
          <IconWithBar label="Tour" type={glypy.Home} from={'icomoon'}/>
          <RawContent>
            	<View style={{flex: 1, alignItems: 'center', justifyContent:'center'}}>
	  
	        	  <Text style={{backgroundColor: 'yellow', color: 'green'}}>Main page</Text>
	        	  <Text >
                    {display}
                </Text>
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
	}
});


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

// export default login;
module.exports = Second;