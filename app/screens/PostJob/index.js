import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableHighlight,
} from "react-native";
import { Input, Button, Label, LabelTypes } from "../../components";
import Images from "../../assets";
import Styles from "./styles";
import StepIndicator from "../../components/StepIndicatorCompoent";
import NavigationHeader from "../../components/NavigationHeader/NavigationHeader";
import styles from "./styles";
import images from "../../config/images";
import * as saveJobAction from "app/actions/saveJobAction";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import ModalDropdown from "react-native-modal-dropdown";
import Moment, { isMoment } from "moment";
import CustomSelect from "../../components/CustomSelect";
import Constants from "../../config/constants";
import { useDispatch, useSelector } from "react-redux";
import * as getCreatedJobAction from "../../actions/getCreatedJobAction";
import ModalLoader from '../../components/ModalLoader';
import {CommonActions} from '@react-navigation/native';

const Strings = {
  POST_JOB_HIRING: "Post Job & Start Hiring",
  JOB_TITLE: "Job Title",
  JOB_TITLE_HINT: "Whom are you trying to hire",
  LOCATION: "Location",
  LOCATION_HINT: "#05-01, Clarke Quay, Singapore",
  HOW_MANY_PEOPLE: "How many people?",
  NEXT: "Next",
  START_FROM: "Starting from",
  TILL: "Till",
  WORKING_DAYS: "Working days",
  WORK_HOURS: "Work hours",
  START_TIME: "Start time",
  END_TIME: "End time",
  SALARY: "Salary",
  HOURLY: "Hourly",
  DESCRIPTION: "Description",
  GENDER: "Gender",
  QUALIFICATION: "Qualification",
  EXPERIENCE: "Experience",
  AGE: "Age",
  POSTJOB: "Post Job",
  STARTDATE: "dd/mm/yyyy",
  ENDDATE: "dd/mm/yyyy",
  STARTING_FROM: "Starting from",
  TILL: "Till",
};

