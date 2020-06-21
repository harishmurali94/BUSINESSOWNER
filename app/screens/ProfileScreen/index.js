import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import images from "../../config/images";
import NavigationHeader from "../../components/NavigationHeader/NavigationHeader";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import * as appliedUserProfileAction from "../../actions/appliedUserProfileAction";
import * as hireForJobAction from "../../actions/hireForJobAction";
import { Input, Button, Label, LabelTypes } from "../../components";
import * as rejectUserAction from '../../actions/rejectUserAction';

const DATA = [
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "1 Month",
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "1 Month",
  },
  {
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    date: "1 Month",
  },
];

export default function ProfileScreen(props) {
  const userProfile = useSelector(
    (state) => state.appliedUserProfileReducer.userProfile[0]
  );
  const jsuserId = props.route.params.userDetails.jsuserId;
  const jobid = props.route.params.jobid;
  const boUserId = useSelector((state) => state.profileReducer.boUserId);
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      jsuserId: jsuserId,
    };

    dispatch(appliedUserProfileAction.appliedProfileRequest(data));
  }, []);

  const hireUser = () => {
    let params = {
      boUserId: boUserId,
      jobId: jobid,
      jsUserId: jsuserId,
    };
    dispatch(hireForJobAction.requestHire(params));
  };

  const nextTime = () => {
    let params = {
      boUserId: boUserId,
      jobId: jobid,
      jsUserId: jsuserId,
    };
    props.navigation.navigate("JobListScreen");
    dispatch(rejectUserAction.rejectUserRequest(params))
  };

  const never = () => {
    props.navigation.navigate("JobListScreen");
  };

  function leftPress() {
    props.navigation.goBack();
  }
  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationHeader isBack={true} isBack={true} leftPress={leftPress} />
      <ScrollView style={styles.container}>
        <View style={styles.headerView}>
          <Image source={images.profile.user} style={styles.userImage} />
          <View style={styles.userDetail}>
            <Text style={styles.userText} numberOfLines={1}>
              {userProfile?.jsUserName}
            </Text>
            <View>
              <View style={styles.subView}>
                <Text style={styles.subText}>Jobs</Text>
                <Text style={styles.subText}>Rating</Text>
                <Text style={styles.subText}>Years</Text>
              </View>
              <View style={styles.valueView}>
                <Text style={styles.valueText}>455</Text>
                <Text style={styles.valueText}>4.74</Text>
                <Text style={styles.valueText}>15</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.languageView}>
          <Image source={images.profile.language} />
          <Text style={styles.text}>
            Knows <Text style={styles.langText}>English, Chinese and Thai</Text>
          </Text>
        </View>
        <View style={styles.languageView}>
          <Image source={images.profile.home} />
          <Text style={styles.text}>
            From <Text style={styles.langText}>English, Chinese and Thai</Text>
          </Text>
        </View>
        <View style={styles.line} />
        <View style={styles.complimentView}>
          <Text style={styles.complimentText}>Compliments</Text>
          <View style={styles.complimentListView}>
            <View style={styles.itemView}>
              <Image source={images.profile.star} style={styles.starStyles} />
              <Text style={styles.itemText}>6 - Star services</Text>
            </View>
            <View style={styles.itemView}>
              <Image source={images.profile.star} style={styles.starStyles} />
              <Text style={styles.itemText}>Rating</Text>
            </View>
            <View style={styles.itemView}>
              <Image source={images.profile.star} style={styles.starStyles} />
              <Text style={styles.itemText}>Great attitude</Text>
            </View>
          </View>
        </View>
        <FlatList
          data={DATA}
          renderItem={({ item }) => <ProfileComponent item={item} />}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
        <View style={styles.buttonView}>
          {/* <Button
            title={"Hired"}
            onPress={(event) => {
              hireUser();
            }}
            // style={styles.hiredView}
          />
          <Button
            title={"Next Time"}
            onPress={(event) => {
              nextTime();
            }}
          /> */}
          <TouchableOpacity style={styles.hiredView} onPress={hireUser}>
            <Text style={styles.buttonText}>Hired</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.timeView} onPress={nextTime} >
            <Text style={styles.buttonText}>Next Time</Text>
          </TouchableOpacity>
        </View>
        {/* <TouchableOpacity style={styles.neverView} onPress={never}>
          <Text style={styles.neverText}>Never</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileComponent({ item }) {
  return (
    <View style={styles.profileView}>
      <Text numberOfLines={5} style={styles.descriptionText}>
        {item.description}
      </Text>
      <View style={styles.dateView}>
        <Image source={images.profile.star} style={styles.starStyles} />
        <Text style={styles.dateText}>{item.date}</Text>
      </View>
    </View>
  );
}
