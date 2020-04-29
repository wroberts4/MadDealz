import React, {Component} from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  Text,
  View,
  RefreshControl,
  Dimensions,
  FlatList
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SearchBar} from 'react-native-elements';
import styles from './styles';
import Modal, { SlideAnimation, ModalTitle, ModalContent, ModalFooter, ModalButton, } from 'react-native-modals';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import ToggleSwitch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-community/async-storage';

import { goToBarPage } from '../../navigation';

bar_requests = require('../requests/bar_requests');

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
var position = 0;
var weekday = new Array(7);
var w_position = 0;

/*
function Item({name, address}) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
    </View>
  );
}
*/

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      refreshing: false,
      bars: [],
      search: '',
      filterVisible: false,
      distanceSwitch: false,
      ratingSwitch: false,
      alphaSwitch: false,
      current: undefined,
    };
    this.arrayholder = []
    this.alpha = []
    this.rating = []
  }

  filterPress = () => {
    this.setState({filterVisible: true});
  };

  barPage = async bar => {
    const barId  = bar;
    goToBarPage(barId);
  };

  componentDidMount() {
    this.get_list_of_bars();
  }

  get_list_of_bars = async () => {
    try {
      let user = JSON.parse(await AsyncStorage.getItem('@user'));
      let bars = [];
      for (let bar of user.favorites.bars) {
        bars.push(await bar_requests.get_bar(bar, 5000));
      }
      this.setState({bars: bars});
      this.arrayholder = bars;
    } catch (err) {
      console.log(err);
    }
  }

  compare_item_names(a, b) {
    if(a.name < b.name) { return -1; }
    if(a.name < b.name) { return 1; }
    return 0;
  }

  compare_item_ratings(a, b) {
    if(a.rating > b.rating) {
      console.log("a.rating",a.rating);
      console.log("b.rating",b.rating);
      return -1; }
    if(a.rating < b.rating) { 
      console.log("a.rating",a.rating);
      console.log("b.rating",b.rating);
      return 1; }
    return 0;
  }
 
  searchFunction(text) {
    //console.log("hello", this.arrayholder);
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    //onsole.log(newData)
    this.setState({ 
      bars: newData,
      search: text
    });
    //console.log("data ", this.state.bars)
  };

  render() {
    const scrollY = Animated.add(
      this.state.scrollY,
      Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
    );
    const headerTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const filterTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE + 5],
      outputRange: [0, -HEADER_SCROLL_DISTANCE - 10],
      extrapolate: 'clamp',
    });
    const searchTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE + 35],
      outputRange: [0, -(HEADER_SCROLL_DISTANCE + 35)],
      extrapolate: 'clamp',
    });

    const imageOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 100],
      extrapolate: 'clamp',
    });

    const aSwitch = this.state.alphaSwitch;

    let aButton;

    if (aSwitch == false) {
      aButton = (
        <ToggleSwitch
          isOn={this.state.alphaSwitch}
          offColor="grey"
          onColor="skyblue"
          onToggle={() => this.setState({
            alphaSwitch: true,
            current: this.alpha,
            ratingSwitch: false,
          })}
        />
      )
    } else {
      aButton = (
        <ToggleSwitch
          isOn={this.state.alphaSwitch}
          offColor="grey"
          onColor="skyblue"
          onToggle={() => this.setState({
            alphaSwitch: false,
            current: this.arrayholder
          })}
        />
      );
    }

    const rSwitch = this.state.ratingSwitch;

    let rButton;

    if (rSwitch == false) {
      rButton = (
        <ToggleSwitch
          isOn={this.state.ratingSwitch}
          offColor="grey"
          onColor="skyblue"
          onToggle={() => this.setState({
            ratingSwitch: true,
            current: this.rating,
            alphaSwitch: false
          })}
        />
      )
    } else {
      rButton = (
        <ToggleSwitch
          isOn={this.state.ratingSwitch}
          offColor="grey"
          onColor="skyblue"
          onToggle={() => this.setState({
            ratingSwitch: false,
            current: this.arrayholder
          })}
        />
      );
    }

    return (
      <View style={styles.fill}>
        <Modal
          modalTitle={<ModalTitle title = "Filter" />}
          width={Dimensions.get('screen').width * 0.75}
          visible={this.state.filterVisible}
          swipeDirection={['up', 'down']}
          modalAnimation={new SlideAnimation({
            slideFrom: 'bottom',
          })}
          swipeThreshold={100}
          onSwipeOut={(event) => {
            this.setState({ filterVisible: false, alphaSwitch: false, ratingSwitch: false, current: this.arrayholder});
          }}
          onTouchOutside={() => {
            this.setState({ filterVisible: false, alphaSwitch: false, ratingSwitch: false, current: this.arrayholder});
          }}
          >
          <ModalContent>
            <View style={styles.dialogeviewouter}>
              <View style = {styles.dialogviewinner}>
                <Text style={styles.dialogviewtext}>Alphabetical</Text>
                <View style = {{
                  alignItems:'flex-end',
                  left: 120
                  }}>
                  {aButton}
                </View>
              </View>
              <View style={styles.dialogviewinner}>
                <Text style={styles.dialogviewtext}>Rating</Text>
                <View style = {{
                  left: 168
                  }}>
                  {rButton}
                </View>
              </View>
            </View>
          </ModalContent>
          <ModalFooter>
            <ModalButton
              text="Cancel"
              onPress={() => this.setState({
                filterVisible: false,
                alphaSwitch: false,
                dSwitch: false
              })}
            />
            <ModalButton
              text="Apply"
              onPress={() => this.setState({
                filterVisible: false
              })}
            />
            </ModalFooter>
        </Modal>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="#990000"
        />

        <Animated.View
          pointerEvents="auto"
          style={{
            backgroundColor: '#242020',
            transform: [{translateY: filterTranslate}],
            top: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : HEADER_MAX_HEIGHT,
            height: 75,
            elevation: 1,
            zIndex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 25,
              paddingLeft: 15,
              elevation: 1,
              zIndex: 1,
            }}>
            <TouchableOpacity onPress={this.filterPress} style={styles.button}>
              <Text
                style={{
                  paddingTop: 8,
                  color: 'white',
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 14,
                  paddingBottom: 8,
                }}>
                FILTER
              </Text>
            </TouchableOpacity>
          </View>
        </Animated.View>

        <Animated.FlatList
          data={this.state.bars}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.barPage(item)}>
              <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.address}>{item.address}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item._id}
          contentContainerStyle={{
            paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT + 50 : 30,
            paddingBottom: 15,
            backgroundColor: 'black',
            elevation: 20,
          }}
          style={{
            elevation: 1,
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
            {useNativeDriver: true},
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({refreshing: true});
                setTimeout(() => this.setState({refreshing: false}), 1000);
              }}
              // Android offset for RefreshControl
              progressViewOffset={HEADER_MAX_HEIGHT}
            />
          }
          // iOS offset for RefreshControl
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}></Animated.FlatList>

        <Animated.View
          pointerEvents="none"
          style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{translateY: imageTranslate}],
              },
            ]}
            source={require('../../assets/Home-background.jpg')}
          />
          <Animated.Text
          style={[styles.hometextoverlay]}>
            Favorites
          </Animated.Text>
        </Animated.View>

        <Animated.View
          pointerEvents="auto"
          style={{
            position: 'absolute',
            top: 265,
            height: 60,
            marginLeft: Dimensions.get('screen').width * 0.1,
            transform: [{translateY: searchTranslate}],
            elevation: 5,
            zIndex: 2
          }}>
          <SearchBar
            platfrom="android"
            round
            containerStyle={styles.searchbar}
            inputContainerStyle={styles.searchbarinput}
            inputStyle={styles.searchbarinputtext}
            onChangeText={text => this.searchFunction(text)}
            value={this.state.search}
            placeholder="Search Bars Here"
          />
        </Animated.View>
      </View>
    );
  }
}

