/**
 * NavigationHeader - Navigation header component.
 */

import React, { Component } from "react";
import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import styles from "./styles";
import { connect } from "react-redux";
import images from "../../config/images";
// import Modal from 'react-native-modal';
// import utils from '../../utils/strings';

class NavigationHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        {/* <StatusBar backgroundColor="rgb(242,242,242)" barStyle="dark-content" /> */}
        <View style={styles.container}>
          <View style={styles.subContainer}>
            {this.props.isBack && (
              <TouchableOpacity onPress={this.props.leftPress}>
                <Image source={images.back.back_button} />
              </TouchableOpacity>
            )}
            <View style={styles.ueText}>
              <Text style={styles.titleText}>{this.props.title}</Text>
            </View>
            <View style={styles.imageView}>
              {this.props.isFilter && (
                <TouchableOpacity onPress={this.props.showFilter}>
                  {/* <Image source={images.icons.filter}  style={styles.images} /> */}
                </TouchableOpacity>
              )}
              {this.props.isSearch && (
                <TouchableOpacity>
                  {/* <Image source={images.icons.search} /> */}
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationHeader);
