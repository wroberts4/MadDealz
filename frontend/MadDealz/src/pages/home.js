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
import { goToBarPage } from '../../navigation';

bar_requests = require('../requests/bar_requests');

console.disableYellowBox = true;

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
var position = 0;
var weekday = new Array(7);
var w_position = 0;
const flatlist_len = 2;

/*
function Item({name, address, deal_0, deal_1, time_0, time_1}) {
  if(deal_1 == null) {
    return (
      <View style={styles.item}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.address}>{deal_0 + ': '}{time_0}</Text>
      </View>
    );
  }
  else {
    return (
      <View style={styles.item}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.address}>{deal_0 + ': '}{time_0}</Text>
        <Text style={styles.address}>{deal_1 + ': '}{time_1}</Text>
      </View>
    );
  }
}
*/

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
    this.current_deals = []
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

  bar_deals_to_array() {
    //take arrayholder and check whether it has deals on the certain day
    //so for every bar, go through the bar deals and check if on that certain day it has deals
    for(let i = 0; i < this.state.current.length; i++) {
      temp = []
      if(this.state.c_day == 'Monday') {
        if(this.state.current[i].Monday == undefined) {
          this.state.current[i].Monday = [];
          count = 0;
          for(let j = 0; j < this.state.current[i].deals.length; j++) {
            if (count > flatlist_len) break;
            if(this.state.current[i].deals[j].times[this.state.c_day] != undefined) {
              count++;
              let deal = "";
              if(j == this.state.current[i].deals.length-1){
                deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'];
              }
              else{
                deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'] + '\n';
              }
              // console.log('deal', deal);
              // temp.push(this.arrayholder[i]._id);
              temp.push(deal);
            }
          }
          this.state.current[i].Monday = [...temp];
        }
      }
      if(this.state.c_day == 'Tuesday') {
        if(this.state.current[i].Tuesday == undefined) {
          this.state.current[i].Tuesday = [];
          let count = 0;
          for(let j = 0; j < this.state.current[i].deals.length; j++) {
            if (count > flatlist_len) break;
            if(this.state.current[i].deals[j].times[this.state.c_day] != undefined) {
              count++;
              let deal = "";
              if(j == this.state.current[i].deals.length-1){
                deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'];
              }
              else{
                deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'] + '\n';
              }
              // console.log('deal', deal);
              // temp.push(this.arrayholder[i]._id);
              temp.push(deal);
            }
          }
          this.state.current[i].Tuesday = [...temp];
        }
      }
      if(this.state.c_day == 'Wednesday') {
        this.state.current[i].Wednesday = [];
        count = 0;
        for(let j = 0; j < this.state.current[i].deals.length; j++) {
          if (count > flatlist_len) break;
          if(this.state.current[i].deals[j].times[this.state.c_day] != undefined) {
            count++
            let deal = "";
            if(j == this.state.current[i].deals.length-1){
              deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'];
            }
            else{
              deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'] + '\n';
            }
            // console.log('deal', deal);
            // temp.push(this.arrayholder[i]._id);
            temp.push(deal);
          }
        }
        this.state.current[i].Wednesday = [...temp];
      }
      if(this.state.c_day == 'Thursday') {
        this.state.current[i].Thursday = [];
        count = 0;
        for(let j = 0; j < this.state.current[i].deals.length; j++) {
          if (count > flatlist_len) break;
          if(this.state.current[i].deals[j].times[this.state.c_day] != undefined) {
            count++
            let deal = "";
            if(j == this.state.current[i].deals.length-1){
              deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'];
            }
            else{
              deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'] + '\n';
            }
            // console.log('deal', deal);
            // temp.push(this.arrayholder[i]._id);
            temp.push(deal);
          }
        }
        this.state.current[i].Thursday = [...temp];
      }
      if(this.state.c_day == 'Friday') {
        this.state.current[i].Friday = [];
        count = 0;
        for(let j = 0; j < this.state.current[i].deals.length; j++) {
          if (count > flatlist_len) break;
          if(this.state.current[i].deals[j].times[this.state.c_day] != undefined) {
            count++;
            let deal = "";
            if(j == this.state.current[i].deals.length-1){
              deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'];
            }
            else{
              deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'] + '\n';
            }
            // console.log('deal', deal);
            // temp.push(this.arrayholder[i]._id);
            temp.push(deal);
          }
        }
        this.state.current[i].Friday = [...temp];
      }
      if(this.state.c_day == 'Saturday') {
        this.state.current[i].Saturday = [];
        count = 0;
        for(let j = 0; j < this.state.current[i].deals.length; j++) {
          if (count > flatlist_len) break;
          if(this.state.current[i].deals[j].times[this.state.c_day] != undefined) {
            count++
            let deal = "";
            if(j == this.state.current[i].deals.length-1){
              deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'];
            }
            else{
              deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'] + '\n';
            }
            // console.log('deal', deal);
            // temp.push(this.arrayholder[i]._id);
            temp.push(deal);
          }
        }
        this.state.current[i].Saturday = [...temp];
      }
      if(this.state.c_day == 'Sunday') {
        this.state.current[i].Sunday = [];
        count = 0;
        for(let j = 0; j < this.state.current[i].deals.length; j++) {
          if (count > flatlist_len) break;
          if(this.state.current[i].deals[j].times[this.state.c_day] != undefined) {
            count++;
            let deal = "";
            if(j == this.state.current[i].deals.length-1){
              deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'];
            }
            else{
              deal = deal + this.state.current[i].deals[j].info + ': ' + this.state.current[i].deals[j].times[this.state.c_day]['start'] + '-' + this.state.current[i].deals[j].times[this.state.c_day]['end'] + '\n';
            }
            // console.log('deal', deal);
            // temp.push(this.arrayholder[i]._id);
            temp.push(deal);
          }
        }
        this.state.current[i].Sunday = [...temp];
      }
    } 
    // console.log("new day: ", this.state.current);
  }
    //if this is true, check for the time for the deal
    //take the deals.info and the time[blank]['start'] + '-' + time[blank]['end'] into a string
    //add that to the array
 
  sort_bars() {
    let Monday = [];
    let Tuesday = [];
    let Wednesday = [];
    let Thursday = [];
    let Friday = [];
    let Saturday = [];
    let Sunday = [];
    for (let i = 0; i < this.state.bars.length; i++) {
      for (let j = 0; j < this.state.bars[i].deals.length; j++) {
        let temp = this.state.bars[i].deals[j];
        if(temp != undefined) {
          if(typeof temp.times.Monday != "undefined") {
            if(Monday.includes(this.state.bars[i]) != true) {
              Monday.push(this.state.bars[i])
            }
          }
          if(typeof temp.times.Tuesday != "undefined") {
            if(Tuesday.includes(this.state.bars[i]) != true) {
              Tuesday.push(this.state.bars[i])
            }
          }
          if(typeof temp.times.Wednesday != "undefined") {
            if(Wednesday.includes(this.state.bars[i]) != true) {
              Wednesday.push(this.state.bars[i])
            }
          }
          if(typeof temp.times.Thursday != "undefined") {
            if(Thursday.includes(this.state.bars[i]) != true) {
              Thursday.push(this.state.bars[i])
            }
          }
          if(typeof temp.times.Friday != "undefined") {
            if(Friday.includes(this.state.bars[i]) != true) {
              Friday.push(this.state.bars[i])
            }
          }
          if(typeof temp.times.Saturday != "undefined") {
            if(Saturday.includes(this.state.bars[i]) != true) {
              Saturday.push(this.state.bars[i])
            }
          }
          if(typeof temp.times.Sunday != "undefined") {
            if(Sunday.includes(this.state.bars[i]) != true) {
              Sunday.push(this.state.bars[i])
            }
          }
        }
      }
    }

    this.weekdays.push(Sunday);
    this.weekdays.push(Monday);
    this.weekdays.push(Tuesday);
    this.weekdays.push(Wednesday);
    this.weekdays.push(Thursday);
    this.weekdays.push(Friday);
    this.weekdays.push(Saturday);

    for(let i = 0; i < this.weekdays.length; i++) {
      this.setState({current: this.weekdays[i]});
      this.setState({c_day: weekday[i]});
      this.bar_deals_to_array();
      console.log(i + ': ' + this.weekdays[i]);
    }
    this.setState({c_day: Day()});

    if(Day()===("Sunday")) {
      this.setState({current:  this.weekdays[0]});
      this.arrayholder = this.weekdays[0];
      // this.bar_deals_to_array();
      this.alpha = [...this.weekdays[0]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[0]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 0;
    }
    if(Day()===("Monday")) {
      this.setState({current: this.weekdays[1]});
      this.arrayholder = this.weekdays[1];
      // this.bar_deals_to_array();
      this.alpha = [...this.weekdays[1]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[1]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 1;
    }
    if(Day()===("Tuesday")) {
      this.setState({current: this.weekdays[2]});
      this.arrayholder =  this.weekdays[2];
      // this.bar_deals_to_array();
      console.log('Tuesdays stuff ', this.state.current);
      this.alpha = [...this.weekdays[2]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[2]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 2;
    }
    if(Day()===("Wednesday")) {
      this.setState({current:  this.weekdays[3]});
      this.arrayholder =  this.weekdays[3];
      // this.bar_deals_to_array();
      this.alpha = [...this.weekdays[3]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[3]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 3;
    }
    if(Day()===("Thursday")) {
      this.setState({current:  this.weekdays[4]});
      this.arrayholder =  this.weekdays[4];
      // this.bar_deals_to_array();
      this.alpha = [...this.weekdays[4]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[4]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 4;
    }
    if(Day()===("Friday")) {
      this.setState({current:  this.weekdays[5]});
      this.arrayholder =  this.weekdays[5];
      // this.bar_deals_to_array();
      this.alpha = [...this.weekdays[5]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[5]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 5;
    }
    if(Day()===("Saturday")) {
      this.setState({current:  this.weekdays[6]});
      this.arrayholder =  this.weekdays[6];
      // this.bar_deals_to_array();
      this.alpha = [...this.weekdays[6]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[6]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      position = 6;
    }
<<<<<<< HEAD
=======
    //console.log('hello m8 ', this.weekdays[3][0].deals[1].times);
>>>>>>> 73ea8741fcc452b1d4ed31baee991a8e588db1c1
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
      // this.bar_deals_to_array();
    }
    else {
      position = position-1;
      this.setState({current: this.weekdays[position]})
      this.arrayholder = this.weekdays[position];
      this.alpha = [...this.weekdays[position]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[position]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      this.setState({c_day: weekday[position]});
      // this.bar_deals_to_array();
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
      this.setState({c_day: weekday[position]});
      // this.bar_deals_to_array();
    }
    else {
      position = position+1;
      this.setState({current: this.weekdays[position]})
      this.arrayholder = this.weekdays[position];
      this.alpha = [...this.weekdays[position]];
      this.alpha = this.alpha.sort(this.compare_item_names);
      this.rating = [...this.weekdays[position]];
      this.rating = this.rating.sort(this.compare_item_ratings);
      this.setState({c_day: weekday[position]});
      // this.bar_deals_to_array();
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
              <View style={styles.item}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.address}>{item.address}</Text>
                <Text style={styles.address}>
                  {this.state.c_day == 'Monday' ? item.Monday : 
                  this.state.c_day == 'Tuesday' ? item.Tuesday:
                  this.state.c_day == 'Wednesday' ? item.Wednesday :
                  this.state.c_day == 'Thursday' ? item.Thursday :
                  this.state.c_day == 'Friday' ? item.Friday :
                  this.state.c_day == 'Saturday' ? item.Saturday :
                  this.state.c_day == 'Sunday' ? item.Sunday : ''}
                </Text>
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

/*
<FlatList
                  data={item.deals}
                  renderItem={({item}) => (
                    <Text style={styles.address}>
                      {this.state.c_day == 'Monday' && item.times['Monday'] != undefined ? item.info + ': ' : 
                      this.state.c_day == 'Tuesday'  && item.times['Tuesday'] != undefined ? item.info + ': ' :
                      this.state.c_day == 'Wednesday' && item.times['Wednesday'] != undefined ? item.info + ': ' :
                      this.state.c_day == 'Thursday' && item.times['Thursday'] != undefined ? item.info + ': ' :
                      this.state.c_day == 'Friday' && item.times['Friday'] != undefined ? item.info + ': ' :
                      this.state.c_day == 'Saturday' && item.times['Saturday'] != undefined ? item.info + ': ' :
                      this.state.c_day == 'Sunday' && item.times['Sunday'] != undefined ? item.info + ': ' : ''}
                      {this.state.c_day == 'Monday' && item.times['Monday'] != undefined ? item.times['Monday']['start'] + '-' + item.times['Monday']['end'] : 
                      this.state.c_day == 'Tuesday'  && item.times['Tuesday'] != undefined ? item.times['Tuesday']['start'] + '-' + item.times['Tuesday']['end'] :
                      this.state.c_day == 'Wednesday' && item.times['Wednesday'] != undefined ? item.times['Wednesday']['start'] + '-' + item.times['Wednesday']['end'] :
                      this.state.c_day == 'Thursday' && item.times['Thursday']!= undefined ? item.times['Thursday']['start'] + '-' + item.times['Thursday']['end'] :
                      this.state.c_day == 'Friday' && item.times['Friday'] != undefined ? item.times['Friday']['start'] + '-' + item.times['Friday']['end'] :
                      this.state.c_day == 'Saturday' && item.times['Saturday'] != undefined ? item.times['Saturday']['start'] + '-' + item.times['Saturday']['end'] :
                      this.state.c_day == 'Sunday' && item.times['Sunday'] != undefined ? item.times['Sunday']['start'] + '-' + item.times['Sunday']['end'] : ''}
                    </Text>
                  )}
                  keyExtractor={item => item._id}
                  >

                </FlatList>
*/