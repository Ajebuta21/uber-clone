import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import NavFavourites from "./NavFavourites";
import { Icon } from "@rneui/base";

const NavigateCard = ({ navigation }) => {
  const APIKEY = "AIzaSyCQ3c7s4zyYIBuPyO6qCGmVNKrFwBRaz50";
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl font-semibold`}>
        Good morning, Elvis
      </Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            styles={styles}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
            fetchDetails={true}
            minLength={2}
            keepResultsAfterBlur={true}
            enablePoweredByContainer={false}
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            query={{
              key: APIKEY,
              language: "en",
            }}
          />
        </View>
        <NavFavourites />
      </View>
      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={[
            tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full`,
            { gap: 8 },
          ]}
        >
          <Icon name="car" size={16} color="white" type="font-awesome" />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[tw`flex flex-row w-24 px-4 py-3 rounded-full`, { gap: 8 }]}
        >
          <Icon name="car" size={16} color="black" type="font-awesome" />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const styles = StyleSheet.create({
  container: {
    flex: 0,
    paddingTop: 20,
  },
  textInput: {
    fontSize: 18,
    backgroundColor: "#DDDDDD",
    borderRadius: 0,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
