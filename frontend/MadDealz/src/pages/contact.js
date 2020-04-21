import React, {Component } from 'react';
import { 
    View, 
    Text, 
    Image, 
    StyleSheet, 
    Dimensions, 
    Platform,
    TouchableOpacity 
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';
import Slack from 'react-native-slack-webhook';
import {first, second, third, fourth} from '../../env';

const HEADER_MAX_HEIGHT = 300;
const def = 'https://hooks.slack.com/services/';

export default class Contact extends Component {

    
    formPress = () => {
        console.log(this.state.message);
    };

    onChangeText = async (key, val) => {
        this.setState({[key]: val});
    }

    slackMessage = async () => {
        const slck = new Slack(def+first+second+third+fourth);
        slck.post(this.state.message, '#feedback').then(res => {
            if(res.status == 200) {
                console.log(res.status)
            } else {
                console.log(res);
            }
        }).catch(err=>{console.log(err)})
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
                <ScrollView style={sty.scroll} contentContainerStyle={sty.container} keyboardShouldPersistTaps='handled'>
                    <Image
                        source={require('../../assets/logo.png')}
                        style={sty.image}>
                    </Image>
                    <Text style={{color: 'white'}}>Questions? Comments? Complaints? 
                        Please let us know below and leave your email address if you would like a response.
                    </Text>
                    <Text style={{color: 'white', paddingBottom: 40}}>Thanks!</Text>
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
                    <TouchableOpacity style={sty.butt} onPress={this.slackMessage}>
                        <Text style={{color: 'black', fontSize: 30}}>Submit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }

}
// TODO: Center image
const sty = StyleSheet.create({
    image: {
        // alignSelf: 'center',
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
    butt: {
        marginHorizontal: 30,
        backgroundColor: '#990000',
        borderRadius: 10,
        height: 50,
        width: 100,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
      },
});