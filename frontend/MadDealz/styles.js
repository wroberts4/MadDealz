import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bar: {
        flex: 1,
        paddingTop: 15,
        alignItems: 'center'
    },
    scroll: {
        backgroundColor:'black', 
        height:Dimensions.get('screen').height
    }
});