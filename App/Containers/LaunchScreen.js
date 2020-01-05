import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import firebase from 'react-native-firebase'
import TokenRegistration from '../Services/TokenRegistration'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fcmToken: '',
    }
  }

  async componentDidMount() {
    const enabled = await firebase.messaging().hasPermission();
    if (enabled) {
      firebase
        .messaging()
        .getToken()
        .then(fcmToken => {
          if (fcmToken) {
            this.setState({ fcmToken: fcmToken });
          } else {
            alert("user doesn't have a device token yet");
          }
        });
    } else {
      //request permission ------------
      firebase.messaging().requestPermission()
        .then(() => {
          // User has authorised  
          firebase
            .messaging()
            .getToken()
            .then(fcmToken => {
              if (fcmToken) {
                //TokenService.addUser(fcmToken, "Food is ready!", "Hello user, your food is prepared and ready to be taken.");
                this.setState({ fcmToken: fcmToken });
              } else {
                alert("user doesn't have a device token yet");
              }
            });
        })
        .catch(error => {
          // User has rejected permissions  
          console.log('User has rejected push notification permission.');
        });
    }

    this.removeNotificationListener = firebase.notifications().onNotification((Notification) => {
      // Process your notification as required

      const notification = new firebase.notifications.Notification({
        sound: 'default',
        show_in_foreground: true,
      })
        .setNotificationId(Notification._notificationId)
        .setTitle(Notification._title)
        .setBody(Notification._body)
        .setData(Notification._data);

      const channel = new firebase.notifications.Android.Channel(
        'channel8',
        'Channel 8',
        firebase.notifications.Android.Importance.Max
      ).setDescription('The channel used to display notifications in foreground.');
      firebase.notifications().android.createChannel(channel);

      notification
        .android.setChannelId('channel8')
        .android.setSmallIcon('ic_launcher')
        .android.setPriority(firebase.notifications.Android.Priority.High);

      firebase.notifications()
        .displayNotification(notification)
        .catch(err => alert(err));

    });
  }

  componentWillUnmount() {
    this.unsubscribeFromNotificationListener();
  }

  render () {
    return (
      <View style={styles.Container}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            TokenRegistration.registerToken(this.state.fcmToken);
          }}
        >
          <Text style={styles.ButtonText}>
            Register
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}
