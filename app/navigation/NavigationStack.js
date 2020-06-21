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
            // Do something with the `navigation` object
            // navigation.navigate('AnotherPlace');
          },
        })}
      />
      <JobTabNavigator.Screen
        name="Scanner"
        component={QrCodeScreen}
        options={({ route }) => ({
          // tabBarVisible: getTabBarVisible(route),
        })}
      />
      <JobTabNavigator.Screen
        name="Notifications"
        component={Notifications}
        options={({ route }) => ({
          // tabBarVisible: getTabBarVisible(route),
        })}
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
        // When logging out, a pop animation feels intuitive
        // You can remove this if you want the default 'push' animation
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="JobDetailScreen"
      component={JobDetailScreen}
      options={{
        // When logging out, a pop animation feels intuitive
        // You can remove this if you want the default 'push' animation
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        // When logging out, a pop animation feels intuitive
        // You can remove this if you want the default 'push' animation
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="QrCodeScreen"
      component={QrCodeScreen}
      options={{
        // When logging out, a pop animation feels intuitive
        // You can remove this if you want the default 'push' animation
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

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function(notification) {
        console.warn("NOTIFICATION:", notification);
        // if (notification.foreground) {
        //   Alert.alert(
        //     notification.data.jobTitle,
        //     notification.data.body,
        //     [
        //       {
        //         text: "Cancel",
        //         onPress: () => console.log("Cancel Pressed"),
        //         style: "cancel",
        //       },
        //       { text: "OK", onPress: () => console.log("OK Pressed") },
        //     ],
        //     { cancelable: false }
        //   );
        // }

        // process the notification

        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      console.log("REMOTEMESSAGEEEEEE", remoteMessage);
      // navigation.navigate(remoteMessage.data.type);
    });

    messaging().onMessage(async (message) => {
      console.log("MESSAGEEEEEEEEEE", message);
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          console.log("REMOTEEEEEEEEEEEEE", remoteMessage);
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

// import * as React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createStackNavigator } from "@react-navigation/stack";
// import { useSelector, useDispatch } from "react-redux";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import { Image, Text, View } from "react-native";
// import SplashScreen from "react-native-splash-screen";
// import { navigationRef } from "./NavigationService";
// import Login from "app/screens/Login";
// import SignUp from "app/screens/Signup";
// import OTP from "app/screens/OTP";
// import PostJob from "app/screens/PostJob";
// import JobListScreen from "app/screens/JobListScreen";
// import JobDetailScreen from "app/screens/JobDetailScreen";
// import ProfileScreen from "app/screens/ProfileScreen";
// import Notifications from "app/screens/Notifications";
// import QrCodeScreen from "app/screens/QrCodeScreen";
// import images from "../config/images";
// import messaging from "@react-native-firebase/messaging";
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// let PushNotification = require("react-native-push-notification");

// const Stack = createStackNavigator();
// const JobTabNavigator = createBottomTabNavigator();
// const RootStack = createStackNavigator();
// const LoginStack = createStackNavigator();
// const ProfileStack = createStackNavigator();

// function getTabBarVisible(route) {
//   const routeName = route.state
//     ? route.state.routes[route.state.index].name
//     : route.params?.screen || "PostJob";

//   if (routeName === "PostJob") {
//     return false;
//   }
//   return true;
// }

// const JobTabNavigatorScreen = () => {
//   const dispatch = useDispatch();

//   // function pressAdd(){
//   //     dispatch(saveJobAction.addJob());
//   // }

//   return (
//     <JobTabNavigator.Navigator
//       screenOptions={({ route }) => ({
//         tabBarLabel: ({ focused }) => {
//           var text;
//           var style = {
//             fontFamily: focused ? "Lato-Black" : "Lato-Regular",
//             fontSize: 13,
//             marginBottom: 5,
//           };
//           switch (route.name) {
//             case "JobListScreen":
//               text = "My Jobs";
//               break;
//             case "Post Jobs":
//               text = "Post Job";
//               break;
//             case "Scanner":
//               text = "Scan";
//               break;
//             default:
//               text = "Notifications";
//               break;
//           }

//           return <Text style={style}>{text}</Text>;
//         },
//         tabBarIcon: ({ focused, color, size }) => {
//           var iconName;
//           switch (route.name) {
//             case "JobListScreen":
//               iconName = images.tab.home;
//               break;
//             case "Post Jobs":
//               iconName = images.tab.plus1;
//               break;
//             case "Scanner":
//               iconName = images.scanner.scanner;
//               break;
//             default:
//               iconName = images.tab.notification;
//               break;
//           }
//           return (
//             <Image
//               source={iconName}
//               resizeMode={"contain"}
//               style={{
//                 tintColor: focused ? "#ffc400" : "",
//                 width: 24,
//                 height: 24,
//               }}
//             />
//           );
//         },
//       })}
//       tabBarOptions={{
//         style: {
//           height: 68,
//         },
//         tabStyle: { backgroundColor: "white", justifyContent: "flex-end" },
//         activeTintColor: "#0f0a40",
//         inactiveTintColor: "#0f0a40",
//         showLabel: true,
//       }}
//     >
//       <JobTabNavigator.Screen
//         name="JobListScreen"
//         component={JobListScreen}
//         options={({ route }) => ({
//           // tabBarVisible: getTabBarVisible(route),
//         })}
//       />
//       <JobTabNavigator.Screen
//         name="Post Jobs"
//         component={PostJob}
//         options={({ route }) => ({
//           tabBarVisible: getTabBarVisible(route),
//         })}
//         listeners={({ navigation, route }) => ({
//           tabPress: (e) => {
//             console.warn("jhkbbnmnm", route);
//             // Prevent default action
//             e.preventDefault();
//             //  pressAdd();
//             //  navigation.navigate('PostJob');
//             // Do something with the `navigation` object
//             // navigation.navigate('AnotherPlace');
//           },
//         })}
//       />
//       <JobTabNavigator.Screen
//         name="Scanner"
//         component={QrCodeScreen}
//         options={({ route }) => ({
//           // tabBarVisible: getTabBarVisible(route),
//         })}
//       />
//       <JobTabNavigator.Screen
//         name="Notifications"
//         component={Notifications}
//         options={({ route }) => ({
//           // tabBarVisible: getTabBarVisible(route),
//         })}
//       />
//     </JobTabNavigator.Navigator>
//   );
// };

// const HomestackScreens = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="JobTabNavigatorScreen"
//       component={JobTabNavigatorScreen}
//       options={{
//         // When logging out, a pop animation feels intuitive
//         // You can remove this if you want the default 'push' animation
//         headerShown: false,
//       }}
//     />
//     <Stack.Screen
//       name="JobDetailScreen"
//       component={JobDetailScreen}
//       options={{
//         // When logging out, a pop animation feels intuitive
//         // You can remove this if you want the default 'push' animation
//         headerShown: false,
//       }}
//     />
//     <Stack.Screen
//       name="ProfileScreen"
//       component={ProfileScreen}
//       options={{
//         // When logging out, a pop animation feels intuitive
//         // You can remove this if you want the default 'push' animation
//         headerShown: false,
//       }}
//     />
//     <Stack.Screen
//       name="QrCodeScreen"
//       component={QrCodeScreen}
//       options={{
//         // When logging out, a pop animation feels intuitive
//         // You can remove this if you want the default 'push' animation
//         headerShown: false,
//       }}
//     />
//     <Stack.Screen
//       name="Post Jobs"
//       component={PostJob}
//       options={{
//         // When logging out, a pop animation feels intuitive
//         // You can remove this if you want the default 'push' animation
//         headerShown: false,
//       }}
//     />
//   </Stack.Navigator>
// );

// const JobStackScreens = () => (
//   <JobStack.Navigator>
//     <JobStack.Screen
//       name="PostJob"
//       component={PostJob}
//       options={{
//         // When logging out, a pop animation feels intuitive
//         // You can remove this if you want the default 'push' animation
//         headerShown: false,
//       }}
//     />
//   </JobStack.Navigator>
// );

// const PostJobStackScreens = () => (
//   <ProfileStack.Navigator>
//     <ProfileStack.Screen
//       name="PostJob"
//       component={PostJob}
//       options={{
//         // When logging out, a pop animation feels intuitive
//         // You can remove this if you want the default 'push' animation
//         headerShown: false,
//       }}
//     />
//   </ProfileStack.Navigator>
// );

// const ProfileStackScreens = () => (
//   <Stack.Navigator>
//     <Stack.Screen
//       name="Signup"
//       component={SignUp}
//       options={{
//         headerShown: false,
//       }}
//     />
//     <Stack.Screen
//       name="PostJob"
//       component={PostJob}
//       options={{
//         // When logging out, a pop animation feels intuitive
//         // You can remove this if you want the default 'push' animation
//         headerShown: false,
//       }}
//     />
//   </Stack.Navigator>
// );

// const LoginStackScreens = () => (
//   <LoginStack.Navigator>
//     <LoginStack.Screen
//       name="Login"
//       component={Login}
//       options={{
//         // When logging out, a pop animation feels intuitive
//         // You can remove this if you want the default 'push' animation
//         headerShown: false,
//       }}
//     />
//     <LoginStack.Screen
//       name="OTP"
//       component={OTP}
//       options={{
//         // headerTransparent: true,
//         // title:'',
//         // headerBackTitleVisible:false,
//         headerShown: false,
//       }}
//     />
//   </LoginStack.Navigator>
// );

// const RootStackScreen = ({
//   otpVerified,
//   isProfileCreated,
//   jobSaved,
//   isSignUpLastScreenShow,
// }) => {
//   if (!otpVerified) {
//     return (
//       <RootStack.Navigator headerMode="none">
//         <RootStack.Screen
//           name="LoginStackScreens"
//           component={LoginStackScreens}
//           options={{
//             animationEnabled: false,
//           }}
//         />
//       </RootStack.Navigator>
//     );
//   }
//   if (!isProfileCreated || !isSignUpLastScreenShow) {
//     return (
//       <RootStack.Navigator headerMode="none">
//         <RootStack.Screen
//           name="ProfileStackScreens"
//           component={ProfileStackScreens}
//           options={{
//             animationEnabled: false,
//           }}
//         />
//       </RootStack.Navigator>
//     );
//   }
//   return (
//     <RootStack.Navigator headerMode="none">
//       <RootStack.Screen
//         name="HomestackScreens"
//         component={HomestackScreens}
//         options={{
//           animationEnabled: false,
//         }}
//       />
//     </RootStack.Navigator>
//   );
// };

// export default function App() {
//   const otpVerified = useSelector((state) => state.loginReducer.otpVerified);
//   const jobSaved = useSelector((state) => state.saveJobsReducer.jobSaved);
//   const isProfileCreated = useSelector(
//     (state) => state.profileReducer.isProfileCreated
//   );
//   const isSignUpLastScreenShow = useSelector(
//     (state) => state.profileReducer.isSignUpLastScreenShow
//   );
//   React.useEffect(async () => {
//     setTimeout(() => {
//       SplashScreen.hide();
//     }, 1000);

//     PushNotification.configure({
//       // (optional) Called when Token is generated (iOS and Android)
//       onRegister: function(token) {
//         console.log("TOKEN:", token);
//       },

//       // (required) Called when a remote is received or opened, or local notification is opened
//       onNotification: function(notification) {
//         console.warn("NOTIFICATION:", notification);
//         if (notification.foreground) {
//           Alert.alert(
//             notification.data.jobTitle,
//             notification.data.body,
//             [
//               {
//                 text: "Cancel",
//                 onPress: () => console.log("Cancel Pressed"),
//                 style: "cancel",
//               },
//               { text: "OK", onPress: () => console.log("OK Pressed") },
//             ],
//             { cancelable: false }
//           );
//         }

//         // process the notification

//         // (required) Called when a remote is received or opened, or local notification is opened
//         notification.finish(PushNotificationIOS.FetchResult.NoData);
//       },

//       // IOS ONLY (optional): default: all - Permissions to register.
//       permissions: {
//         alert: true,
//         badge: true,
//         sound: true,
//       },

//       // Should the initial notification be popped automatically
//       // default: true
//       popInitialNotification: true,

//       /**
//        * (optional) default: true
//        * - Specified if permissions (ios) and token (android and ios) will requested or not,
//        * - if not, you must call PushNotificationsHandler.requestPermissions() later
//        * - if you are not using remote notification or do not have Firebase installed, use this:
//        *     requestPermissions: Platform.OS === 'ios'
//        */
//       requestPermissions: true,
//     });
//     messaging().onNotificationOpenedApp(async (remoteMessage) => {
//       console.log("REMOTEMESSAGEEEEEE", remoteMessage);
//       // navigation.navigate(remoteMessage.data.type);
//     });

//     messaging().onMessage(async (message) => {
//       console.log("MESSAGEEEEEEEEEE", message);
//     });

//     // Check whether an initial notification is available
//     messaging()
//       .getInitialNotification()
//       .then(async (remoteMessage) => {
//         if (remoteMessage) {
//           console.log("REMOTEEEEEEEEEEEEE", remoteMessage);
//         }
//       });
//   }, []);
//   return (
//     <NavigationContainer ref={navigationRef}>
//       <RootStackScreen
//         otpVerified={otpVerified}
//         isProfileCreated={isProfileCreated}
//         isSignUpLastScreenShow={isSignUpLastScreenShow}
//         jobSaved={jobSaved}
//       />
//     </NavigationContainer>
//   );
// }
