import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Image} from 'react-native-elements';

import styles from "./styles";
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Swipe me',
            gestureName: 'none',
        };
    }
    render() {
        return (
            <SafeAreaView>
                <Image
                style={{height: 250, width:Dimensions.get('screen').width}}
                source={require('./assets/Home-background.jpg')}
                resizeMode="contain"
                />
                <ScrollView style = {styles.scroll}>

                </ScrollView>
            </SafeAreaView>
        );
    }

}