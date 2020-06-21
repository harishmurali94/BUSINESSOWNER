import { StyleSheet } from 'react-native';
import { normalize, normalizeFont } from '../../utils'

const Colors = {
    text:'rgb(15,10,64)'
}
export default StyleSheet.create({
    container:{
    },
    text:{
        color:Colors.text,
    },
    large:{
         fontSize:normalizeFont(33),
        fontWeight:'bold'
    },
    medium:{
         fontSize:normalizeFont(20),
        fontWeight:'bold'
    },
    small:{
         fontSize:normalizeFont(12),
        fontWeight:'600'
    }
})