import React from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {View, StyleSheet, Text, SafeAreaView, TextInput} from 'react-native';
const {width, height} = Dimensions.get('window');

const AddressScreen = ({navigation, route}) => {
  let add, lon, lati, cit;

  if (({address, long, lat} = route.params == undefined)) {
    console.log('no');
  } else {
    const {long, lat, address, city} = route.params;
    console.log(long, lat, address);
    add = address;
    cit = city;
    lon = long.toString();
    lati = lat.toString();
  }

  return (
    <SafeAreaView>
      <View style={styles.mainContainer}>
        <Text style={styles.head}>Address Details</Text>
        <Text style={styles.text}>Address Title</Text>
        <View style={styles.container}>
          <Icon name="location-on" size={25} />
          <TextInput placeholder="Address Title ...." defaultValue={cit} />
        </View>
        <Text style={styles.text}>Complete Address</Text>
        <View style={styles.container}>
          <TextInput
            placeholder="Complete Address ...."
            style={{width: 285}}
            defaultValue={add}
          />
          <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
            <Icon name="play-arrow" size={25} />
          </TouchableOpacity>
        </View>

        <Text style={styles.text}>Latitude: </Text>
        <View style={styles.container}>
          <TextInput placeholder="Latitude ...." defaultValue={lati} />
        </View>
        <Text style={styles.text}>Longitude: </Text>
        <View style={styles.container}>
          <TextInput placeholder="Longitude ...." defaultValue={lon} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderRadius: 25,
    backgroundColor: '#fff',
    width: width / 1.1,
    margin: 10,
    borderWidth: 2,
    borderColor: 'lightblue',
  },
  head: {
    fontSize: 30,
    marginTop: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  text: {
    fontWeight: 'bold',
    marginLeft: 16,
    fontSize: 18,
  },
});

export default AddressScreen;
