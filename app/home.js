'use strict';

var React = require('react-native');
import styles from './views/styles.js';

//views
import Login from './views/Login';
import Welcome from './views/Welcome';
import Main from './views/Main';
import Tour from './views/Tour';
import Tour_Details from './views/Tour/Details';
import News from './views/News';
import News_Details from './views/News/Details';
import Events from './views/Events';
import Events_Details from './views/Events/Details';


const {
  View,
  StyleSheet,
  Navigator,
  Dimensions
} = React;

// Get the width and height of the window
const {
  width,
  height
} = Dimensions.get('window');

// Navigator configuration of animations.
const BaseConfig = Navigator.SceneConfigs.FloatFromRight;

const CustomLeftToRightGesture = Object.assign({}, BaseConfig.gestures.pop, {
  // Make it snap back really quickly after canceling pop
  //snapVelocity: 8,
  // Make it so we can drag anywhere on the screen
  edgeHitWidth: width
});

const CustomSceneConfig = Object.assign({}, BaseConfig, {
  // A tightly wound spring will make this transition fast
  //springTension: 100,
  //springFriction: 1,
  // Use our custom gesture defined above
  gestures: {
    pop: CustomLeftToRightGesture
  }
})

var home = React.createClass({
  //A simple switch statement to allow our router to work
  getView(id){
    switch (id){
      case 'login':
          return Login;
      case 'welcome':
          return Welcome;
      case 'main':
          return Main;
      case 'tour':
          return Tour;
      case 'tourdetails':
          return Tour_Details;
      case 'news':
          return News;
      case 'newsdetails':
          return News_Details;
      case 'events':
          return Events;
      case 'eventsdetails':
          return Events_Details;
    }
  },

  renderScene(route, navigator) {
    console.log('route ID: ' + route.id);
    let Component = this.getView(route.id);
    return (
        <Component
          route={route}
          navigator={navigator}
        />
    );
  },

  configureScene(route) {
    return CustomSceneConfig;
  },

  render() {
    return (
      <Navigator
        style={styles.container}
        renderScene={this.renderScene}
        configureScene={this.configureScene}
        navigationBarHidden={true}
        initialRoute={{
          id: 'login'
        }}
      />
    );
  }
});

module.exports = home;
