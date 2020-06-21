import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import styles from "./styles";
import images from "../../config/images";
import { useDispatch, useSelector } from "react-redux";
import ModalLoader from "../../components/ModalLoader";
import * as saveJobAction from "app/actions/saveJobAction";
import * as getCreatedJobAction from "../../actions/getCreatedJobAction";
import { useFocusEffect } from "@react-navigation/native";
import Moment from "moment";

const DATA = [
  {
    title: "Housekeeper required",
    salary: "$20/hour",
    location: "Clarke quay, singapore",
    date: "1 June 2020",
    day: "Every Fri-Sat",
  },
  {
    title: "Part time cleaners",
    salary: "$20/hour",
    location: "Clarke quay, singapore",
    date: "1 June 2020",
    day: "Every Fri-Sat",
  },
  {
    title: "Washing blinds",
    salary: "$20/hour",
    location: "Clarke quay, singapore",
    date: "1 June 2020",
    day: "Every Fri-Sat",
  },
];

export default function JobListScreen(props) {
  // const navigation = useNavigation();
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loadingReducer.isLoading);
  const jobList = useSelector((state) => state.createdJobsReducer.jobsPosted);
  const boUserId = useSelector((state) => state.profileReducer.boUserId);

  // useEffect(() => {
  //   let data = {
  //     jobType: 0,
  //     userId: boUserId,
  //   };
  //   dispatch(getCreatedJobAction.createdJobsRequest(data));
  // }, []);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      let data = {
        jobType: 0,
        userId: boUserId,
      };
      dispatch(getCreatedJobAction.createdJobsRequest(data));
      dispatch(getCreatedJobAction.setHomePage());

      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  const onJobPress = (item) => {
    props.navigation.navigate("JobDetailScreen", { jobid: item.jobId });
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {jobList.length > 0 ? (
        <View style={styles.container}>
          <FlatList
            data={jobList}
            renderItem={({ item }) => (
              <JobComponent item={item} onJobPress={onJobPress} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      ) : (
        <View
          style={[
            styles.container,
            { alignItems: "center", justifyContent: "center" },
          ]}
        >
          <Text>You have not posted any jobs</Text>
          <TouchableOpacity
            style={styles.postJobButton}
            hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
            onPress={() => {
              // dispatch(saveJobAction.saveJobFailed(false));

              props.navigation.navigate("PostJob");
            }}
          >
            <Text style={styles.postJobButtonText}>Post job</Text>
          </TouchableOpacity>
        </View>
      )}

      <ModalLoader visible={loader} />
    </SafeAreaView>
  );
}

function JobComponent({ item, onJobPress }) {
  const workingDays = item.WorkingDays.map((days) => {
    return days.DayName;
  });
  console.warn('hjjkhbh',item);
  return (
    <View style={styles.item}>
      <TouchableOpacity
        style={styles.listView}
        onPress={() => onJobPress(item)}
      >
        <View style={styles.squareView}>
          <Image source={{ uri: item.jobIcon }} style={styles.images} />
        </View>
        <View style={styles.itemView}>
          <View style={styles.topButtonView}>
            <Text style={styles.openText}>{item.noofPersons} opening</Text>
            <Text style={styles.dateViewText} numberOfLines={1}>
              {Moment(item?.jobStartson).format("DD MMM")} -
              {Moment(item?.jobEndson).format("DD MMM")}
            </Text>
            {/* <View style={styles.statusView}>
              <Text style={styles.statusText}>Pending</Text>
            </View> */}
          </View>
          <View>
            <Text numberOfLines={1} style={styles.titleText}>
              {item.jobTitle}
            </Text>
            <View style={styles.imageView}>
              <Image source={images.jobs.location} />
              <Text style={styles.locText}>{item.jobLocation}</Text>
            </View>
            <View style={styles.costView}>
              <Text style={styles.dateText}>{workingDays.toString()}</Text>
              <Text style={styles.costText} numberOfLines={1}>{item.salary}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
