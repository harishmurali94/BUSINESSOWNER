import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Image,
  Text,
} from "react-native";
import ModalLoader from "../../components/ModalLoader";
import Images from "../../assets";
import NavigationHeader from "../../components/NavigationHeader/NavigationHeader";
import StepIndicator from "../../components/StepIndicatorCompoent";
import { Input, Button, Label, LabelTypes } from "../../components";
import Styles from "./style";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import * as createProfileAction from "app/actions/createProfileActions";
import Geolocation from "@react-native-community/geolocation";
import Geocoder from "react-native-geocoding";
import { TouchableOpacity } from "react-native-gesture-handler";
import JobTypesComponent from "../../components/JobTypesComponent";
import Constants from "../../config/constants";
import * as saveJobAction from "app/actions/saveJobAction";

const Strings = {
  NICE_TO_MEET_YOU: "Nice to meet you !",
  LAST_STEP_HIRING: "One last step before you start hiring ",
  YOUR_EMAIL: "Your Email ID? ",
  EMAIL_HINT: "To receive important notifications",
  YOUR_LOCATION: "Your Business Location?",
  LOCATION_HINT: "This will help us find candidates",
  NEXT: "Next",
  BUSSINESS_TYPE: "Your Business Type? ",
  BUSSINESS_HINT: "Enter your business type",
  BUSSINESS_NAME: "Your Business Name? ",
  BUSSINESS_NAME_HINT: "Enter your business name",
  REG_UEN: "Your Registration No. / UEN?",
  REG_UEN_HINT: "Enter your registration no. / UEN",
  YOUR_ARE_ALL_SET: "You're All Set",
  POST_FIRST_JOB:
    "Start hiring once your profile is verified and activated. Wont be more than few hours!",
  POST_JOB: "Post Job",
  LATER: "Later",
};

const Step1 = ({ callback, currentLocation, businessLocation, userEmail }) => {
  const [step1, setStep1] = useState({
    email: userEmail,
    location: currentLocation.long_name || "",
  });
  const [emailError, setEmailError] = useState({ error: false, message: "" });
  const [locationError, setLocationError] = useState({
    error: false,
    message: "",
  });
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (currentLocation.long_name) {
      setStep1((prevState) => {
        return { ...prevState, location: currentLocation.long_name };
      });
    } else {
      setStep1((prevState) => {
        return { ...prevState, location: "" };
      });
    }
  }, [currentLocation]);

  function callbackFn() {
    setSubmit(true);
    if (step1.email === "") {
      setEmailError((prevState) => {
        return {
          ...prevState,
          error: true,
          message: "Please enter your email",
        };
      });
    }
    if (step1.location === "") {
      setLocationError((prevState) => {
        return {
          ...prevState,
          error: true,
          message: "Please enter your location",
        };
      });
    }

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(step1.email) === false || step1.email === "") {
      setEmailError((prevState) => {
        return {
          ...prevState,
          error: true,
          message: "Please enter a valid email",
        };
      });
      return;
    }

    if (!!step1.email && !!step1.location) {
      callback(step1);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Label
          type={LabelTypes.LARGE}
          text={Strings.NICE_TO_MEET_YOU}
          style={Styles.headerLabel}
          textStyle={{ fontSize: 33, fontFamily: Constants.Fonts.BLACK }}
        />
        <Label
          type={LabelTypes.SMALL}
          text={Strings.LAST_STEP_HIRING}
          style={Styles.subHeader}
          textStyle={{ fontSize: 12, fontFamily: Constants.Fonts.BOLD }}
        />

        <Label
          type={LabelTypes.MEDIUM}
          text={Strings.YOUR_EMAIL}
          style={Styles.textInputLabel}
          textStyle={{
            fontSize: 18,
            fontFamily: Constants.Fonts.BLACK,
            color: emailError.error ? "red" : Constants.APP_BLACK_COLOR,
          }}
        />
        <Input
          placeholder={Strings.EMAIL_HINT}
          value={step1.email}
          error={emailError}
          onChangeText={(text) => {
            if (submit && text !== "") {
              setEmailError((prevState) => {
                return {
                  ...prevState,
                  error: false,
                  message: "",
                };
              });
            }
            setStep1((prevState) => {
              return { ...prevState, email: text.trim() };
            });
          }}
          style={{ borderColor: emailError.error ? "red" : "rgb(200,209,211)" }}
        />
        {/* {emailError.error && (
          <Text style={{ marginTop: 5, color: "red" }}>
            {emailError.message}
          </Text>
        )} */}
        <View style={Styles.inputGap} />

        <Label
          type={LabelTypes.MEDIUM}
          text={Strings.YOUR_LOCATION}
          style={Styles.textInputLabel}
          textStyle={{
            fontSize: 18,
            fontFamily: Constants.Fonts.BLACK,
            color: locationError.error ? "red" : Constants.APP_BLACK_COLOR,
          }}
        />
        <Input
          icon={Images.ICON_LOCATION}
          value={step1.location}
          onChangeText={(text) => {
            if (submit && text !== "") {
              setLocationError((prevState) => {
                return {
                  ...prevState,
                  error: false,
                  message: "",
                };
              });
            }
            setStep1((prevState) => {
              return { ...prevState, location: text };
            });
          }}
          placeholder={Strings.LOCATION_HINT}
          style={{
            borderColor: locationError.error ? "red" : "rgb(200,209,211)",
          }}
        />
        {/* {locationError.error && (
          <Text style={{ marginTop: 5, color: "red" }}>
            {locationError.message}
          </Text>
        )} */}
      </View>
      <View>
        <Button
          style={Styles.buttonStyle}
          title={Strings.NEXT}
          onPress={(event) => {
            callbackFn();
          }}
        />
      </View>
    </View>
  );
};

