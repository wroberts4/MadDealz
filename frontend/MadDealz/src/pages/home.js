import React, {Component} from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  Text,
  View,
  RefreshControl,
  Dimensions,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SearchBar} from 'react-native-elements';
import styles from './styles';
import Modal, { SlideAnimation, ModalTitle, ModalContent, ModalFooter, ModalButton, } from 'react-native-modals';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import ToggleSwitch from 'toggle-switch-react-native';
import { goToBarPage } from '../../navigation';

bar_requests = require('../requests/bar_requests');

console.disableYellowBox = true;

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
var position = 0;
var weekday = new Array(7);
var w_position = 0;

function Item({name, address, deal_0, deal_1, time}) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
      {/* <Text style={styles.address}>{deal_0 + ': '}{time}</Text>
      <Text style={styles.address}>{deal_1 + ': '}{time}</Text> */}
    </View>
  );
}

function Day() {
  var date = new Date();
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let current_day = weekday[date.getDay()];
  w_position = date.getDay();

  return current_day
}
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
      distance: false,
      distanceSwitch: false,
      ratingSwitch: false,
      alpha: false,
      alphaSwitch: false,
      current: undefined,
      gestureName: 'none',
      c_day: Day(),
    };
    this.arrayholder = []
    this.weekdays = []
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

  get_list_of_bars() {
    bar_requests.get_bars(43.0731, 89.4012, 30, 10000).then(bar_list => {
      this.setState({bars: bar_list});
      // this.arrayholder = bar_list;
      this.sort_bars();
    });
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
 
  sort_bars() {
    let Monday = [];
    let Tuesday = [];
    let Wednesday = [];
    let Thursday = [];
    let Friday = [];
    let Saturday = [];
    let Sunday = [];
    for (let i = 0; i < this.state.bars.length; i++) {
      let temp = this.state.bars[i].deals[0];
      if(temp != undefined) {
        if(typeof temp.times.Monday != "undefined") {
          Monday.push(this.state.bars[i])
        }
        if(typeof temp.times.Tuesday != "undefined") {
          Tuesday.push(this.state.bars[i])
        }
        if(typeof temp.times.Wednesday != "undefined") {
          Wednesday.push(this.state.bars[i])
        }
        if(typeof temp.times.Thursday != "undefined") {
          Thursday.push(this.state.bars[i])
        }
        if(typeof temp.times.Friday != "undefined") {
          Friday.push(this.state.bars[i])
        }
        if(typeof temp.times.Saturday != "undefined") {
          Saturday.push(this.state.bars[i])
        }
        if(typeof temp.times.Sunday != "undefined") {
          Sunday.push(this.state.bars[i])
        }
      }
      this.weekdays.push(Sunday);
      this.weekdays.push(Monday);
      this.weekdays.push(Tuesday);
      this.weekdays.push(Wednesday);
      this.weekdays.push(Thursday);
      this.weekdays.push(Friday);
      this.weekdays.push(Saturday);

    }
    if(Day()===("Sunday")) {
      this.setState({current:  this.weekdays[0]});
      this.arrayholder = this.weekdays[0];
      this.alpha = [...this.weekdays[0]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[0]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 0;
    }
    if(Day()===("Monday")) {
      console.log("this.mon", this.Mon)
      this.setState({current: this.weekdays[1]});
      this.arrayholder = this.weekdays[1];
      this.alpha = [...this.weekdays[1]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[1]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 1;
    }
    if(Day()===("Tuesday")) {
      this.setState({current: this.weekdays[2]});
      this.arrayholder =  this.weekdays[2];
      this.alpha = [...this.weekdays[2]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[2]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 2;
    }
    if(Day()===("Wednesday")) {
      this.setState({current:  this.weekdays[3]});
      this.arrayholder =  this.weekdays[3];
      this.alpha = [...this.weekdays[3]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[3]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 3;
    }
    if(Day()===("Thursday")) {
      this.setState({current:  this.weekdays[4]});
      this.arrayholder =  this.weekdays[4];
      this.alpha = [...this.weekdays[4]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[4]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 4;
    }
    if(Day()===("Friday")) {
      this.setState({current:  this.weekdays[5]});
      this.arrayholder =  this.weekdays[5];
      this.alpha = [...this.weekdays[5]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[5]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 5;
    }
    if(Day()===("Saturday")) {
      this.setState({current:  this.weekdays[6]});
      this.arrayholder =  this.weekdays[6];
      this.alpha = [...this.weekdays[6]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[6]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 6;
    }
    console.log(this.state.current[0].deals[1].info);
  }
  

  searchFunction(text) {
    console.log("hello", this.arrayholder);
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(newData)
    this.setState({ 
      current: newData,
      search: text
    });
    console.log("data ", this.state.current)
  };

  onSwipeRight(gestureState) {
    this.setState({alphaSwitch: false, dSwitch: false});
    if(position-1 < 0) {
      position = 6;
      this.setState({current: this.weekdays[position]});
      this.arrayholder = this.weekdays[position];
      this.alpha = [...this.weekdays[position]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[position]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      this.setState({c_day: weekday[position]});
    }
    else {
      position = position-1;
      this.setState({current: this.weekdays[position]})
      this.arrayholder = this.weekdays[position];
      this.alpha = [...this.weekdays[position]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[position]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      this.setState({c_day: weekday[position]})
    }
  }

  onSwipeLeft(gestureState) {
    this.setState({alphaSwitch: false, dSwitch: false});
    if(position+1 > 6) {
      position = 0;
      this.setState({current: this.weekdays[position]})
      this.arrayholder = this.weekdays[position];
      this.alpha = [...this.weekdays[position]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[position]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      this.setState({c_day: weekday[position]})
    }
    else {
      position = position+1;
      this.setState({current: this.weekdays[position]})
      this.arrayholder = this.weekdays[position];
      this.alpha = [...this.weekdays[position]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[position]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      this.setState({c_day: weekday[position]})
    }
  }

  // onSwipe(gestureName, gestureState) {
  //   const {SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  //   this.setState({gestureName: gestureName});
  //   switch()
  // }

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    }

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
      outputRange: [0, -HEADER_SCROLL_DISTANCE - 5],
      extrapolate: 'clamp',
    });
    const searchTranslate = scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE + 35],
      outputRange: [0, -(HEADER_SCROLL_DISTANCE + 30)],
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
      <GestureRecognizer
      onSwipeLeft={(state) => this.onSwipeLeft(state)}
      onSwipeRight={(state) => this.onSwipeRight(state)}
      config={config}
      style = {{backgroundColor: 'transparent', flex: 1}}
      >
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
          data={this.state.current}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => this.barPage(item)}>
              <Item 
                name={item.name} 
                address={item.address}
                // deal_0 = {item.deals.info != undefined ? item.deals[0].info : 'No Deals'}
                // deal_1 = {item.deals[0].info != undefined ? item.deals.info : 'No Deals'}
                // time = {(item.deals[0].times['Tuesday'] != undefined) ? item.deals[0].times['Tuesday']['start'] + '-' + item.deals[0].times['Tuesday']['end']: 
                // (item.deals[0].times['Wednesday'] != undefined) ? item.deals[0].times['Wednesday']['start'] + '-' + item.deals[0].times['Wednesday']['end']: 
                // (item.deals[0].times['Thursday'] != undefined) ? item.deals[0].times['Thursday']['start'] + '-' + item.deals[0].times['Thursday']['end'] : 
                // (item.deals[0].times['Friday'] != undefined) ? item.deals[0].times['Friday']['start'] + '-' + item.deals[0].times['Friday']['end'] :
                // (item.deals[0].times['Saturday'] != undefined) ? item.deals[0].times['Saturday']['start'] + '-' + item.deals[0].times['Saturday']['end'] :
                // (item.deals[0].times['Sunday'] != undefined) ? item.deals[0].times['Sunday']['start'] + '-' + item.deals[0].times['Sunday']['end'] :
                // (item.deals[0].times['Monday'] != undefined) ? item.deals[0].times['Monday']['start'] + '-' + item.deals[0].times['Monday']['end'] : 'No Time'} 

              />
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
            {this.state.c_day}
            {"\n"}
            {"Deals"}
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
      </GestureRecognizer>
    );
  }
}
