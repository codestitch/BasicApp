
'use strict';

import React from 'react-native';
import styles from '../styles.js';
import store  from 'react-native-simple-store';

var EventData = require('../../assets/data/events.json');

const {
  Component,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ListView,
  Image,
} = React;

class news extends Component{

  constructor(props){
    super(props);

    this.state = {
      date: new Date(),
      profileName: 'You',
      isLoading: false,
      model: {

      },
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    }
  }

  componentWillMount(){
    // store.get('profile_name').then((name) => {
    //   if(!name){
    //     //error
    //   }
    //   this.setState({'profileName': name});
    // });
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData(){
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(EventData.data),
      loaded: true,
    });
  }

  renderList(events, sectionID, rowID) {
    var self = this;
    return (
      <TouchableHighlight
        onPress={() => this.gotoDetails(events)}
        underlayColor='#29D92E' >

        <View style={styles.listcontainer}>
          <Image
            source={{uri: events.image}}
            style={styles.wholeimage} >

              <View style={styles.headlineContainer}>
                <Text style={styles.title}>{events.title}</Text>
                <Text style={styles.description}>{events.title}</Text>
              </View>

          </Image>
        </View>
      </TouchableHighlight>
    );
  }



  render(){

    return (
      <View style={styles.launchView}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderList.bind(this)}
          style={styles.listView}
        />

      </View>
    );
  }



  gotoDetails(eventdata) {
    this.props.navigator.push({
      id: 'newsdetails',
      passProps: { data: eventdata  }
    });
  }


}


export default news;
