import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform,
  ActivityIndicator,
  PermissionsAndroid
} from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { PERMISSIONS } from 'react-native-permissions';
import SwipeUpDown from 'react-native-swipe-up-down';
import MapViewNavigation, {
  NavigationModes,
  TravelModeBox,
  TravelIcons,
  TravelModes,
  DirectionsListView,
  ManeuverView,
  DurationDistanceView,
} from 'react-native-maps-navigation';
import Styles, { AppColors, AppFonts } from './AppStyles';
import MapStyles from './MapStyles';
import Icon from 'react-native-vector-icons/Entypo';
import BackgroundGeolocation from "react-native-background-geolocation";
import Geolocation from '@react-native-community/geolocation';
// import { checkMultiplePermissions } from '../../utils/AppPermissions';

const USE_METHODS = false;

export default class MapNavigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      origin: { latitude: 37.78825, longitude: -122.4324 },
      destination: '',
      navigationMode: NavigationModes.IDLE,
      travelMode: TravelModes.DRIVING,
      isFlipped: false,
      isNavigation: false,
      route: false,
      step: false,
      moveMarker: false,
      currentLocationLat: 0,
      today: new Date(),
      enabled: false,
      isMoving: false,
    };
  }


  componentDidMount() {
    this.configureBackgroundGeolocation()
  }

  componentWillUnmount() {
    // It's a good idea to #removeListeners when your component is unmounted, especially when hot-relaoding
    // Otherwise, you'll accumulate event-listeners.
    BackgroundGeolocation.removeListeners();
  }

  async configureBackgroundGeolocation() {

    // Step 1:  Listen to events:
    BackgroundGeolocation.onLocation(this.onLocation);
    BackgroundGeolocation.onMotionChange(this.onMotionChange);
    BackgroundGeolocation.onActivityChange(this.onActivityChange);
    BackgroundGeolocation.onProviderChange(this.onProviderChange);
    BackgroundGeolocation.onPowerSaveChange(this.onPowerSaveChange);
    BackgroundGeolocation.onHttp(this.onHttp);
    BackgroundGeolocation.onHeartbeat(this.onHeartbeat);
    BackgroundGeolocation.onAuthorization(this.onAuthorization);

    // Step 2:  #configure:
    BackgroundGeolocation.ready({
      distanceFilter: 10,
      stopOnTerminate: false,
      startOnBoot: true,
      enableHeadless: true,
      heartbeatInterval: 60,
      notification: {
        title: 'Background Location',
        text: 'Enabled'
      },
      backgroundPermissionRationale: {
        title: "Allow {applicationName} to access this device's location even when closed or not in use.",
        message: "This app collects location data to enable recording your trips to work and calculate distance-travelled.",
        positiveAction: 'Change to "{backgroundPermissionOptionLabel}"',
        negativeAction: 'Cancel'
      },
      autoSync: true,
      debug: true,
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      url: 'https:google.com',


    }, (state) => {
      console.log('- Configure success: ', state);
      this.setState({
        enabled: state.enabled,
        isMoving: state.isMoving
      });
    });

    BackgroundGeolocation.start();
    BackgroundGeolocation.changePace(true);
  }


  /**
  * @event location
  */
  onLocation(location) {
    console.log('[event] location: ', location);
    // this.addEvent('location', new Date(location.timestamp), location);
  }
  /**
  * @event motionchange
  */
  onMotionChange(MotionChangeEvent) {
    console.log('[event] motionchange: ', MotionChangeEvent.isMoving);
  }
  /**
  * @event activitychange
  */
  onActivityChange(MotionActivityEvent) {
    console.log('[event] activitychange: ', MotionActivityEvent);
    // this.addEvent('activitychange', new Date(), event);
  }

  /**
  * @event providerchange
  */
  onProviderChange(ProviderChangeEvent) {
    console.log('[event] providerchange', ProviderChangeEvent);
    // this.addEvent('providerchange', new Date(), event);
  }
  /**
  * @event powersavechange
  */
  onPowerSaveChange(isPowerSaveMode) {
    console.log('[event] powersavechange', isPowerSaveMode);
    // this.addEvent('powersavechange', new Date(), { isPowerSaveMode: isPowerSaveMode });
  }
  /**
  * @event heartbeat
  */
  onHttp(HttpEvent) {
    // console.log('[event] http: ', HttpEvent);
    // this.addEvent('http', new Date(), response);
  }
  /**
  * @event heartbeat
  */
  onHeartbeat(HeartbeatEvent) {
    console.log('[event] heartbeat: ', HeartbeatEvent);
    // this.addEvent('heartbeat', new Date(), event);
  }
  /**
  * @event authorization
  */
  onAuthorization(AuthorizationEvent) {
    console.log('[event] authorization: ', AuthorizationEvent);
    // this.addEvent('authorization', new Date(), event);

    // BackgroundGeolocation.setConfig({
    //   url: ENV.TRACKER_HOST + '/api/locations'
    // });
  }

  onToggleEnabled() {
    // let enabled = !this.state.enabled;
    // this.setState({
    //   enabled: enabled,
    //   isMoving: false
    // });
    // if (enabled) {
    BackgroundGeolocation.start();
    // } else {
    //   BackgroundGeolocation.stop();
    // }
  }

  onClickGetCurrentPosition() {
    BackgroundGeolocation.getCurrentPosition({
      persist: true,
      samples: 1,
      maximumAge: 0
    }, (location) => {
      console.log('- getCurrentPosition success: ', location);
    }, (error) => {
      console.warn('- getCurrentPosition error: ', error);
    });
  }

  onClickChangePace() {
    console.log('- onClickChangePace');
    let isMoving = !this.state.isMoving;
    this.setState({ isMoving: isMoving });
    BackgroundGeolocation.changePace(isMoving);
  }

  onClickClear() {
    this.setState({ events: [] });
  }


  // getCurrentLocation = () => {
  //   const destination = 'Block-6, Block 6 PECHS, Karachi, Karachi City, Sindh, Pakistan'
  //   console.log('destination', destination);
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       console.log('position', position);
  //       this.setState(
  //         {
  //           origin: {
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           },
  //           destination: destination,
  //           min: this.state.step?.duration?.text
  //         },
  //       );
  //     },
  //     error => console.log('Error', JSON.stringify(error)),
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 20000,
  //       maximumAge: 1000,
  //       distanceFilter: 0,
  //     },

  //   );

  // };

  // componentWillUnmount() {
  //   Geolocation.clearWatch(this.watchId);
  //   this.setState({ isNavigation: false });
  // }

  render() {
    let time = parseInt(this.state?.step?.duration?.text);
    let updatedTime = this.state.today.getHours() + ":" + parseInt(this.state.today.getMinutes() + time)

    return (

      <View style={Styles.appContainer}>
        <View style={{ flex: 1 }}>

          <MapView
            ref={ref => (this.refMap = ref)}
            provider={PROVIDER_GOOGLE}
            style={Styles.map}
            customMapStyle={MapStyles}
            region={{
              ...this.state.origin,
              longitudeDelta: 0.0009,
              latitudeDelta: 0.0009,
            }}
            showsPointsOfInterest={true}
            showsIndoors={true}
            zoomTapEnabled={true}
            showsBuildings={true}
            followUserLocation={true}
            moveOnMarkerPress={true}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            followsUserLocation={true}
            loadingEnabled={true}
            toolbarEnabled={true}
            zoomEnabled={true}
            rotateEnabled={true}

          >
          </MapView>
          <Marker>

          </Marker>
        </View>

        <View style={Styles.footer}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: '#2f3957',
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: 'column',
                width: Dimensions.get('screen').width / 1 - 75,
                flex: 1,
              }}>
              <Text style={{ fontSize: 25, color: '#5ccb51' }}>
                {this.state.step ? (
                  this.state.step?.duration?.text
                ) : (
                  <ActivityIndicator size="small" color="orange" />
                )}
              </Text>
              <Text style={{ color: '#fff' }}>
                {' '}
                {this.state.step ? (
                  this.state.step?.distance?.text
                ) : (
                  <ActivityIndicator size="small" color="orange" />
                )}{' '}
              </Text>
            </View>
            <View
              style={{ flexDirection: 'row', alignItems: 'center', width: 100 }}>
              <Text
                style={{
                  color: '#fff',
                }}>
                {
                  this.state.step ? (
                    // this.state.today.getHours() + ":" + parseInt(this.state.today.getMinutes() + time) 
                    tConvert(updatedTime)
                  ) : (
                    <ActivityIndicator size="small" color="orange" />
                  )}
              </Text>
              <Text
                style={{
                  height: 50,
                  borderRightWidth: 1,
                  borderRightColor: 'rgba(255, 255, 255, 0.3)',
                }}>
                {' '}
              </Text>
            </View>
            <View style={{ width: 25 }}>
              <Icon name="cross" size={25} color="#fff" style={{ padding: 0 }} />
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity>
                <Icon
                  name="location-pin"
                  size={25}
                  color="#000"
                  style={{ paddingRight: 20 }}
                />
              </TouchableOpacity>
              <Text style={{ flex: 1 }} numberOfLines={1}>
                {this.state.destination}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingLeft: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Icon
                  name="user"
                  size={35}
                  color="#b4bbc8"
                  style={Styles.iconStyle}
                />
                <View style={{ padding: 9 }}>
                  <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                    Ross Martin
                  </Text>
                  <Text>512-867-5309</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  paddingRight: 10,
                  // margin: 50,
                }}>
                <View style={{ paddingRight: 10 }}>
                  <Icon
                    name="phone"
                    size={25}
                    color="#b4bbc8"
                    style={Styles.iconStyle}
                  />
                </View>
                <View style={{ paddingRight: 10 }}>
                  <Icon
                    name="message"
                    size={25}
                    color="#b4bbc8"
                    style={Styles.iconStyle}
                  />
                </View>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                marginTop: 15,
              }}>
              <TouchableOpacity
                style={{
                  borderColor: '#6984b5',
                  borderWidth: 1,
                  width: 150,
                  height: 30,
                  padding: 5,
                  backgroundColor: '#fffffff',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#6984b5',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}>
                  Cancel Job
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: '#6984b5',
                  borderWidth: 1,
                  width: 150,
                  height: 30,
                  padding: 5,
                  backgroundColor: '#fffffff',
                  justifyContent: 'center',
                }}
                onPress={() => console.log("test")}
              >
                <Text
                  style={{
                    color: '#6984b5',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}

                >
                  Mark On-site
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        'title': 'Example App',
        'message': 'Example App access to your location '
      }
    )
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location")
      alert("You can use the location");
    } else {
      console.log("location permission denied")
      alert("Location permission denied");
    }
  } catch (err) {
    console.warn(err)
  }
}

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

  if (time.length > 1) { // If time format correct
    time = time.slice(1);  // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}