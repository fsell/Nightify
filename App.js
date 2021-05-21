import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native'
import * as Location from 'expo-location'
//import * as Twilio from 'twilio';

export default function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultStyle, setDefaultStyle] = useState(true);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  /*
  const accountSid = "ACdd2c7a20c9ed95f9b4ebbcfed5cbe167";
  const authToken = "9b71fff12f98dd39d23eabfd065bef90";
  const client = require('twilio')(accountSid, authToken);

  client.messages.create({
      body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
      from: '+15122343172',
      to: '+18572182296',
  })
  .then(message => console.log(message.sid));
  */

  useEffect(() => {
    load()
  }, []);

  async function load() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status != 'granted') {
        setErrorMessage('Access to location is needed to run the app');
        return;
      }

      let location = await Location.getCurrentPositionAsync();

      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);

      console.log("Here!")
  }

  function sendMessage() {
    alert(`Longitude: ${longitude}, Latitude:  ${latitude}`);
  }

  return (
    <View
      onStartShouldSetResponder={() => {
        setDefaultStyle(!defaultStyle);
        load();
        return true;
      }}
      onResponderRelease={ () => {
        setDefaultStyle(!defaultStyle);
        sendMessage();
      } }
      style={defaultStyle ?
              styles.containerStyle1 :
              styles.containerStyle2}>
    </View>
  );
}
/*<TouchableOpacity
  onPress={() => alert(`Longitude: ${long}, Latitude:  ${lat}`)}
  style={styles.button}>
  <Text style={styles.buttonText}>Press Here!</Text>
</TouchableOpacity>*/
//<StatusBar style="auto" />
const styles = StyleSheet.create({
  containerStyle1: {
    flex: 1,
    backgroundColor: 'blue',
    opacity: 1.0,
  },
  containerStyle2: {
    flex: 1,
    backgroundColor: 'blue',
    opacity: 0.2,
  },
});