const Step2 = ({ callback, showModal, jobArray, regNumber, businessName }) => {
  const [step2, setStep2] = useState({
    businessType: "",
    businessName: businessName,
    registration: regNumber,
  });

  const [click, setClick] = useState(false);

  const [businessTypeError, setBusinessTypeError] = useState({
    error: false,
    message: "",
  });
  const [registrationError, setRegistrationError] = useState({
    error: false,
    message: "",
  });
  const [businessNameError, setBusinessNameError] = useState({
    error: false,
    message: "",
  });

  useEffect(() => {
    if (jobArray.length > 0) {
      setBusinessTypeError((prevState) => {
        return {
          ...prevState,
          error: false,
          message: "",
        };
      });
    }
  }, [jobArray]);

  function callBackFn() {
    setClick(true);

    if (jobArray.length === 0) {
      setBusinessTypeError((prevState) => {
        return {
          ...prevState,
          error: true,
          message: "Please Enter Business Type",
        };
      });
    }

    if (step2.businessName === "") {
      setBusinessNameError((prevState) => {
        return {
          ...prevState,
          error: true,
          message: "Please Enter Business Name",
        };
      });
    }

    if (step2.registration === "") {
      setRegistrationError((prevState) => {
        return {
          ...prevState,
          error: true,
          message: "Please Enter Registration Number",
        };
      });
    }

    if (jobArray.length > 0 && !!step2.businessName && !!step2.registration) {
      callback(step2);
    }
  }

  return (
    <View>
      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.BUSSINESS_TYPE}
        style={Styles.textInputLabel}
        textStyle={{
          fontSize: 18,
          fontFamily: Constants.Fonts.BLACK,
          color: businessTypeError.error ? "red" : Constants.APP_BLACK_COLOR,
        }}
      />
      <TouchableOpacity
        onPress={() => showModal(true)}
        style={[
          Styles.touchableView,
          {
            borderColor: businessTypeError.error ? "red" : "#c8d1d3",
          },
        ]}
      >
        {/* <Input
          placeholder={Strings.BUSSINESS_HINT}
          onChangeText={(text) =>
            setStep2((prevState) => {
              return { ...prevState, businessType: text };
            })
          }
          disabled={true}
          value={jobArray.toString()}
        /> */}
        {jobArray.length === 0 ? (
          <Text
            style={{
              fontFamily: Constants.Fonts.MEDIUM,
              fontsize: 15,
              color: "rgb(160,160,160)",
            }}
          >
            {Strings.BUSSINESS_HINT}
          </Text>
        ) : (
          <Text style={{ fontFamily: Constants.Fonts.MEDIUM, fontsize: 15 }}>
            {jobArray.toString()}
          </Text>
        )}
        {/* {businessTypeError.error && (
          <Text style={{ marginTop: 5, color: "red" }}>
            {businessTypeError.message}
          </Text>
        )} */}
      </TouchableOpacity>
      <View style={Styles.inputGap} />

      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.BUSSINESS_NAME}
        style={Styles.textInputLabel}
        textStyle={{
          fontSize: 18,
          fontFamily: Constants.Fonts.BLACK,
          color: businessNameError.error ? "red" : Constants.APP_BLACK_COLOR,
        }}
      />
      <Input
        placeholder={Strings.BUSSINESS_NAME_HINT}
        onChangeText={(text) => {
          setStep2((prevState) => {
            return { ...prevState, businessName: text };
          });
          if (text.length > 0)
            setBusinessNameError((prevState) => {
              return {
                ...prevState,
                error: false,
                message: "",
              };
            });
        }}
        value={step2.businessName}
        style={{
          borderColor: businessNameError.error ? "red" : "rgb(200,209,211)",
        }}
      />
      {/* {businessNameError.error && (
        <Text style={{ marginTop: 5, color: "red" }}>
          {businessNameError.message}
        </Text>
      )} */}
      <View style={Styles.inputGap} />

      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.REG_UEN}
        style={Styles.textInputLabel}
        textStyle={{
          fontSize: 18,
          fontFamily: Constants.Fonts.BLACK,
          color: registrationError.error ? "red" : Constants.APP_BLACK_COLOR,
        }}
      />
      <Input
        placeholder={Strings.REG_UEN_HINT}
        onChangeText={(text) => {
          setStep2((prevState) => {
            return { ...prevState, registration: text };
          });
          if (text.length > 0)
            setRegistrationError((prevState) => {
              return {
                ...prevState,
                error: false,
                message: "",
              };
            });
        }}
        value={step2.registration}
        style={{
          borderColor: registrationError.error ? "red" : "rgb(200,209,211)",
        }}
      />
      {/* {registrationError.error && (
        <Text style={{ marginTop: 5, color: "red" }}>
          {registrationError.message}
        </Text>
      )} */}
      <View style={Styles.inputGap} />

      <Button
        style={Styles.buttonStyle}
        title={Strings.NEXT}
        onPress={(event) => {
          callBackFn();
        }}
      />
    </View>
  );
};

