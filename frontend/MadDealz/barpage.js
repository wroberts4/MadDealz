// Page that shows up when a bar object is clicked
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { Card, Image } from 'react-native-elements';

import styles from "./styles";
class Barpage extends React.Component {

    render() {
        return (
            <SafeAreaView>
                <ScrollView style={styles.scroll}>
                    <View style={styles.bar}>
                        <Text style={{fontSize:20, color:'white'}}>Bar page.</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center'}}>
                        <Image
                            // TODO: Figure out how to make the whole image appear regardless of image
                            style={{height: 200, width:Dimensions.get('screen').width-20}}
                            source={require('./assets/UU.jpg')}
                            resizeMode="contain"
                        />
                    </View>
                    <Card title="Contact Us" containerStyle={{borderRadius:10, alignItems:'center'}}>
                        <Text>Hours</Text>
                        <Text>Phone Number</Text>
                        <Text>Email Address?</Text>
                    </Card>
                </ScrollView>
            </SafeAreaView>
        );
    }

}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     bar: {
//         flex: 1,
//         paddingTop: 15,
//         alignItems: 'center'
//     }
// });

export default Barpage;