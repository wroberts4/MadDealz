import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, Animated } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Image, SearchBar, Overlay} from 'react-native-elements';

import styles from "./styles";

PICTURE_MAX_HEIGHT = 250
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Swipe me',
            gestureName: 'none',
            scrollY: new Animated.Value(0),
        };
    }
    
    updateSearch = search => {
        this.setState({ search });
    };

    render() {

        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, 210],
            outputRange: [230, 20],
            extrapolate: 'clamp'
        })
        
        const marginTopHeight = this.state.scrollY.interpolate({
            inputRange: [0, 170],
            outputRange: [0, 30],
            extrapolate: 'clamp'
        })
        const scrollMargin = this.state.scrollY.interpolate({
            inputRange: [0, 250],
            outputRange: [230,100],
            extrapolate: 'clamp'
        })
        return (
            <View style = {{backgroundColor: 'black', flex: 1}}>
                <Animated.ScrollView style = { {flex: 1, backgroundColor: 'orange',  transform: [{ translateY: scrollMargin }],} }
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{nativeEvent: { contentOffset: { y: this.state.scrollY} } }],
                        // {useNativeDriver: true},
                    )}
                >
                      
                     <View style={{
                        height: 1000,
                    }}
                    >
                    </View>
                </Animated.ScrollView>    
                
                <Animated.View style = {{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    transform: [{ translateY: headerHeight }],
                    backgroundColor: 'red',
                }}>
                    {/* <Image
                        style={styles.homepicture}
                        source={require('../../assets/Home-background.jpg')}
                        resizeMode="stretch"
                    /> */}
                    <Animated.View
                    style={{
                        transform: [{ translateY: marginTopHeight }],
                    }}
                    >
                        <SearchBar
                        platfrom="android"
                        round
                        containerStyle={{
                            marginLeft: Dimensions.get('screen').width*.10,
                            backgroundColor: 'transparent',
                            width: Dimensions.get('screen').width*.75,
                            alignItems: 'center',
                            borderBottomColor: 'transparent',
                            borderTopColor: 'transparent',
                        }}
                        inputContainerStyle={styles.searchbarinput}
                        placeHolder="hello"
                        placeholderTextColor='black'
                        inputStyle={{
                            color: 'black'
                        }}
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                    />
                    </Animated.View>
                </Animated.View>
                <View style = {{height:Dimensions.get('screen').height/8, backgroundColor: "blue",}}>

                </View>
            </View>
        );
    }

}