export default function Postjob(props) {
  const homeStatus = useSelector((state)=>state.createdJobsReducer.homeStatus)
  const loader = useSelector((state) => state.loadingReducer.isLoading);
  const boID = useSelector((state) => state.profileReducer.boUserId);
  const profileData = useSelector((state) => state.profileReducer.profileData);

  const locationData =
    profileData && profileData.boLocation ? profileData.boLocation : "";
  const jobTypeId =
    profileData && profileData.bussinessType ? profileData.bussinessType : 0;

  const dispatch = useDispatch();

  const [position, setPosition] = useState(0);
  const [step, setStep] = useState(1);
  const [jobTitle, setJobTitle] = useState("");
  const [jobLocation, setJobLocation] = useState(locationData);
  const [peopleNumber, setPeopleNumber] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [workDays, setWorkDays] = useState("");
  const [workStartTime, setWorkStartTime] = useState("");
  const [workEndTime, setWorkEndTime] = useState("");
  const [salary, setSalary] = useState("");
  const [period, setPeriod] = useState("1");
  const [jobDescription, setJobDescription] = useState("");

  const [gender, setGender] = useState("Any");
  const [qualification, setQualification] = useState(0);
  const [experience, setExperience] = useState(0);
  const [age, setAge] = useState(0);

  const nextStep = (data, value) => {
    if (this.scrollRef)
      setTimeout(() => {
        this.scrollRef.scrollTo({ x: 0, y: 0, animated: true });
      }, 10);
    if (step === 1) {
      setStep(value);
      setPosition(position + 1);
      setJobTitle(data.title);
      setJobLocation(data.location);
      setPeopleNumber(data.people);
      setStartDate(data.date);
      setEndDate(data.endDate);
    } else if (step === 2) {
      setStep(value);
      setPosition(position + 1);

      setWorkDays(data.workingdays);
      setWorkStartTime(data.startTime);
      setWorkEndTime(data.endTime);
      setSalary(data.salary);
      setPeriod(data.period);
      setJobDescription(data.description);
    } else {
      console.log("data in step 3", JSON.stringify(data, null, 2));
      // data in step 3 {
      //   "gender": "Any",
      //   "qualification": 1,
      //   "experience": 1,
      //   "age": 1
      // }
      // setStep(value);
      // setPosition(position + 1);

      setGender(data.gender);
      setQualification(data.qualification);
      setExperience(data.experience);
      setAge(data.age);

      let workDaysNew = [];
      workDays.map((item) => {
        workDaysNew.push(item + 1);
      });

      const params = {
        BOUserId: boID,
        jobTitle: jobTitle,
        jobLocation: jobLocation,
        noofPeople: peopleNumber,
        jobType: parseInt(jobTypeId[0]),
        jobStartsOn: Moment(startDate).format("YYYY-MM-DD"),
        jobEndsOn: Moment(endDate).format("YYYY-MM-DD"),
        workingDays: workDaysNew,
        jobStartTime: Moment(workStartTime).format("HH:mm"),
        jobEndTime: Moment(workEndTime).format("HH:mm"),
        jobSalary: salary,
        currencyType: "$",
        salaryType: period,
        JobDescription: jobDescription,
        gender: data.gender,
        qualification: data.qualification,
        expierience: data.experience,
        age: data.age,
      };

      console.warn("params", params);
      dispatch(
        saveJobAction.saveJobRequest(params, (status) => {
          if (status) {
            props.navigation.navigate("JobListScreen");
            setPosition(0);
            setStep(1);
            setJobTitle("");
            setJobLocation("");
            setPeopleNumber("");
            setStartDate("");
            setEndDate("");
            setWorkDays("");
            setWorkStartTime("");
            setWorkEndTime("");
            setSalary("");
            setPeriod("Hour");
            setJobDescription("");
            setGender("Any");
            setQualification(0);
            setExperience(0);
            setAge(0);
            let data = {
              jobType: parseInt(jobTypeId[0]),
              userId: boID,
            };
            setTimeout(() => {
              dispatch(getCreatedJobAction.createdJobsRequest(data));
            }, 500);
          } else {
            //TODO: error
          }
        })
      );
      // props.navigation.navigate("JobListScreen");
     
      
      if (this.scrollRef)
        this.scrollRef.scrollTo({ x: 0, y: 0, animated: true });
    }
    //
  };

  function clearData(){
    setPosition(0);
    setStep(1);
    setJobTitle("");
    setPeopleNumber("");
    setStartDate("");
    setEndDate("");
    setWorkDays("");
    setWorkStartTime("");
    setWorkEndTime("");
    setSalary("");
    setPeriod(1);
    setJobDescription("");
    setGender("Any");
    setQualification(0);
    setExperience(0);
    setAge(0);
  }

  function leftPress() {
    if(step === 1){
      clearData()
      props.navigation.navigate("JobListScreen")
      
    }else
    if (step > 1) {
      if (this.scrollRef)
        setTimeout(() => {
          this.scrollRef.scrollTo({ x: 0, y: 0, animated: true });
        }, 10);
      setPosition(position - 1);
      setStep(step - 1);
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={Styles.main}>
      <NavigationHeader
          // isBack={true}
          isBack={homeStatus ? true : false}
          leftPress={leftPress}
        />
        <StepIndicator position={position} renderTotalNumber={3} />
        <ModalLoader visible={loader} />
        <ScrollView
          ref={(ref) => (this.scrollRef = ref)}
          contentContainerStyle={Styles.container}
          keyboardShouldPersistTaps={'always'}
        >
          {step === 1 && (
            <Step1
              jobTitle={jobTitle}
              jobLocation={jobLocation}
              peopleNumber={peopleNumber}
              startDate={startDate}
              endDate={endDate}
              callBack={(data) => {
                nextStep(data, 2);
              }}
            />
          )}
          {step === 2 && (
            <Step2
              workDays={workDays}
              workStartTime={workStartTime}
              workEndTime={workEndTime}
              salary={salary}
              period={period}
              jobDescription={jobDescription}
              callBack={(data) => {
                nextStep(data, 3);
              }}
            />
          )}
          {step === 3 && (
            <Step3
              gender={gender}
              qualification={qualification}
              experience={experience}
              age={age}
              callBack={(data) => {
                nextStep(data, 4);
              }}
            />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const Step1 = ({
  callBack,
  jobTitle,
  jobLocation,
  peopleNumber,
  startDate,
  endDate,
}) => {
  const [step1, setStep1] = useState({
    title: jobTitle,
    location: jobLocation,
    people: peopleNumber,
    date: startDate,
    endDate: endDate,
  });
  const [submit, setSubmit] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [locationError, setLocationError] = useState("");
  const [peopleError, setPeopleError] = useState("");
  const [startDateError, setStartDateError] = useState("");
  const [endDateError, setEnddateError] = useState("");
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartDate, setIsStartDate] = useState(false);

  const callBackFn = () => {
    setSubmit(true);
    if (step1.title === "") {
      setTitleError("Please enter job title");
    }
    if (step1.location === "") {
      setLocationError("Please enter location");
    }
    if (step1.people === "") {
      setPeopleError("Please enter number of people required");
    }
    if (step1.date === "") {
      setStartDateError("Please enter start date");
    }

    if (step1.endDate === "") {
      setEnddateError("Please enter end date");
    }

    if (
      !!step1.title &&
      !!step1.endDate &&
      !!step1.date &&
      !!step1.people &&
      !!step1.location
    ) {
      callBack(step1);
    }
  };

  const showDatePicker = (key) => {
    setDatePickerVisibility(true);
    if (key === "start") {
      setIsStartDate(true);
    } else {
      setIsStartDate(false);
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    if (isStartDate) {
      setStep1((prevState) => {
        return { ...prevState, date: date };
      });
      setStartDateError("");
    } else {
      setStep1((prevState) => {
        return { ...prevState, endDate: date };
      });
      setEnddateError("");
    }
  };

  return (
    <ScrollView style={Styles.container} keyboardShouldPersistTaps={'always'}>
      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.POST_JOB_HIRING}
        style={Styles.header}
        textStyle={{
          fontSize: 20,
          fontFamily: Constants.Fonts.BLACK,
        }}
      />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <Image
          source={images.job.group}
          style={Styles.banner}
          resizeMode="contain"
        />
      </View>

      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.JOB_TITLE}
        style={[Styles.textInputLabel]}
        textStyle={{
          color: !!titleError ? "red" : "rgb(38,38,38)",
          fontSize: 15,
          fontFamily: Constants.Fonts.BLACK,
        }}
      />
      <Input
        placeholder={Strings.JOB_TITLE_HINT}
        value={step1.title}
        maxLength={75}
        onChangeText={(text) => {
          if (submit && text !== "") {
            setTitleError("");
          }

          const condition = /^[a-zA-Z0-9- ]*$/;
          let status = condition.test(text);
          setStep1((prevState) => {
            return { ...prevState, title: status ? text : step1.title };
          });
        }}
        style={{ borderColor: !!titleError ? "red" : "rgb(200,209,211)" }}
      />
      <View style={Styles.inputGap} />

      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.LOCATION}
        style={Styles.textInputLabel}
        textStyle={{
          color: !!locationError ? "red" : "rgb(38,38,38)",
          fontSize: 15,
          fontFamily: Constants.Fonts.BLACK,
        }}
      />
      <Input
        icon={Images.ICON_LOCATION}
        value={step1.location}
        maxLength={100}
        placeholder={Strings.LOCATION_HINT}
        onChangeText={(text) => {
          if (submit && text !== "") {
            setLocationError("");
          }
          const condition = /^[#a-zA-Z0-9- ]*$/;
          let status = condition.test(text);
          setStep1((prevState) => {
            return { ...prevState, location: status ? text : step1.location };
          });
        }}
        style={{ borderColor: !!locationError ? "red" : "rgb(200,209,211)" }}
      />

      <View style={Styles.inputGap} />

      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.HOW_MANY_PEOPLE}
        style={Styles.textInputLabel}
        textStyle={{
          color: !!peopleError ? "red" : "rgb(38,38,38)",
          fontSize: 15,
          fontFamily: Constants.Fonts.BLACK,
        }}
      />
      <Input
        value={step1.people}
        maxLength={2}
        onChangeText={(text) => {
          if (submit && text !== "") {
            setPeopleError("");
          }
          const condition = /^[0-9]*$/;
          let status = condition.test(text);
          setStep1((prevState) => {
            return { ...prevState, people: status ? text : step1.people };
          });
        }}
        keyboardType={"number-pad"}
        style={{ borderColor: !!peopleError ? "red" : "rgb(200,209,211)" }}
      />

      <View style={Styles.inputGap} />

      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <View>
          <Label
            type={LabelTypes.MEDIUM}
            text={Strings.STARTING_FROM}
            style={Styles.textInputLabel}
            textStyle={{
              color: !!startDateError ? "red" : "rgb(38,38,38)",
              fontSize: 15,
              fontFamily: Constants.Fonts.BLACK,
            }}
          />
          <TouchableOpacity
            style={[
              Styles.datePickerValue,
              { borderColor: !!startDateError ? "red" : "rgb(200,209,211)" },
            ]}
            onPress={() => showDatePicker("start")}
          >
            {!!step1.date ? (
              <Text style={styles.textTime}>
                {Moment(step1.date).format("DD/MM/YYYY")}
              </Text>
            ) : (
              <Text
                style={[
                  styles.textTime,
                  {
                    color:
                      Strings.STARTDATE === "dd/mm/yyyy" ? "#a0a0a0" : "#000",
                  },
                ]}
              >
                {Strings.STARTDATE}
              </Text>
            )}
            <Image source={images.boarding_step_1.calendar} />
          </TouchableOpacity>
        </View>
        <View>
          <Label
            type={LabelTypes.MEDIUM}
            text={Strings.TILL}
            style={Styles.textInputLabel}
            textStyle={{
              color: !!endDateError ? "red" : "rgb(38,38,38)",
              fontSize: 15,
              fontFamily: Constants.Fonts.BLACK,
            }}
          />
          <TouchableOpacity
            style={[
              Styles.datePickerValue,
              { borderColor: !!endDateError ? "red" : "rgb(200,209,211)" },
            ]}
            onPress={() => showDatePicker("end")}
          >
            {!!step1.endDate ? (
              <Text style={styles.textTime}>
                {Moment(step1.endDate).format("DD/MM/YYYY")}
              </Text>
            ) : (
              <Text
                style={[
                  styles.textTime,
                  {
                    color:
                      Strings.ENDDATE === "dd/mm/yyyy" ? "#a0a0a0" : "#000",
                  },
                ]}
              >
                {Strings.ENDDATE}
              </Text>
            )}
            <Image source={images.boarding_step_1.calendar} />
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          minimumDate={new Date()}
        />
      </View>
      <View
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          marginVertical: 6,
        }}
      />

      <Button
        style={Styles.buttonStyle}
        title={Strings.NEXT}
        onPress={(event) => {
          callBackFn();
        }}
      />
    </ScrollView>
  );
};

