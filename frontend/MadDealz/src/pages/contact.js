import React, {Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import { Input, Button } from 'react-native-elements';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

export default class Contact extends Component {

    
    formPress = () => {
        console.log(this.state.message);
    };

    onChangeText = (key, val) => {
        this.setState({[key]: val});
    }
    
    constructor(props) {
        super(props);

        this.state = {
            message: ''
        } ; 
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <ScrollView style={sty.scroll} contentContainerStyle={sty.container}>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={sty.image}>
                    </Image>
                    <Text style={{color:'white', paddingBottom: 40}}>Questions? Complaints? Please let us know below and leave your email address if you would like a response.
                        Thanks!
                    </Text>
                    <Input 
                        placeholder='Please enter your message here.'
                        placeholderTextColor='grey'
                        inputContainerStyle={{borderColor: '#990000'}}
                        inputStyle={{color: '#990000'}}
                        autoCorrect={true}
                        multiline={true}
                        onChangeText={val => this.onChangeText('message', val)}
                    />
                    <View style={{padding: 10}}></View>
                    <Button
                        title="Submit"
                        raised={true}
                        titleStyle={{color:'black'}}
                        buttonStyle={{backgroundColor:'#990000'}}
                        onPress={this.formPress}
                    />
                </ScrollView>
            </View>
        );
    }

}
// TODO: Center image
const sty = StyleSheet.create({
    image: {
        alignSelf: 'center',
        width: 400,
        height: 128,
        marginTop: 64,
    },
    scroll: {
        backgroundColor: 'black',
        height: Dimensions.get('screen').height,
        paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT + 20 : 20,
        paddingBottom: 30,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});