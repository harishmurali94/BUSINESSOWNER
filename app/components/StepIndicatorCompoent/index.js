import React from "react";
import { Image } from "react-native";
import StepIndicator from "react-native-step-indicator";
import Images from "../../config/images";

export default function StepIndicatorComponent(props) {
  const customStyles = {
    stepIndicatorSize: 12,
    currentStepIndicatorSize: 12,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 1,
    stepStrokeCurrentColor: "#69E4A6",
    stepStrokeWidth: 1,
    stepStrokeFinishedColor: "#69E4A6",
    stepStrokeUnFinishedColor: "rgb(240,243,244)",
    separatorFinishedColor: "#69E4A6",
    separatorUnFinishedColor: "rgb(240,243,244)",
    stepIndicatorFinishedColor: "#69E4A6",
    stepIndicatorUnFinishedColor: "rgb(240,243,244)",
    stepIndicatorCurrentColor: "#69E4A6",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "#69E4A6",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "#aaaaaa",
    labelColor: "#999999",
    labelSize: 13,
    currentStepLabelColor: "#69E4A6",
  };

  putTickIndicator = (state) => {
    let image = "";
    if (state.stepStatus === "finished") {
      image = Images.stepIndicator.completed;
    } else if (state.stepStatus === "current") {
      image = Images.stepIndicator.current;
    }
    return <Image source={image} />;
  };

  return (
    <StepIndicator
      customStyles={customStyles}
      currentPosition={props.position}
      stepCount={props.renderTotalNumber}
      renderStepIndicator={(state) => {
        return putTickIndicator(state);
      }}
    />
  );
}
