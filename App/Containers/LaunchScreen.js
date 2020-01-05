import React, { Component } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'

import firebase from 'react-native-firebase'
import TokenRegistration from '../Services/TokenRegistration'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  render () {
    return (
      <View style={styles.Container}>
        <TouchableOpacity
          style={styles.Button}
          onPress={() => {
            TokenRegistration.registerToken("123456");
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
