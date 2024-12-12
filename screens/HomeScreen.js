import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import React from "react";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useDispatch } from "react-redux";
import { setOrigin, setDestination } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = ({ navigation }) => {
  const APIKEY = "AIzaSyCQ3c7s4zyYIBuPyO6qCGmVNKrFwBRaz50";
  const dispatch = useDispatch();
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{ uri: "https://links.papareact.com/gzs" }}
        />
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where from"
            // currentLocation={true}
            styles={{
              container: {
                flex: 0,
              },
              textInput: {
                fontSize: 18,
              },
            }}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              // console.log(data)
              dispatch(setDestination(null));
            }}
            fetchDetails={true}
            minLength={2}
            returnKeyType={"search"}
            enablePoweredByContainer={false}
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            query={{
              key: APIKEY,
              language: "en",
            }}
          />
        </View>
        <NavOptions navigation={navigation} />
        <NavFavourites/>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
