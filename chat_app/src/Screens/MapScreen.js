import { Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import {
    Text,
    View,
    TouchableNativeFeedback,
    TextInput,
    Image,
    PermissionsAndroid,
    StyleSheet,
    ActivityIndicator,
    // TouchableOpacity,
    ToastAndroid,
    Platform,
} from 'react-native';
// import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import { debounce } from 'throttle-debounce';
import Geolocation from '@react-native-community/geolocation';

let API_KEY = 'google_api_key';
Geocoder.init('google_api_key');

class MapScreen extends React.PureComponent {
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
            city: '',
        };
        this.onSubmit = debounce(1000, this.onSubmitSearch);
    }

    geoCoder(address) {
        Geocoder.from(address)
            .then(json => {
                let location = json.results[0].geometry.location;
                this.setState({
                    region: {
                        latitude: location.lat,
                        longitude: location.lng,
                    },
                });
            })
            .catch(error => console.warn(error));
    }

    async onSubmitSearch(destination) {
        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${destination}&location=${this.state.region.latitude},${this.state.region.longitude}&radius=500&stricbounds&components=country:pak&key=${API_KEY}`;

        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            this.setState({
                predictions: json.predictions,
            });
        } catch (err) {
            console.warn(err);
        }
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
            this.watchId = Geolocation.watchPosition(
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
    onRegionChange(region) {
        this.setState({ region });
        setTimeout(() => {
            Geocoder.from(this.state.region.latitude, this.state.region.longitude)
                .then(json => {
                    let formatted_address = json.results[0].formatted_address;
                    let city_address = json.results[5].formatted_address.split(',')[0];
                    this.setState({
                        address: formatted_address,
                        city: city_address,
                    });
                })
                .catch(error => console.log(error));
        }, 150);
    }

    onChangeDestination(destination) {
        this.setState({ destination }, () => this.onSubmit(this.state.destination));
    }

    render() {
        const { width, height } = Dimensions.get('window');
        const { navigation } = this.props;
        const { longitude, latitude } = this.state.region;
        console.log(this.state.address);
        return (
            <>
                <MapView
                    loadingEnabled
                    style={styles.map}
                    provider={PROVIDER_GOOGLE}
                    showsPointsOfInterest
                    showsMyLocationButton
                    region={{
                        ...this.state.region,
                        latitudeDelta: 0.0123,
                        longitudeDelta: 0.0023,
                    }}
                    style={{
                        position: 'absolute',
                        width,
                        height,
                    }}
                    onRegionChangeComplete={region => this.onRegionChange(region)}>
                    <MapView.Marker
                        coordinate={this.state.region}
                        tracksViewChanges={this.state.tracksViewChanges}
                    />
                    <MapView.Circle
                        center={this.state.region}
                        radius={27}
                        strokeWidth={2.5}
                        strokeColor="red"
                        fillColor="#B9B9B9"
                    />
                </MapView>

                <TextInput
                    placeholder="Input Service Address"
                    value={this.state.destination}
                    style={styles.container}
                    onChangeText={data => this.onChangeDestination(data)}></TextInput>
                <View style={styles.container01}>
                    {this.state?.predictions?.map(prediction => {
                        console.log(prediction.id);
                        return (
                            <TouchableNativeFeedback
                                // key={prediction.id}
                                onPress={() => this.geoCoder(prediction.description)}>
                                <View style={styles.dropdown}>
                                    <Text>{prediction.description}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        );
                    })}
                </View>

                <View
                    style={{
                        position: 'relative',
                        top: height / 1.2,
                        backgroundColor: 'cyan',
                        padding: 15,
                    }}>
                    <TouchableOpacity
                        onPress={() =>
                            navigation.replace('ChatScreen', {
                                long: longitude,
                                lat: latitude,
                                address: this.state.address,
                                city: this.state.city,
                            })
                        }
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                            justifyContent: 'center',
                        }}>
                        <Icon name="done-all" size={25} />
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#000',
                                fontWeight: 'bold',
                                fontSize: 22,
                            }}>
                            Done{' '}
                        </Text>
                    </TouchableOpacity>
                </View>
            </>
        );
    }
}

export default MapScreen;

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        // borderRadius: 25,
        backgroundColor: '#fff',
        width: 320,
        margin: 10,
        borderWidth: 2,
        borderColor: 'black',
    },
    container01: {
        backgroundColor: '#fff',
        width: 320,
        marginLeft: 10,
    },
    dropdown: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        padding: 5,
    },
});
