import { StyleSheet } from 'react-native';
import { normalize,normalizeFont } from '../../utils';

export const Colors = {
    background:'rgb(240,243,244)',
    border:'rgb(200,209,211)',
    placeholder:'rgb(160,160,160)'
}

export default StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor:Colors.background,
        borderColor:Colors.border,
        borderWidth:1,
        padding:normalize(9),
        height:normalize(61),
    },
    input:{
        justifyContent:'flex-start',
        fontSize:normalizeFont(15),
        flex:1,
        width:'100%'
    },
    icon:{
        width:normalize(25),
        height:normalize(25),
        resizeMode:'contain'
    },
    item:{
        flexDirection:'row',
        backgroundColor:Colors.background,
        borderColor:Colors.border,
        alignItems:'center',
        borderBottomWidth:1,
        padding:normalize(9),
        height:normalize(61),
    },
    itemContainer:{
        borderColor:Colors.border,
        borderWidth:1,
        flex:1,
        borderRadius:8,
        paddingVertical:5
    },
    bottomBorderNone:{
        borderBottomWidth:0
    }
})