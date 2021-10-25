import React, { useState, useRef } from 'react';
import { Dimensions } from 'react-native';
import {
  StyleSheet,
  View,
  Platform,
  PermissionsAndroid,
  ToastAndroid,
} from 'react-native';
import MapboxNavigation from '@homee/react-native-mapbox-navigation';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

Geocoder.init('google_api_key');

const { width, height } = Dimensions.get('window');

export default class NavigationApp extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: 0,
        longitude: 0,
      },
      destination: '',
      tracksViewChanges: false,
      mounted: false,
      address: '',
    };
  }
  hasLocationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version <= 28) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) return true;

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) return true;

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }
    return false;
  };
  geolocation() {
    if (this.hasLocationPermission()) {
      this.watchId = Geolocation.getCurrentPosition(
        position => {
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
            loading: true,
          });
        },
        error => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 },
      );
    }
  }

  componentDidMount() {
    this.geolocation();
  }
  async componentWillUnmount() {
    await Geolocation.clearWatch(this.watchId);
  }

  render() {
    const { latitude, longitude } = this.state.region;
    let updateOrigin = [longitude, latitude];
    //console.log('update latitude,,,,,,,,', updateLatitude);
    // console.log('direction,,,,,,,,,,', longitude, latitude);
    return (
      <View style={styles.container}>
        <MapboxNavigation
          origin={updateOrigin}
          destination={[68.0699433332555, 25.865054999999128]}
          // shouldSimulateRoute
          hideStatusView
          // showsEndOfRouteFeedback
          onLocationChange={event => {
            const { latitude, longitude } = event.nativeEvent;
            // console.log('inside location change,,,,,,,', longitude, latitude);

            this.setState({
              region: {
                latitude: latitude,
                longitude: longitude,
              },
            });
          }}
          onRouteProgressChange={event => {
            const {
              distanceTraveled,
              durationRemaining,
              fractionTraveled,
              distanceRemaining,
            } = event.nativeEvent;
          }}
          onError={event => {
            const { message } = event.nativeEvent;
          }}
          onCancelNavigation={() => {
            // User tapped the "X" cancel button in the nav UI
            // or canceled via the OS system tray on android.
            // Do whatever you need to here.
          }}
          onArrive={() => {
            // Called when you arrive at the destination.
          }}></MapboxNavigation>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height,
    width,
  },
});
