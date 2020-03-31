import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  RefreshControl,
  Dimensions,
  SafeAreaView,
  FlatList,
} from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';

import {SearchBar } from 'react-native-elements';
// import styles from './styles';
import Dialog, { DialogTitle, DialogContent, ScaleAnimation, DialogButton, DialogFooter } from 'react-native-popup-dialog';

import ToggleSwitch from 'toggle-switch-react-native';

bar_requests = require('../requests/bar_requests');

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

function Item({ name, address }) {
  return (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.address}>{address}</Text>
    </View>
  );
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
      filterColor: 'green',
      distanceSwitch: false,


    };
  }
  filterPress = () => {
    this.setState({ filterVisible: true})
  }

  distancePress = () => {
    this.setState({ distance: true})
  }

  // sortPress() {
  //   alert("Sort Button Pressed")
  // }
  componentDidMount() {
      this.get_list_of_bars();
  }

  get_list_of_bars() {
    bar_requests.get_bars(43.0731, 89.4012, 30, 10000).then(bar_list => {
        this.setState({ bars: bar_list });
    });
  }

  updateSearch = search => {
    this.setState({ search: search });
  };

  render() {

    const { search } = this.state;

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
      extrapolate: 'clamp'
    })
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

    if(dSwitch == false) {
      dButton = <ToggleSwitch
      isOn = {this.state.distanceSwitch}
      offColor="grey"
      onColor="skyblue"
      onToggle={
        () => this.setState({distanceSwitch:true})}/>;
      } else {
        dButton =  <ToggleSwitch
        isOn = {this.state.distanceSwitch}
        offColor="grey"
        onColor="skyblue"
        onToggle={
          () => this.setState({distanceSwitch:false})}/>;
        }

    return (
      <View style={styles.fill}>
        
        <Dialog 
          rounded
          width={Dimensions.get('screen').width*.75}
          // height={Dimensions.get('screen').height*.75}
          visible={this.state.filterVisible}
          dialogTitle={<DialogTitle title="Filter" />}
          onTouchOutside={() => {
            this.setState({ filterVisible: false});
          }}
          dialogAnimation={new ScaleAnimation({
            initialValue: 0,
            useNativeDriver: true,
          })}
          >
            <DialogContent>
              <View style = {{
                flexDirection: 'row',
                paddingTop:5,
                paddingBottom:10
              }}>
                <View style = {{
                  paddingRight: 150,
                  paddingTop: 10,
                  elevation: 1,
                  zIndex: 5
                }}>
                  <Text
                    style = {{
                    //  paddingTop: 4,
                    //  paddingLeft: 10,
                    //  paddingRight: 10,
                     fontSize: 18,
                     paddingBottom: 8,
                }}
                  >Distance</Text>
                </View>
                  {dButton}
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
          pointerEvents='auto'
          style={{
            backgroundColor: '#242020',
            transform: [{ translateY: filterTranslate }],
            top: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 30,
            // paddingBottom: 15, 
            height: 75,
            elevation: 1,
            zIndex: 1
            // position: 'absolute'
          }}
        > 
          <View style = {{
            flexDirection: 'row',
            // justifyContent: 'space-around',
            paddingTop: 25,
            paddingLeft: 15,
            elevation: 1,
            zIndex: 1

          }}>
            <TouchableOpacity 
             
              onPress={this.filterPress}
              // onPress={() => {alert("Button Pressed"); console.log('pressed')}}
              style = {{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: '#990000',
                marginRight: 15,
                elevation: 1,
                zIndex: 1
                
            }}>
              <Text 
              style = {{
                paddingTop: 8,
                color: 'white',
                paddingLeft: 10,
                paddingRight: 10,
                fontSize: 14,
                paddingBottom: 8
              }}>
                FILTER</Text>
            </TouchableOpacity>
            {/* <TouchableOpacity
              onPress={this.sortPress}
              style = {{
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                backgroundColor: '#990000',
                marginRight: 15,
            }}>
              <Text 
                style = {{
                  paddingTop: 8,
                  color: 'white',
                  paddingLeft: 10,
                  paddingRight: 10,
                  fontSize: 14,
                  paddingBottom: 8,
                }}>
                  SORT</Text>
            </TouchableOpacity>*/}
          </View> 
        </Animated.View>

        <Animated.FlatList

          data={this.state.bars}
          renderItem={({ item }) => <Item name={item.name} address={item.address} />}
          keyExtractor={item => item._id}
          contentContainerStyle={{
            paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT + 50 : 30,
            paddingBottom: 15, 
            // backgroundColor: '#303536'
            backgroundColor: 'black',
            elevation: 20,

            
          }}
          style={{
            elevation: 1,
          }}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}

          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => {
                this.setState({ refreshing: true });
                setTimeout(() => this.setState({ refreshing: false }), 1000);
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
          }}
        >
        </Animated.FlatList>

        <Animated.View
          pointerEvents="none"
          style={[
            styles.header,
            { transform: [{ translateY: headerTranslate }] },
          ]}
        >
          <Animated.Image
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
            source={require('../../assets/Home-background.jpg')}
          />
        </Animated.View>

        <Animated.View
          pointerEvents="auto"
          style={{
            position: 'absolute',
            top: 265,
            height: 60,
            marginLeft: Dimensions.get('screen').width*.10,
            transform: [{ translateY: searchTranslate }],
            elevation: 5
          }}
        >
        <SearchBar
            platfrom="android"
            round
            containerStyle={{
                top: 0,
                backgroundColor: 'transparent',
                width: Dimensions.get('screen').width*.75,
                alignItems: 'center',
                borderBottomColor: 'transparent',
                borderTopColor: 'transparent',
            }}
            inputContainerStyle={{
                backgroundColor: 'white',
            }}
            inputStyle={{
                color: 'black'
            }}
            onChangeText={text => this.updateSearch}
            value={search}
        />      
        </Animated.View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#990000',
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
    elevation:4,
    shadowOffset: { width: 5, height: 5 },
    shadowColor: "black",
    shadowOpacity:1,
    shadowRadius: 10,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT + 20 : 20,
    paddingBottom: 30
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbar: {
    marginLeft: Dimensions.get('screen').width*.10,
    flex:1, 
    backgroundColor: 'transparent',
    width: Dimensions.get('screen').width*.75,
    alignItems: 'center',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
  },
  item: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    backgroundColor: '#990000',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
    color: '#ebe6e6'
  },
  address: {
    fontSize: 16,
    color: '#ebe6e6'
  },
});