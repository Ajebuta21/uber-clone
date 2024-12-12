import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { useSelector } from "react-redux";
import { selectOrigin, selectDestination, setTravelTimeInforation } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { useRef } from "react";
import { useDispatch } from "react-redux";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const APIKEY = "AIzaSyCQ3c7s4zyYIBuPyO6qCGmVNKrFwBRaz50";
  const dispatch = useDispatch()

  useEffect(() => {
    if (!origin || !destination) return;

    //zoom to fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      egdePadding: { top: 200, right: 200, bottom: 200, left: 200 },
    });
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    const getTraveltime = async () => {
      fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${APIKEY}`).then((res) => res.json()).then(data => {
        dispatch(setTravelTimeInforation(data.rows[0].elements[0]))
        // console.log(data.rows[0].elements);
      })
    };
    getTraveltime();
  }, [origin, destination, APIKEY]);
  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.location.lat,
        longitude: origin.location.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {origin && destination && (
        <MapViewDirections
          origin={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          destination={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          apikey={APIKEY}
          strokeWidth={2}
          strokeColor="black"
        />
      )}
      {origin?.location && (
        <Marker
          coordinate={{
            latitude: origin.location.lat,
            longitude: origin.location.lng,
          }}
          title="Origin"
          description={origin.description}
          identifier="origin"
        />
      )}
      {destination?.location && (
        <Marker
          coordinate={{
            latitude: destination.location.lat,
            longitude: destination.location.lng,
          }}
          title="Destination"
          description={destination.description}
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;

const styles = StyleSheet.create({});
