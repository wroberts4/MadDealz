// Page that shows up when a bar object is clicked
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Barpage extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text>Barpage.</Text>
            </View>
            
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});