const Step3 = ({ gender, qualification, experience, age, callBack }) => {
  const [step3, setStep3] = useState({
    gender: gender,
    qualification: qualification,
    experience: experience,
    age: age,
  });

  const qualificationArray = useSelector(
    (state) => state.postJobDataReducer.qualificationData
  );
  const exprienceArray = useSelector(
    (state) => state.postJobDataReducer.experienceData
  );
  const ageArray = useSelector((state) => state.postJobDataReducer.ageData);
  const salaryArray = useSelector(
    (state) => state.postJobDataReducer.salaryData
  );

  const [newAge, setNewAge] = useState([]);
  const [newExp, setNewExp] = useState([]);
  const [newQual, setnewQual] = useState([]);
  const [isMale, setIsMale] = useState(gender === "Male Only");
  const [isFemaile, setIsFemale] = useState(gender === "Female Only");
  const [isAny, setIsAny] = useState(gender === "Any");

  const [genderError, setGenderError] = useState("");
  const [qualificationError, setQualificationError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [ageError, setAgeError] = useState("");

  useEffect(() => {
    const newAge = ageArray.map((ages) => {
      return ages.age;
    });
    const newExp = exprienceArray.map((exp) => {
      return exp.experience;
    });
    const newQual = qualificationArray.map((qual) => {
      return qual.qualificationname;
    });
    const newSal = salaryArray.map((sal) => {
      return sal.salaryType;
    });

    setNewAge(newAge);
    setNewExp(newExp);
    setnewQual(newQual);
  }, []);

  const dropdownSelect = (a, b, key) => {
    if (key === "age") {
      const selectedAge = ageArray.filter((ages) => {
        return ages.age === b;
      });
      setAgeError("");
      // setAge(selectedAge[0].ageId);
      setStep3((prevState) => {
        return { ...prevState, age: selectedAge[0].ageId };
      });
    } else if (key === "qual") {
      const selectedAge = qualificationArray.filter((qual) => {
        return qual.qualificationname === b;
      });
      setQualificationError("");
      // setQualification(selectedAge[0].qualificationId);
      setStep3((prevState) => {
        return { ...prevState, qualification: selectedAge[0].qualificationId };
      });
    } else if (key === "exp") {
      const selectedExp = exprienceArray.filter((qual) => {
        return qual.experience === b;
      });
      setExperienceError("");
      // setExperience(selectedExp[0].experienceId);
      setStep3((prevState) => {
        return { ...prevState, experience: selectedExp[0].experienceId };
      });
    }
  };

  function selectGender(gender) {
    setGenderError("");
    if (gender === "Male Only") {
      setIsMale(true);
      setIsFemale(false);
      setIsAny(false);
      setStep3((prevState) => {
        return { ...prevState, gender: "Male Only" };
      });
    } else if (gender === "Female Only") {
      setIsMale(false);
      setIsFemale(true);
      setIsAny(false);
      setStep3((prevState) => {
        return { ...prevState, gender: "Female Only" };
      });
    } else {
      setIsMale(false);
      setIsFemale(false);
      setIsAny(true);

      setStep3((prevState) => {
        return { ...prevState, gender: "Any" };
      });
    }
  }

  function postJob() {
    if (step3.gender === "") {
      setGenderError("error");
    }
    // if (step3.qualification === "") {
    //   setQualificationError("error");
    // }
    // if (step3.experience === "") {
    //   setExperienceError("error");
    // }
    // if (step3.age === "") {
    //   setAgeError("error");
    // }

    if (
      !!step3.gender
      // &&
      // !!step3.qualification &&
      // !!step3.experience &&
      // !!step3.age
    ) {
      callBack(step3);
    }

    // callBack();
  }

  return (
    <View style={{ marginVertical: 28, marginHorizontal: 10 }}>
      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.GENDER}
        style={Styles.workingDays}
        textStyle={{
          fontSize: 15,
          fontFamily: Constants.Fonts.BLACK,
          color: !!genderError ? "red" : "rgb(38,38,38)",
        }}
      />
      <View style={Styles.genderView}>
        <CustomSelect
          textKey={"Male Only"}
          selected={isMale}
          onPress={selectGender}
          withBorder={true}
        />
        <CustomSelect
          textKey={"Female Only"}
          selected={isFemaile}
          onPress={selectGender}
          withBorder={true}
        />
        <CustomSelect
          textKey={"Any"}
          selected={isAny}
          onPress={selectGender}
          withBorder={true}
        />
        {/* <TouchableOpacity style={styles.buttonView}>
          <Text style={Styles.genderText}>Male Only</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView}>
          <Text style={Styles.genderText}>Female Only</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonView}>
          <Text style={Styles.genderText}>Any</Text>
        </TouchableOpacity> */}
      </View>
      <View style={{ marginTop: 0 }}>
        <Label
          type={LabelTypes.MEDIUM}
          text={Strings.QUALIFICATION}
          style={Styles.workingDays}
          textStyle={{
            fontSize: 15,
            fontFamily: Constants.Fonts.BLACK,
            color: !!qualificationError ? "red" : "rgb(38,38,38)",
          }}
        />
        <TouchableOpacity
          style={Styles.dropDownView}
          onPress={() => {
            this.qualification && this.qualification.show();
          }}
        >
          <ModalDropdown
            textStyle={{
              fontFamily: Constants.Fonts.MEDIUM,
              fontSize: 15,
              color:
                step3.qualification == ""
                  ? "rgb(160,160,160)"
                  : "rgb(38,38,38)",
            }}
            options={newQual}
            onSelect={(idx, value) => dropdownSelect(idx, value, "qual")}
            defaultValue={"Select"}
            ref={(el) => {
              this.qualification = el;
            }}
            dropdownStyle={Styles.dropView}
            dropdownTextStyle={{
              fontFamily: Constants.Fonts.MEDIUM,
              fontSize: 15,
              color: "rgb(100,100,100)",
            }}
          />
          <Image source={images.jobs.down} />
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 0 }}>
        <Label
          type={LabelTypes.MEDIUM}
          text={Strings.EXPERIENCE}
          style={Styles.workingDays}
          textStyle={{
            fontSize: 15,
            fontFamily: Constants.Fonts.BLACK,
            color: !!experienceError ? "red" : "rgb(38,38,38)",
          }}
        />
        <TouchableOpacity
          style={Styles.dropDownView}
          onPress={() => {
            this.exp && this.exp.show();
          }}
        >
          <ModalDropdown
            textStyle={{
              fontFamily: Constants.Fonts.MEDIUM,
              fontSize: 15,
              color:
                step3.experience == "" ? "rgb(160,160,160)" : "rgb(38,38,38)",
            }}
            options={newExp}
            defaultValue={"Select"}
            ref={(el) => {
              this.exp = el;
            }}
            dropdownStyle={Styles.dropView}
            onSelect={(idx, value) => dropdownSelect(idx, value, "exp")}
            dropdownTextStyle={{
              fontFamily: Constants.Fonts.MEDIUM,
              fontSize: 15,
              color: "rgb(100,100,100)",
            }}
          />
          <Image source={images.jobs.down} />
        </TouchableOpacity>
      </View>
      <View style={{ marginVertical: 0 }}>
        <Label
          type={LabelTypes.MEDIUM}
          text={Strings.AGE}
          style={Styles.workingDays}
          textStyle={{
            fontSize: 15,
            fontFamily: Constants.Fonts.BLACK,
            color: !!ageError ? "red" : "rgb(38,38,38)",
          }}
        />
        <TouchableOpacity
          style={Styles.dropDownView}
          onPress={() => {
            this.age && this.age.show();
          }}
        >
          <ModalDropdown
            textStyle={{
              fontFamily: Constants.Fonts.MEDIUM,
              fontSize: 15,
              color: step3.age == "" ? "rgb(160,160,160)" : "rgb(38,38,38)",
            }}
            options={newAge}
            defaultValue={"Select"}
            ref={(el) => {
              this.age = el;
            }}
            dropdownStyle={[Styles.dropView,{ height: 210}]}
            onSelect={(idx, value) => dropdownSelect(idx, value, "age")}
            dropdownTextStyle={{
              fontFamily: Constants.Fonts.MEDIUM,
              fontSize: 15,
              color: "rgb(100,100,100)",
            }}
          />
          <Image source={images.jobs.down} />
        </TouchableOpacity>
      </View>
      <Button
        style={Styles.buttonStyle}
        title={Strings.POSTJOB}
        onPress={(event) => {
          postJob();
        }}
      />
    </View>
  );
};

