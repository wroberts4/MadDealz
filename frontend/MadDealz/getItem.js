
import AsyncStorage from '@react-native-community/async-storage';

export const getItem = async() => {

    try {

        const value = await AsyncStorage.getItem('@storage_token');

        if( value !== null ) {

            return JSON.parse(value);

        }else {
            return null;
        }


   } catch (error) {

       console.log(error);
       return null;
   }

}