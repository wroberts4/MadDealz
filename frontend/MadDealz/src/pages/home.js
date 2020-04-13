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
import Dialog, {
  DialogTitle,
  DialogContent,
  SlideAnimation,
  DialogButton,
  DialogFooter,
} from 'react-native-popup-dialog';
import ToggleSwitch from 'toggle-switch-react-native';
import { goToBarPage } from '../../navigation';

bar_requests = require('../requests/bar_requests');

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

function Item({name, address}) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
    </View>
  );
}

function Day() {
  var date = new Date();
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let current_day = weekday[date.getDay()];
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
    };
    this.arrayholder = []
  }

  filterPress = () => {
    this.setState({filterVisible: true});
  };

  distancePress = () => {
    this.setState({distance: true});
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
      this.arrayholder = bar_list;
    });
    
  }

  searchFunction(text) {
    const newData = this.arrayholder.filter(function(item) {
      const itemData = item.name.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    console.log(newData)
    this.setState({ 
      bars: newData,
      search: text
    });
    console.log("data ", this.state.data)
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
      inputRange: [0, HEADER_SCROLL_DISTANCE],
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

    const dSwitch = this.state.distanceSwitch;

    let dButton;

    if (dSwitch == false) {
      dButton = (
        <ToggleSwitch
          isOn={this.state.distanceSwitch}
          offColor="grey"
          onColor="skyblue"
          onToggle={() => this.setState({distanceSwitch: true})}
        />
      );
    } else {
      dButton = (
        <ToggleSwitch
          isOn={this.state.distanceSwitch}
          offColor="grey"
          onColor="skyblue"
          onToggle={() => this.setState({distanceSwitch: false})}
        />
      );
    }

    return (
      <View style={styles.fill}>
        <Dialog
          rounded
          width={Dimensions.get('screen').width * 0.75}
          visible={this.state.filterVisible}
          dialogTitle={<DialogTitle title="Filter" />}
          onTouchOutside={() => {
            this.setState({filterVisible: false});
          }}
          dialogAnimation={
            new SlideAnimation({
              initialValue: 0,
              slideFrom: 'bottom',
              useNativeDriver: true,
            })
          }>
          <DialogContent>
            <View style={styles.dialogeviewouter}>
              <View style={styles.dialogviewinner}>
                <Text style={styles.dialogviewtext}>Distance</Text>
                {/* <View style = {{paddingLeft: 100}}>
                  {dButton}
                </View> */}
              </View>
              {dButton}
            </View>
            <View style = {styles.dialogviewinner}>
              <Text style={styles.dialogviewtext}>Next thing</Text>
            </View>
          </DialogContent>
          <DialogFooter>
            <DialogButton
              text="Cancel"
              onPress={() => this.setState({filterVisible: false})}
            />
            <DialogButton
              text="Search"
              onPress={() => this.setState({filterVisible: false})}
            />
          </DialogFooter>
        </Dialog>
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
            top: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 30,
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
              <Item name={item.name} address={item.address} />
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
            {Day()}
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
          }}>
          <SearchBar
            platfrom="android"
            round
            containerStyle={styles.searchbar}
            inputContainerStyle={styles.searchbarinput}
            inputStyle={styles.searchbarinputtext}
            onChangeText={text => this.searchFunction(text)}
            // onClear={text => this.searchFunction('')}
            value={this.state.search}
            placeholder="Search Bars Here"
          />
        </Animated.View>
      </View>
    );
  }
}