const Step2 = ({
  workDays,
  workStartTime,
  workEndTime,
  salary,
  period,
  jobDescription,
  callBack,
}) => {
  const Workingdays = useSelector(
    (state) => state.postJobDataReducer.workingDaysData
  );

  const salaryArray = useSelector(
    (state) => state.postJobDataReducer.salaryData
  );

  // const Workingdays = [
  //   {
  //     isSelected: false,
  //     workingDayId: 1,
  //     workingDayName: "Mon",
  //   },
  //   {
  //     isSelected: false,
  //     workingDayId: 2,
  //     workingDayName: "Tue",
  //   },
  //   {
  //     isSelected: false,
  //     workingDayId: 3,
  //     workingDayName: "Wed",
  //   },
  //   {
  //     isSelected: false,
  //     workingDayId: 4,
  //     workingDayName: "Thu",
  //   },
  //   {
  //     isSelected: false,
  //     workingDayId: 5,
  //     workingDayName: "Fri",
  //   },
  //   {
  //     isSelected: false,
  //     workingDayId: 6,
  //     workingDayName: "Sat",
  //   },
  //   {
  //     isSelected: false,
  //     workingDayId: 7,
  //     workingDayName: "Sun",
  //   },
  // {
  //   isSelected: false,
  //   workingDayId: 8,
  //   workingDayName: "Mon - Sun",
  // },
  // {
  //   isSelected: false,
  //   workingDayId: 9,
  //   workingDayName: "Mon - Fri",
  // },
  // {
  //   isSelected: false,
  //   workingDayId: 10,
  //   workingDayName: "Fri - Sat",
  // },
  // {
  //   isSelected: false,
  //   workingDayId: 11,
  //   workingDayName: "Fri - Sun",
  // },
  // ];
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTime, setIsStartTime] = useState(false);
  const [isEndTime, setIsEndTime] = useState(false);
  const [workingDays, setWorkingDays] = useState([]);
  const [describError, setDescribeError] = useState("");
  const [endTimeError, setEndTimeError] = useState("");
  const [periodError, setPeriodError] = useState("-");
  const [startTimeError, setstartTimeError] = useState("");
  const [workingdaysError, setworkingdaysError] = useState("");
  const [salaryError, setSalaryError] = useState("");
  const [newSal, setNewSal] = useState([]);
  // const [salaryArray, setsalaryArray] = useState([
  //   {
  //     salaryTypeId: 1,
  //     salaryType: "  Hour",
  //   },
  //   {
  //     salaryTypeId: 2,
  //     salaryType: "  Day",
  //   },
  //   {
  //     salaryTypeId: 3,
  //     salaryType: "  Week",
  //   },
  //   {
  //     salaryTypeId: 4,
  //     salaryType: "  Month",
  //   },
  // ]);

  useEffect(() => {
    const newSal = salaryArray.map((sal) => {
      return sal.salaryType;
    });
    setNewSal(newSal);
  }, []);
  const [step2, setStep2] = useState({
    startTime: workStartTime,
    endTime: workEndTime,
    salary: salary,
    period: period,
    description: jobDescription,
    workingdays: workDays,
  });

  const showDatePicker = (key) => {
    setDatePickerVisibility(true);
    if (key === "start") {
      setIsStartTime(true);
    } else {
      setIsStartTime(false);
    }
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    // console.warn("A date has been picked: ", date);
    hideDatePicker();
    if (isStartTime) {
      setStep2((prevState) => {
        return { ...prevState, startTime: date };
      });
      setstartTimeError("");
    } else {
      setStep2((prevState) => {
        return { ...prevState, endTime: date };
      });
      setEndTimeError("");
    }
  };

  function selectDays(days) {
    // workingDayId
    setStep2((prevState) => {
      return { ...prevState, workingdays: days };
    });
    setworkingdaysError("");
  }

  const callBackFn = () => {
    if (step2.description === "") {
      setDescribeError("Please enter job description");
    }
    if (step2.endTime === "") {
      setEndTimeError("Please enter job description");
    }
    if (step2.period === "") {
      setPeriodError("Please enter period of pay");
    }
    if (step2.startTime === "") {
      setstartTimeError("Please enter start time");
    }
    if (step2.salary === "") {
      setSalaryError("Please enter Salary");
    }
    if (step2.workingdays.length === 0) {
      setworkingdaysError("please enter working days");
    }

    if (
      !!step2.description &&
      !!step2.endTime &&
      !!step2.period &&
      !!step2.startTime &&
      !!step2.salary &&
      !!step2.workingdays.length > 0
    ) {
      callBack(step2);
    }
  };

  return (
    <View style={Styles.stepTwoView}>
      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.WORKING_DAYS}
        style={Styles.workingDays}
        textStyle={{
          fontSize: 15,
          fontFamily: Constants.Fonts.BLACK,
          color: !!workingdaysError ? "red" : "rgb(38,38,38)",
        }}
      />
      <WorkingDaySelector
        data={Workingdays}
        selectDays={selectDays}
        selectedDays={step2.workingdays}
      />
      {/* {!!workingdaysError && (
        <Text style={{ color: "red" }}>{workingdaysError}</Text>
      )} */}
      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.WORK_HOURS}
        style={Styles.workingDays}
        textStyle={{
          fontSize: 15,
          fontFamily: Constants.Fonts.BLACK,
          color: !!startTimeError || !!endTimeError ? "red" : "rgb(38,38,38)",
        }}
      />
      <View style={Styles.timeView}>
        <TouchableOpacity
          style={[
            Styles.timePickerView,
            { borderColor: !!startTimeError ? "red" : "rgb(200,209,211)" },
          ]}
          onPress={() => showDatePicker("start")}
        >
          {!!step2.startTime ? (
            <Text style={styles.textTime}>
              {Moment(step2.startTime).format("hh:mm A")}
            </Text>
          ) : (
            <Text style={[styles.textTime, { color: "#a0a0a0" }]}>
              {Strings.START_TIME}
            </Text>
          )}
          <Image source={images.jobs.clock} />
        </TouchableOpacity>
        {/* {!!startTimeError && (
          <Text style={{ color: "red" }}>{startTimeError}</Text>
        )} */}

        <TouchableOpacity
          style={[
            Styles.timePickerView,
            { borderColor: !!endTimeError ? "red" : "rgb(200,209,211)" },
          ]}
          onPress={() => showDatePicker("end")}
        >
          {!!step2.endTime ? (
            <Text style={styles.textTime}>
              {Moment(step2.endTime).format("hh:mm a")}
            </Text>
          ) : (
            <Text style={[styles.textTime, { color: "#a0a0a0" }]}>
              {Strings.END_TIME}
            </Text>
          )}
          <Image source={images.jobs.clock} />
        </TouchableOpacity>
        {/* {!!endTimeError && <Text style={{ color: "red" }}>{endTimeError}</Text>} */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          // minimumDate={new Date()}
        />
      </View>
      <Label
        type={LabelTypes.MEDIUM}
        text={Strings.SALARY}
        style={Styles.workingDays}
        textStyle={{
          fontSize: 15,
          fontFamily: Constants.Fonts.BLACK,
          color: !!salaryError ? "red" : "rgb(38,38,38)",
        }}
      />
      <View style={Styles.timeView}>
        <View
          style={[
            Styles.dateInput,
            { borderColor: !!salaryError ? "red" : "rgb(200,209,211)" },
          ]}
        >
          <View style={styles.dollarView}>
            <Text style={Styles.dollarText}>$</Text>
          </View>
          <TextInput
            style={[styles.textInputSalary, { color: "rgb(38,38,38)" }]}
            maxLength={5}
            onChangeText={(text) => {
              const condition = /^[0-9]*$/;
              let status = condition.test(text);

              setStep2((prevState) => {
                return { ...prevState, salary: status ? text : step2.salary };
              });
              if (text.length > 0) setSalaryError("");
            }}
            placeholder={"Salary"}
            keyboardType={"number-pad"}
            value={step2.salary}
          />
          {/* {!!salaryError && <Text style={{ color: "red" }}>{salaryError}</Text>} */}
        </View>
        <TouchableOpacity
          style={Styles.dateDropDownView}
          onPress={() => {
            this.sal && this.sal.show();
          }}
        >
          <ModalDropdown
            textStyle={{
              fontFamily: Constants.Fonts.MEDIUM,
              fontSize: 15,
              // color: "rgb(160,160,160)",
              color: "rgb(38,38,38)",
              paddingHorizontal:8
            }}
            style={{ flex: 1 }}
            options={newSal}
            defaultValue={"Hour"}
            ref={(el) => {
              this.sal = el;
            }}
            dropdownTextStyle={{
              fontFamily: Constants.Fonts.MEDIUM,
              fontSize: 15,
              color: "rgb(100,100,100)", // "rgb(160,160,160)",
            }}
            dropdownStyle={Styles.dropHourView}
            onSelect={(idx, value) => {
              // dropdownSelect(idx, value, "qual");
              let selectedId = "";
              const newSal = salaryArray.map((item, index) => {
                if (item.salaryType === value) {
                  selectedId = item.salaryTypeId;
                }
              });

              setStep2((prevState) => {
                return { ...prevState, period: selectedId };
              });
              setPeriodError("");
            }}
          />

          <Image
            style={{ position: "absolute", right: 10 }}
            source={images.jobs.down}
          />
        </TouchableOpacity>
        {/* {!!periodError && <Text style={{ color: "red" }}>{periodError}</Text>} */}
      </View>
      <View style={styles.bottomView}>
        <Label
          type={LabelTypes.MEDIUM}
          text={Strings.DESCRIPTION}
          style={Styles.workingDays}
          textStyle={{
            fontSize: 15,
            fontFamily: Constants.Fonts.BLACK,
            color: !!describError ? "red" : "rgb(38,38,38)",
          }}
        />
        <View
          style={[
            Styles.editorView,
            { borderColor: !!describError ? "red" : "rgb(200,209,211)" },
          ]}
        >
          <TextInput
            style={[styles.textInput, { color: "rgb(38,38,38)" }]}
            multiline={true}
            numberOfLines={0}
            onChangeText={(text) => {
              // const condition = /^[#a-zA-Z0-9- ]*$/;
              // let status = condition.test(text);
              setStep2((prevState) => {
                return {
                  ...prevState,
                  description:text,
                };
              });

              if (text.length > 0) setDescribeError("");
            }}
            value={step2.description}
            placeholder={"Enter a brief description of the job"}
          />
        </View>
        {/* {!!describError && <Text style={{ color: "red" }}>{describError}</Text>} */}
      </View>
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

const WorkingDaySelector = (props) => {
  const [selectedItems, setSelectedItems] = useState(props.selectedDays);
  const [items, setItems] = useState(props.data);

  const onSelect = (index) => {
    const newItems = [...selectedItems];
    // const newItems = [];
    if (newItems.indexOf(index) === -1) {
      newItems.push(index);
    } else {
      const itemIndex = newItems.indexOf(index);
      newItems.splice(itemIndex, 1);
    }
    setSelectedItems(newItems);
    props.selectDays(newItems);
  };

  const isSelected = (index) => {
    return selectedItems.indexOf(index) !== -1 ? true : false;
  };

  return (
    <View style={Styles.dayContainer}>
      {items.map((item, index) => (
        <TouchableOpacity onPress={() => onSelect(index)}>
          <View style={[Styles.day, isSelected(index) && Styles.selected]}>
            <Text
              style={[Styles.dayText, isSelected(index) && Styles.selectedText]}
            >
              {item.workingDayName}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
