import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken(
  'sk.eyJ1IjoibS1xYXNpbTAiLCJhIjoiY2tzc2p0N2RpMHd6MTJ3b2Q0N2g1OTNvNiJ9.HvGN3BSh7i9wHnsG7mi_BA',
);

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    height: 1800,
    width: 400,
    backgroundColor: 'tomato',
  },
  map: {
    flex: 1,
  },
});

export default class Map_Gli extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          height: '100%',
          width: '100%',
          borderColor: 'red',
          borderWidth: 2,
        }}>
        <MapboxGL.MapView
          styleURL={MapboxGL.StyleURL.Street}
          zoomLevel={16}
          centerCoordinate={[3.33624, 6.57901]}
          style={{height: 800}}>
          <MapboxGL.Camera
            zoomLevel={16}
            centerCoordinate={[3.33624, 6.57901]}
            animationMode={'flyTo'}
            animationDuration={0}></MapboxGL.Camera>
        </MapboxGL.MapView>
      </View>
    );
  }
}
