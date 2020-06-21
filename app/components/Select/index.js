import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Styles, { Colors } from './style';

const Input = (props) => {
    const [show, setShow] = useState(false)
    const data = [0, 1, 2, 3, 4];
    return (
        <View style={Styles.itemContainer}>
            <TouchableOpacity style={Styles.input} onPress={() => setShow(!show)}>
                <View style={[Styles.item, props.style,!show && Styles.bottomBorderNone]}>
                    <Text>{props.placeholder ? props.placeholder : 'Select'}</Text>
                </View>
            </TouchableOpacity>
            {show && <View >
                {
                    data.map((item,index) => (
                        <TouchableOpacity style={Styles.input} onPress={() => setShow(!show)}>
                            <View style={[Styles.item,index === data.length - 1 && Styles.bottomBorderNone]}>
                                <Text>{item}</Text>
                            </View>
                        </TouchableOpacity>
                    ))
                }
            </View>}
        </View>

    )
}

export default Input;