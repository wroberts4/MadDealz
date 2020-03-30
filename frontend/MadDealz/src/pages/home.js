import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import {Image, SearchBar} from 'react-native-elements';

import styles from "./styles";

PICTURE_MAX_HEIGHT = 250
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'Swipe me',
            gestureName: 'none',
        };
    }
    state = {
        search: '',
    };
    
    updateSearch = search=> {
        this.setState({ search });
    };

    render() {
        const { search } = this.state;

        return (
            <SafeAreaView>
                <ScrollView style = {styles.scroll}>
               
                <Image
                style={styles.homepicture}
                source={require('../../assets/Home-background.jpg')}
                resizeMode="stretch"
                />
        
                <SearchBar
                    platfrom="android"
                    round
                    containerStyle={styles.searchbar}
                    inputContainerStyle={styles.searchbarinput}
                    placeHolder="hello"
                    inputStyle={{
                        color: 'black'
                    }}
                    onChangeText={this.updateSearch}
                    value={search}
                />
                
                </ScrollView>
            </SafeAreaView>
        );
    }

}