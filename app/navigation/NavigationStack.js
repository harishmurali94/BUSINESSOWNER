import * as React from "react";
import * as saveJobAction from "../actions/saveJobAction";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Image, Text, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { navigationRef } from "./NavigationService";
import Login from "app/screens/Login";
import SignUp from "app/screens/Signup";
import OTP from "app/screens/OTP";
import PostJob from "app/screens/PostJob";
import JobListScreen from "app/screens/JobListScreen";
import JobDetailScreen from "app/screens/JobDetailScreen";
import ProfileScreen from "app/screens/ProfileScreen";
import Notifications from "app/screens/Notifications";
import QrCodeScreen from "app/screens/QrCodeScreen";
import images from "../config/images";
import messaging from "@react-native-firebase/messaging";

import PushNotificationIOS from "@react-native-community/push-notification-ios";
let PushNotification = require("react-native-push-notification");

const Stack = createStackNavigator();
const JobTabNavigator = createBottomTabNavigator();
const RootStack = createStackNavigator();
const LoginStack = createStackNavigator();
const ProfileStack = createStackNavigator();

function getTabBarVisible(route) {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || "PostJob";

  if (routeName === "PostJob") {
    return false;
  }
  return true;
}

const JobTabNavigatorScreen = () => {
  const dispatch = useDispatch();

  function pressAdd() {
    dispatch(saveJobAction.addJob());
  }

  return (
    <JobTabNavigator.Navigator
      screenOptions={({ route }) => ({
        tabBarLabel: ({ focused }) => {
          var text;
          var style = {
            fontFamily: focused ? "Lato-Black" : "Lato-Regular",
            fontSize: 13,
            marginBottom: 5,
          };
          switch (route.name) {
            case "JobListScreen":
              text = "My Jobs";
              break;
            case "Add Jobs":
              text = "Post Jobs";
              break;
            case "Scanner":
              text = "Scan";
              break;
            default:
              text = "Notifications";
              break;
          }

          return <Text style={style}>{text}</Text>;
        },
        tabBarIcon: ({ focused, color, size }) => {
          var iconName;
          switch (route.name) {
            case "JobListScreen":
              iconName = images.tab.home;
              break;
            case "Add Jobs":
              iconName = images.tab.plus1;
              break;
            case "Scanner":
              iconName = images.scanner.scanner;
              break;
            default:
              iconName = images.tab.notification;
              break;
          }
          return (
            <Image
              source={iconName}
              resizeMode={"contain"}
              style={{
                tintColor: focused ? "#ffc400" : "",
                width: 24,
                height: 24,
              }}
            />
          );
        },
      })}
      tabBarOptions={{
        style: {
          height: 70,
        },
        tabStyle: { backgroundColor: "white", justifyContent: "flex-end" },
        activeTintColor: "#0f0a40",
        inactiveTintColor: "#0f0a40",
        showLabel: true,
      }}
    >
      <JobTabNavigator.Screen
        name="JobListScreen"
        component={JobListScreen}
        options={({ route }) => ({
          // tabBarVisible: getTabBarVisible(route),
        })}
      />
      <JobTabNavigator.Screen
        name="Add Jobs"
        component={PostJobStackScreens}
        options={({ route }) => ({
          tabBarVisible: getTabBarVisible(route),
        })}
        listeners={({ navigation, route }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            pressAdd();
            navigation.navigate("PostJob");
          },
        })}
      />
      <JobTabNavigator.Screen
        name="Scanner"
        component={QrCodeScreen}
        options={({ route }) => ({})}
      />
      <JobTabNavigator.Screen
        name="Notifications"
        component={Notifications}
        options={({ route }) => ({})}
      />
    </JobTabNavigator.Navigator>
  );
};

