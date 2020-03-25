// Page that shows up when a bar object is clicked
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';

class Barpage extends React.Component {

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={{backgroundColor:'black', height:Dimensions.get('screen').height}}>
                    <View style={styles.bar}>
                        <Text style={{fontSize:20, color:'white'}}>Bar page.</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bar: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center'
    }
});

export default Barpage;