import React from "react";
import Images from "../../config/images";
import CustomSelectNew from "./CustomSelectNew";
import { FlatList, View, Text, TouchableOpacity , Image} from "react-native";
import CustomTextInput from "../CustomTextInput";
import { Input, Button, Label, LabelTypes } from "../../components";

const RenderList = ({ item, index, selectJob }) => {
  return (
    <CustomSelectNew
      textKey={item.jobType}
      selected={item.isSelected}
      textTranslate={true}
      onPress={selectJob}
      isRightImage={true}
      dynamicImage={true}
      rightImage={item.jobIcon}
      backgroundColor={item.isSelected ? "#69E4A6" : "transparent"}
    />
  );
};

const Step3 = (props) => {
  return (
    <View style={{ flex: 3 }}>
      <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
      <Label text={"Your Business Type"} />
      <TouchableOpacity onPress={()=>{
        props.closeModal();
      }}>
        <Image source={Images.close.close} style={{width:16,height:16}}/>
      </TouchableOpacity>
      </View>
      <CustomTextInput
        placeholder={"Search"}
        isRightImage={true}
        rightImage={Images.boarding_step_1.search}
        {...props}
        style={{ marginTop: 21 }}
      />

      <View style={{ height: 21 }} />

      <FlatList
        style={{ flex: 1 }}
        numColumns={2}
        data={props.jobsTypes}
        extraData={props.jobsTypes}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => {
          return (
            <RenderList
              item={item}
              index={index}
              selectJob={props.selectJobType}
            />
          );
        }}
      />
      <View
        style={{
          marginBottom: 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          title={"Done"}
          onPress={(event) => {
            props.closeModal();
          }}
        />
      </View>
    </View>
  );
};

export default Step3;