const Step3 = ({ passScreen, didTapOnLater }) => {
  function callback() {
    passScreen();
  }
  return (
    <View>
      <Label
        type={LabelTypes.LARGE}
        text={Strings.YOUR_ARE_ALL_SET}
        style={Styles.step3Text}
        textStyle={{
          fontSize: 35,
          fontFamily: Constants.Fonts.BLACK,
        }}
      />
      <Image source={Images.POST_JOB_BANNER} style={Styles.step3Banner} />

      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.POST_FIRST_JOB}
        style={Styles.step3Text}
        textStyle={{
          fontSize: 19,
          fontFamily: Constants.Fonts.BLACK,
          textAlign: "center",
        }}
      />
      <Button
        style={Styles.buttonStyle}
        title={Strings.POST_JOB}
        onPress={(event) => {
          callback();
        }}
      />
      <TouchableOpacity
        onPress={() => {
          didTapOnLater();
        }}
        hitSlop={{ left: 10, top: 10, right: 10, bottom: 10 }}
      >
        <Text style={Styles.link}>{Strings.LATER}</Text>
      </TouchableOpacity>
    </View>
  );
};

const SignUp = (props) => {
  const jobTypes = useSelector((state) => state.getJobTypeReducer.jobTypes);
  const phone = useSelector((state) => state.loginReducer.mobileNumber);
  const countryCode = useSelector((state) => state.loginReducer.countryCode);
  const loader = useSelector((state) => state.loadingReducer.isLoading);
  const tempUserId = useSelector((state)=>state.loginReducer.tempUserId);
  const isProfileCreated = useSelector((state) => state.profileReducer.isProfileCreated);

  const [param, setParam] = useState({});
  const [step, setStep] = useState(isProfileCreated ? 3 : 1);
  const [position, setPosition] = useState(isProfileCreated ? 3 : 1);
  
  const [location, setlocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobsTypes, setjobsTypes] = useState(jobTypes);
  const [tempJobTypes, setTempJobTypes] = useState(jobTypes);
  const [currentLocation, setCurrentLocation] = useState("");
  const [jobArray, setJobArray] = useState([]);
  const [jobID, setJobID] = useState([]);
  const [businessLocation, setBusinessLocation] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [regNumber, setRegNumber] = useState("");
  const [businessName, setBusinessName] = useState("");

  

  useEffect(() => {
    Geocoder.init("AIzaSyCfoNLI0_G0QWGVI-s2jDYdrPPbork46BY");
    Geolocation.getCurrentPosition(
      (pos) => {
        // setError('');
        setlocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });

        Geocoder.from(pos.coords.latitude, pos.coords.longitude)
          .then((json) => {
            let addressComponent = json.results[0].address_components[0];
            console.log(
              "addressComponent",
              JSON.stringify(json.results[0].address_components[0])
            );
            setCurrentLocation(addressComponent);
          })
          .catch((error) => {});
      },
      (e) => {
        console.warn(e);
        if (e.PERMISSION_DENIED === 1) {
          alert("Enable GPS to fetch your location");
        }
      }
    );
  }, []);

  const dispatch = useDispatch();

  const nextStep = (data, value) => {
    if (position === 1) {
      setUserEmail(data.email);
      setBusinessLocation(data.location);
      setPosition(position + 1);
      setStep(value);
    } else if (position === 2) {
      setRegNumber(data.registration);
      setBusinessName(data.businessName);
      let params = {
        boUserId: tempUserId,
        countryCode: countryCode,
        mobileNo: phone,
        email: userEmail,
        languageId: 0,
        boLocation: businessLocation,
        bussinessType: jobID,
        bussinessName: data.businessName,
        bussinessRegNo: data.registration,
      };
      dispatch(createProfileAction.creteProfileRequest(params));
      setPosition(position + 1);
      setStep(value);
    }
  };

  const showModalClick = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const selectJobType = (job) => {
    const filterJobTypes = jobsTypes.map((jobs) => {
      if (jobs.jobType === job) {
        jobs.isSelected = true;
      } else {
        jobs.isSelected = false;
      }
      return jobs;
    });
    const jobTypeArray = filterJobTypes.filter((job) => {
      if (job.isSelected === true) {
        return job.jobType;
      }
    });
    const selectedID = jobTypeArray.map((j) => {
      return j.jobTypeId;
    });
    const selectedArray = jobTypeArray.map((j) => {
      return j.jobType;
    });
    setJobArray(selectedArray);
    setJobID(selectedID);
    setjobsTypes(filterJobTypes);
  };

  const searchJobType = (e) => {
    let text = e.toLowerCase();
    let filteredName = jobsTypes.filter((item) => {
      return item.jobType.toLowerCase().startsWith(text);
    });
    if (!text || text === "") {
      setjobsTypes(tempJobTypes);
    } else if (!Array.isArray(filteredName) && !filteredName.length) {
      // setNodataStep3(true);
    } else if (Array.isArray(filteredName)) {
      setjobsTypes(filteredName);
      // setNodataStep3(false);
    }
  };

  
  const navigateJob = () => {
    dispatch(createProfileAction.updateProfileCreateStatus());
    // dispatch(saveJobAction.saveJobFailed(false));
    setTimeout(() => {
      props.navigation.navigate("PostJob");
    }, 100);
  };

  const navigateJobList = () => {
    dispatch(createProfileAction.updateProfileCreateStatus());
    dispatch(saveJobAction.saveJobResponse(true));
  };

  function leftPress() {
    if (step > 0) {
      setPosition(position - 1);
      setStep(step - 1);
      // setProgressPosition(progressPosition-1);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.main}>
        <NavigationHeader
          isBack={true}
          isBack={step === 1 ? false : true}
          leftPress={leftPress}
        />
        <StepIndicator position={position} renderTotalNumber={4} />
        <ScrollView contentContainerStyle={Styles.container} keyboardShouldPersistTaps={'always'}>
          {step === 1 && (
            <Step1
              callback={(data) => {
                nextStep(data, 2);
              }}
              currentLocation={currentLocation}
              userEmail={userEmail}
              businessLocation={businessLocation}
            />
          )}
          {step === 2 && (
            <Step2
              callback={(data) => {
                nextStep(data, 3);
              }}
              showModal={showModalClick}
              jobArray={jobArray}
              regNumber={regNumber}
              businessName={businessName}
            />
          )}
          {step === 3 && (
            <Step3 passScreen={navigateJob} didTapOnLater={navigateJobList} />
          )}
        </ScrollView>
        <ModalLoader visible={loader} />
        <Modal isVisible={isModalVisible}>
          <SafeAreaView style={{ flex: 1 }}>
            <View
              style={{
                flex: 1,
                // alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                paddingHorizontal: 10,
              }}
            >
              <JobTypesComponent
                jobsTypes={jobsTypes}
                onChangeText={searchJobType}
                selectJobType={selectJobType}
                closeModal={closeModal}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
