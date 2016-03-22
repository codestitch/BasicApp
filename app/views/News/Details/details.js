'use strict'

import React from 'react-native';
import styles from '../../styles.js';


const {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  ActivityIndicatorIOS,
  Image,
  Alert,
} = React;


class Details extends React.Component {


  render(){
    var data = this.props.route.passProps.data;
    return(

        <View style={styles.container}>
          <View style={styles.toolbar}>
              <Text onPress={this.goBack.bind(this)} style={styles.toolbarButton}>Events</Text>
              <Text style={styles.toolbarTitle}> { data.title } </Text>
              <Text onPress={this.myFavorite}  style={styles.toolbarButton}>Like</Text>
          </View>

          <View style={styles.detailcontainer} >
            <Image
              source={{uri: data.image}}
              style={styles.detailimg} >
            </Image>
          </View>
          <Text style={styles.detaildescription}> { data.description } </Text>
        </View>

    );
  }

  goBack(){
    this.props.navigator.pop();
  }

  myFavorite(){
    Alert.alert(
     'Event Saved',
     'Cool! you\'ve saved this greate event'
   );

  }
}

module.exports = Details;