/*
<FlatList
                  data={item.deals}
                  renderItem={({item}) => (
                    <Text style={styles.address}>
                      {item.info + ': '}
                      {item.times['Monday'] != undefined ? '\nMonday: ' + item.times['Monday']['start'] + '-' + item.times['Monday']['end'] : ''}
                      {item.times['Tuesday'] != undefined ? '\nTuesday: ' + item.times['Tuesday']['start'] + '-' + item.times['Tuesday']['end'] : ''}
                      {item.times['Wednesday'] != undefined ? '\nWednesday: ' + item.times['Wednesday']['start'] + '-' + item.times['Wednesday']['end'] : ''}
                      {item.times['Thursday']!= undefined ? '\nThursday: ' + item.times['Thursday']['start'] + '-' + item.times['Thursday']['end'] : ''}
                      {item.times['Friday'] != undefined ? '\nFriday: ' + item.times['Friday']['start'] + '-' + item.times['Friday']['end'] : ''}
                      {item.times['Saturday'] != undefined ? '\nSaturday: ' + item.times['Saturday']['start'] + '-' + item.times['Saturday']['end'] : ''}
                      {item.times['Sunday'] != undefined ? '\nSunday: ' + item.times['Sunday']['start'] + '-' + item.times['Sunday']['end'] : ''} 
                    </Text>
                  )}
                  keyExtractor={item => item._id}
                  >

                </FlatList>
*/