const HomestackScreens = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="JobTabNavigatorScreen"
      component={JobTabNavigatorScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="JobDetailScreen"
      component={JobDetailScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="QrCodeScreen"
      component={QrCodeScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="PostJob"
      component={PostJob}
      options={{
        // When logging out, a pop animation feels intuitive
        // You can remove this if you want the default 'push' animation
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const PostJobStackScreens = () => (
  <ProfileStack.Navigator>
    <ProfileStack.Screen
      name="PostJob"
      component={PostJob}
      options={{
        // When logging out, a pop animation feels intuitive
        // You can remove this if you want the default 'push' animation
        headerShown: false,
      }}
    />
  </ProfileStack.Navigator>
);

const ProfileStackScreens = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Signup"
      component={SignUp}
      options={{
        headerShown: false,
      }}
    />
  </Stack.Navigator>
);

const LoginStackScreens = () => (
  <LoginStack.Navigator>
    <LoginStack.Screen
      name="Login"
      component={Login}
      options={{
        // When logging out, a pop animation feels intuitive
        // You can remove this if you want the default 'push' animation
        headerShown: false,
      }}
    />
    <LoginStack.Screen
      name="OTP"
      component={OTP}
      options={{
        // headerTransparent: true,
        // title:'',
        // headerBackTitleVisible:false,
        headerShown: false,
      }}
    />
  </LoginStack.Navigator>
);

const RootStackScreen = ({
  otpVerified,
  isProfileCreated,
  jobSaved,
  isSignUpLastScreenShow,
}) => {
  if (!otpVerified) {
    return (
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen
          name="LoginStackScreens"
          component={LoginStackScreens}
          options={{
            animationEnabled: false,
          }}
        />
      </RootStack.Navigator>
    );
  }

  if (!isProfileCreated || !isSignUpLastScreenShow) {
    return (
      <RootStack.Navigator headerMode="none">
        <RootStack.Screen
          name="ProfileStackScreens"
          component={ProfileStackScreens}
          options={{
            animationEnabled: false,
          }}
        />
      </RootStack.Navigator>
    );
  }
  // if (!jobSaved) {
  //   return (
  //     <RootStack.Navigator headerMode="none">
  //       <RootStack.Screen
  //         name="PostJobStackScreens"
  //         component={PostJobStackScreens}
  //         options={{
  //           animationEnabled: false,
  //         }}
  //       />
  //     </RootStack.Navigator>
  //   );
  // }
  return (
    <RootStack.Navigator headerMode="none">
      {/* <RootStack.Screen
        name="PostJobStackScreens"
        component={PostJobStackScreens}
        options={{
          animationEnabled: false,
        }}
      /> */}
      <RootStack.Screen
        name="HomestackScreens"
        component={HomestackScreens}
        options={{
          animationEnabled: false,
        }}
      />
    </RootStack.Navigator>
  );
};

export default function App() {
  const otpVerified = useSelector((state) => state.loginReducer.otpVerified);
  const jobSaved = useSelector((state) => state.saveJobsReducer.jobSaved);
  const isProfileCreated = useSelector(
    (state) => state.profileReducer.isProfileCreated
  );
  const isSignUpLastScreenShow = useSelector(
    (state) => state.profileReducer.isSignUpLastScreenShow
  );

  React.useEffect(async () => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function(token) {
        console.log("TOKEN:", token);
      },
      onNotification: function(notification) {
        console.warn("NOTIFICATION:", notification);
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log(
        "++++ onNotificationOpenedApp remoteMessage +++",
        JSON.stringify(remoteMessage, null, 2)
      );
      if (remoteMessage.data.Screenname === "userDetails") {
        navigationRef.navigate("ProfileScreen", {
          jsuserId: remoteMessage.data.JSUserId,
          jobid: remoteMessage.data.JobId,
        });
      } else {
        navigationRef.navigate("JobTabNavigatorScreen");
      }
    });

    messaging().onMessage(async (message) => {
      console.log(
        "++++ getInitialNotification remoteMessage +++",
        JSON.stringify(message, null, 2)
      );

      if (message.data.Screenname === "userDetails") {
        navigationRef.navigate("ProfileScreen", {
          jsuserId: remoteMessage.data.JSUserId,
          jobid: remoteMessage.data.JobId,
        });
      } else {
        navigationRef.navigate("JobTabNavigatorScreen");
      }
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage.data.Screenname === "userDetails") {
          navigationRef.navigate("ProfileScreen", {
            jsuserId: remoteMessage.data.JSUserId,
            jobid: remoteMessage.data.JobId,
          });
        } else {
          navigationRef.navigate("JobTabNavigatorScreen");
        }
      });
  }, []);
  return (
    <NavigationContainer ref={navigationRef}>
      <RootStackScreen
        otpVerified={otpVerified}
        isProfileCreated={isProfileCreated}
        isSignUpLastScreenShow={isSignUpLastScreenShow}
        jobSaved={jobSaved}
      />
    </NavigationContainer>
  );
}