import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Images from '../../assets';
import { Input } from '../../components';
import Styles from './style';

const Button = ({onPress,title,style}) => (
    <TouchableOpacity onPress={onPress} style={style}>
        <View style={Styles.container}>
            <Text style={Styles.text}>
                {
                    title ? title : 'Button'
                }
            </Text>
        </View>
    </TouchableOpacity>
)

export default Button;