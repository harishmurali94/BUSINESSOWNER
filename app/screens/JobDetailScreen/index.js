import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import styles from "./styles";
import images from "../../config/images";
import { useDispatch, useSelector } from "react-redux";
import * as getJobDetails from "../../actions/getJobDetails";
import ModalLoader from "../../components/ModalLoader";
import NavigationHeader from "../../components/NavigationHeader/NavigationHeader";
import Moment from "moment";
import * as getMyJobsAction from "../../actions/getJobDetails";
import * as appliedUserAction from "../../actions/appliedUserAction";

const DATA = [
  {
    name: "Gireesh N",
    jobs: "234",
  },
  {
    name: "Arun Kumar",
    jobs: "123",
  },
];

export default function JobDetailScreen(props) {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.loadingReducer.isLoading);
  const boUserId = useSelector((state) => state.profileReducer.boUserId);
  const appliedUsersList = useSelector(
    (state) => state.appliedUserReducer.appliedUsers
  );
  const jobDetail = useSelector(
    (state) => state.getJobDetailReducer.jobDetails[0]
  );
  const jobid = props.route.params.jobid;

  const [isShowMore, setShowMore] = useState(false);

  useEffect(() => {
    let data = {
      jobId: jobid,
    };
    let appliedUser = {
      jobId: jobid,
      boUserId: boUserId,
    };
    dispatch(appliedUserAction.getAppliedUserByJob(appliedUser));
    dispatch(getJobDetails.getJobDetailRequest(data));
  }, []);

  const leftPress = () => {
    props.navigation.goBack();
  };

  function showProfile(item) {
    props.navigation.navigate("ProfileScreen", {
      userDetails: item,
      jobid: jobid,
    });
  }


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <NavigationHeader isBack={true} leftPress={leftPress} />
      {jobDetail && Object.keys(jobDetail).length > 0 && (
        <ScrollView style={styles.container}>
          <View style={styles.detailView}>
            <Text style={styles.openingText}>
              {jobDetail?.noofPersons} opening
            </Text>
            <Text style={styles.jobHeadingText}>{jobDetail?.jobTitle}</Text>
            <View style={styles.locationView}>
              <Image source={images.jobs.location} />
              <Text style={styles.locationText} numberOfLines={1}>
                {jobDetail?.jobLocation}
              </Text>
            </View>
            <View style={styles.dateView}>
            {appliedUsersList.length > 0 && (
                <View style={styles.appliedView}>
                  <Text style={styles.appliedText}>
                    {appliedUsersList.length} Applied
                  </Text>
                </View>
              )}
              <View style={styles.dateDetailView}>
                <Text style={styles.dateText}>
                  {Moment(jobDetail?.jobStartson).format("DD MMM")} -
                  {Moment(jobDetail?.jobEndson).format("DD MMM")}
                </Text>
                <Text style={styles.dummyText}>|</Text>
                <Text style={styles.dateText}>{jobDetail?.workingDays}</Text>
              </View>
            </View>
            <Text style={styles.salaryText}>
              {jobDetail?.salary || "$20/hour"}
            </Text>
          </View>
          <View style={styles.cardView}>
            <View>
              <Text style={styles.cardText}>Gender</Text>
              <Text style={styles.cardValueText}>{jobDetail?.gender}</Text>
            </View>
            {/* <View style={styles.line} /> */}
            <View>
              <Text style={styles.cardText}>Qualification</Text>
              <Text style={styles.cardValueText}>
                {jobDetail?.Qualification}
              </Text>
            </View>
            {/* <View style={styles.line} /> */}
            <View>
              <Text style={styles.cardText}>Experience</Text>
              <Text style={styles.cardValueText}>{jobDetail?.experience}</Text>
            </View>
            {/* <View style={styles.line} /> */}
            <View>
              <Text style={styles.cardText}>Age</Text>
              <Text style={styles.cardValueText}>{jobDetail?.age}</Text>
            </View>
            {/* <View style={styles.line} /> */}
            <View>
              <Text style={styles.cardText}>Nationality</Text>
              <Text style={styles.cardValueText}>
                {jobDetail?.nationality || ""}
              </Text>
            </View>
          </View>

          {jobDetail.jobDescription.length > 150 && !isShowMore ? (
            <Text style={styles.descText}>
              {jobDetail.jobDescription.substring(0, 150) + "..."}
            </Text>
          ) : (
            <Text style={styles.descText}>{jobDetail.jobDescription}</Text>
          )}

          {jobDetail.jobDescription.length > 150 && !isShowMore ? (
            <TouchableOpacity
              onPress={() => {
                setShowMore(true);
              }}
            >
              <Text style={styles.showMoreText}>Show More</Text>
            </TouchableOpacity>
          ) : (
            jobDetail.jobDescription.length > 150 && (
              <TouchableOpacity
                onPress={() => {
                  setShowMore(false);
                }}
              >
                <Text style={styles.showMoreText}>Show Less</Text>
              </TouchableOpacity>
            )
          )}
          <View style={styles.flatListView}>
            <FlatList
              data={appliedUsersList}
              renderItem={({ item }) => (
                <RatingComponent item={item} showProfile={showProfile} />
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      )}
      <ModalLoader visible={loader} />
    </SafeAreaView>
  );
}

function RatingComponent({ item, showProfile }) {
  let myStr = item.Name;
  let matches = myStr.match(/\b(\w)/g);
  let name = matches.join("");
  return (
    <TouchableOpacity onPress={() => showProfile(item)}>
      <View style={styles.itemView}>
        <View style={styles.circularView}>
          <Text style={styles.circleText}>{name}</Text>
        </View>
        <View style={styles.nameView}>
          <Text style={styles.nameText} numberOfLines={1}>
            {item.Name}
          </Text>
          <Text style={styles.jobText}>{item.jobs} jobs</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
