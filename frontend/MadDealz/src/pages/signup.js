import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Image,
    StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Signup extends Component {
    state = {
        name: '',
        email: '',
        password: '',
    };

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.image}></Image>

                <TouchableOpacity
                    style={styles.back}
                    //onPress={() => this.props.navigation.goBack()}
                >
                    <Icon
                        name="md-arrow-round-back"
                        size={32}
                        color="#fff"></Icon>
                </TouchableOpacity>

                <Text style={styles.greeting}>
                    {'Welcome to MadDealz!\nSign Up to get started.'}
                </Text>

                <View style={styles.form}>
                    <View>
                        <Text style={styles.inputTitle}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Email Address</Text>
                        <TextInput
                            style={styles.input}
                            autoCapitalize="none"></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>Password</Text>
                        <TextInput
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize="none"></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button}>
                    <Text style={{fontWeight: '500', color: '#222'}}>
                        Sign Up
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        alignSelf: 'center',
                        marginTop: 32,
                        marginBottom: 100,
                    }}
                    //onPress={() => this.props.navigation.navigate('login')}
                >
                    <Text style={{color: '#777', fontSize: 13}}>
                        Already have an account?{' '}
                        <Text style={{fontWeight: '500', color: '#f55'}}>
                            Login
                        </Text>
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    greeting: {
        marginTop: -32,
        fontSize: 18,
        fontWeight: '400',
        textAlign: 'center',
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30,
    },
    inputTitle: {
        color: '#ccc',
        fontSize: 10,
        textTransform: 'uppercase',
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: '#eee',
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: '#f55',
        borderRadius: 4,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
    },
    back: {
        position: 'absolute',
        top: 48,
        left: 32,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#333',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
